import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../homepage/Navbar";
import styles from "./BlogPage.module.css";
import { useParams } from "react-router-dom";
import clockimg from "../../assets/icons/clock.png";
import likeimg from "../../assets/icons/heart.png";
import shareimg from "../../assets/icons/share.png";
import commentimg from "../../assets/icons/comment.png";
import sendimg from "../../assets/icons/send.png";
import likedimg from "../../assets/icons/heartblack.png";
import { formatDate } from "../../utils/Datechanger";
import NavbarDashboard from "../dashboard/NavbarDashboard";

import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Spinner from "../common/Spinner";
import { useNavigate } from "react-router-dom";

const Blogpage = () => {
  const [post, setPost] = useState({});
  const [userEmail, setUserEmail] = useState(null);
  const { blogId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [firebaseBlogId, setFirebaseBlogId] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
          if (doc.data().id === blogId) {
            setPost(doc.data());
            setFirebaseBlogId(doc.id);
            if (doc.data().likesBy) {
              if (doc.data().likesBy.includes(user.email)) {
                setIsLiked(true);
              }
            }
          }
        });
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
      window.scrollTo(0, 0);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const updatedPost = { ...post };
    updatedPost.comments = updatedPost.comments || [];
    updatedPost.comments.push({
      user: user.email.split("@")[0],
      comment: comment,
    });
    setPost(updatedPost);
    setComment("");
    const blogRef = doc(db, "blogs", firebaseBlogId);
    await updateDoc(blogRef, {
      ...updatedPost,
      comments: updatedPost.comments,
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleLike = async () => {
    if (!isLiked) {
      if (!user) {
        navigate("/login");
        return;
      }
      const updatedPost = { ...post };
      updatedPost.likes = updatedPost.likes + 1;
      setPost(updatedPost);
      const blogRef = doc(db, "blogs", firebaseBlogId);
      await updateDoc(blogRef, {
        ...updatedPost,
        likes: updatedPost.likes,
        likesBy: [...(updatedPost.likesBy || []), user.email],
      });
      setIsLiked(true);
    } else {
      if (!user) {
        navigate("/login");
        return;
      }
      const updatedPost = { ...post };
      updatedPost.likes = updatedPost.likes - 1;
      setPost(updatedPost);
      const blogRef = doc(db, "blogs", firebaseBlogId);
      await updateDoc(blogRef, {
        ...updatedPost,
        likes: updatedPost.likes,
      });
      setIsLiked(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const publishedDate = formatDate(post.timestamp);

  return (
    <>
      {!user ? <Navbar /> : <NavbarDashboard />}
      <div className={styles.mainContainer}>
        <h1 className={styles.heading}>{post.title}</h1>
        <p className={styles.subheading}>{post.description}</p>
        <div className={styles.metadata}>
          <p className="date">{publishedDate}</p>
          <div>
            <div>
              <img src={clockimg} alt="clock" />
              <p>{post.timeToReadInMinutes}</p>
            </div>
            <div>
              <img src={likeimg} alt="Likes" />
              <p>{post.likes}</p>
            </div>
          </div>
        </div>
        <img className={styles.coverImage} src={post.image} height={350} />
        <pre className={styles.content}>
          <span>{post.content ? post.content[0] : ""}</span>
          {post.content ? post.content.slice(1) : ""}
        </pre>
        <div className={styles.actionBtn}>
          {isLiked ? (
            <img src={likedimg} alt="liked" onClick={handleLike} />
          ) : (
            <img src={likeimg} alt="not liked" onClick={handleLike} />
          )}
          <img src={shareimg} alt="clock" onClick={handleShare} />
        </div>
      </div>
      <div className={styles.commentSection}>
        <div className={styles.bodyComment}>
          <div className={styles.cmtHeading}>
            <img src={commentimg} alt="clock" />
            <p>Comment</p>
          </div>
          <div className={styles.cmtBox}>
            <input
              type="text"
              placeholder="Share Your Thoughts"
              onChange={handleChange}
              value={comment}
            />
            <img src={sendimg} alt="clock" onClick={handleSubmitComment} />
          </div>
        </div>
        {post.comments &&
          post.comments.map((comment, index) => (
            <div className={styles.comment} key={index}>
              <p className={styles.user}>{comment.user}</p>
              <p className={styles.usercmt}>{comment.comment}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Blogpage;
