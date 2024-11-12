import React from "react";
import Navbar from "./Navbar";
import Pcard from "./Pcard";
import Card from "./Card";
import Category from "./Category";
import styles from "./Homepage.module.css";
import Footer from "./Footer";

import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import NavbarDashboard from "../dashboard/NavbarDashboard";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catClicked, setCatClicked] = useState(false);
  const [currentCat, setCurrentCat] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };

    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
      setLoading(false);
    };
    fetchPosts();
    fetchCategories();
  }, []);

  const latestPostObject = posts.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )[0];
  const post = latestPostObject
    ? {
        id: latestPostObject.id,
        title: latestPostObject.title,
        description: latestPostObject.description,
        image: latestPostObject.image,
        timestamp: latestPostObject.timestamp,
        timeToReadInMinutes: latestPostObject.timeToReadInMinutes,
        likes: latestPostObject.likes,
      }
    : null;

  const popularPosts = posts.sort((a, b) => b.likes - a.likes).slice(0, 4);
  const popularPostsObjects = popularPosts.map((p) =>
    p
      ? {
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.image,
          timestamp: p.timestamp,
          timeToReadInMinutes: p.timeToReadInMinutes,
          likes: p.likes,
        }
      : null
  );

  const stylesbtn = {
    backgroundColor: "#000",
    color: "#fff",
    padding: "0.7rem 1rem",
    borderRadius: "1rem",
    display: "inline-block",
    whiteSpace: "nowrap",
  };

  const notSelectedCat = {
    backgroundColor: "#d9d9d9",
    color: "black",
    padding: "0.7rem 1rem",
    borderRadius: "1rem",
    display: "inline-block",
    whiteSpace: "nowrap",
  };

  const selectedCat = {
    backgroundColor: "#5f5f5f",
    color: "#fff",
    padding: "0.7rem 1rem",
    borderRadius: "1rem",
    display: "inline-block",
    whiteSpace: "nowrap",
  };

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleCategoryClick = (name) => {
    setCatClicked(true);
    setCurrentCat(name);
    const filteredPosts = posts.filter((post) => post.category === name);
    setFilteredPosts(filteredPosts);
  };

  const showAllCatCard = () => {
    setCatClicked(false);
    setCurrentCat("All");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {!user ? <Navbar /> : <NavbarDashboard />}
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h2>Popular</h2>

          {popularPostsObjects.map((pPost) => {
            return (
              <Pcard
                key={pPost.id}
                pPost={pPost}
                handleClick={() => handleClick(pPost.id)}
              />
            );
          })}
        </div>
        <div className={styles.rightContainer}>
          <h2>Latest</h2>
          <Card post={post} handleClick={() => handleClick(post.id)} />
        </div>
      </div>
      <h2 className={styles.catHeading}>Categories</h2>
      <div className={styles.catContainer}>
        <p
          style={catClicked ? notSelectedCat : selectedCat}
          onClick={showAllCatCard}
        >
          All
        </p>

        {categories.map((category) => {
          return (
            <Category
              bg={
                catClicked && currentCat === category.name
                  ? "#5f5f5f"
                  : "#d9d9d9"
              }
              color={
                catClicked && currentCat === category.name ? "#fff" : "black"
              }
              key={category.id}
              category={category}
              handleCategoryClick={() => handleCategoryClick(category.name)}
            />
          );
        })}

        <p style={stylesbtn}>
          <Link
            to="/category"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            View All
          </Link>
        </p>
      </div>
      <div className={styles.catPostCardContainer}>
        {catClicked
          ? filteredPosts.map((post) => {
              return (
                <Card
                  key={post.id}
                  post={post}
                  handleClick={() => handleClick(post.id)}
                />
              );
            })
          : posts.map((post) => {
              return (
                <Card
                  key={post.id}
                  post={post}
                  handleClick={() => handleClick(post.id)}
                />
              );
            })}
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
