import React, { useState, useEffect } from "react";
import Navbaredit from "./Navbaredit";
import { db } from "../../firebase";
import { collection, updateDoc, getDocs, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Spinner from "../common/Spinner";
import { useParams } from "react-router-dom";

const Editpage = () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    image: "",
  });
  const [post, setPost] = useState({});
  const { blogId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [firebaseBlogId, setFirebaseBlogId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
          if (doc.data().id === blogId) {
            setPost(doc.data());
            setFirebaseBlogId(doc.id);
          }
        });
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    if (post.title) {
      setBlog({
        title: post.title,
        description: post.description,
        category: post.category,
        content: post.content,
        image: post.image,
      });
    }
  }, [loading]);

  if (loading) {
    return <Spinner />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const blogRef = doc(db, "blogs", firebaseBlogId);
      await updateDoc(blogRef, {
        title: blog.title,
        description: blog.description,
        category: blog.category,
        content: blog.content,
        image: blog.image,
        timestamp: post.timestamp,
        timeToReadInMinutes: Math.ceil(blog.content.split(" ").length / 200),
      });

      const categoriesRef = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesRef);
      let categoryExists = false;

      if (categoriesSnapshot.empty) {
        await addDoc(categoriesRef, {
          name: blog.category,
          id: 1,
        });
      } else {
        categoriesSnapshot.forEach((doc) => {
          if (doc.data().name === blog.category) {
            categoryExists = true;
          }
        });
        if (!categoryExists) {
          await addDoc(categoriesRef, {
            name: blog.category,
            id: categoriesSnapshot.size + 1,
          });
        }
      }
      alert("Blog Updated Successfully");
      setBlog({
        title: "",
        description: "",
        category: "",
        content: "",
        image: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Navbaredit />
      <h1
        style={{
          textAlign: "center",
          margin: "20px auto",
        }}
      >
        Edit Blog
      </h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "5rem 15rem",
        }}
        onSubmit={handleEdit}
      >
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={blog.title}
          placeholder="Title of the Blog"
          style={{
            padding: "1rem",
            fontSize: "2.6rem",
            fontWeight: "bold",
            backgroundColor: "transparent",
            border: "none",
            borderLeft: "8px solid #BEBEBE",
            outline: "none",
          }}
          required
        />

        <textarea
          name="description"
          onChange={handleChange}
          value={blog.description}
          placeholder="Small Description"
          style={{
            padding: "1rem",
            fontSize: "1.3rem",
            backgroundColor: "transparent",
            color: "#666",
            border: "none",
            borderLeft: "8px solid #BEBEBE",
            outline: "none",
            height: "100px",
          }}
          required
        ></textarea>

        <input
          type="text"
          onChange={handleChange}
          value={blog.image}
          name="image"
          placeholder="Image Link"
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            backgroundColor: "transparent",
            border: "none",
            borderLeft: "8px solid #BEBEBE",
            outline: "none",
          }}
          required
        />

        <img
          src={blog.image == "" ? "src\\assets\\img\\image.png" : blog.image}
          alt="Blog Cover"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <input
          type="text"
          onChange={handleChange}
          value={blog.category}
          name="category"
          placeholder="Categories"
          style={{
            padding: "1rem",
            fontSize: "1.2rem",
            backgroundColor: "transparent",
            border: "none",
            borderLeft: "8px solid #BEBEBE",
            outline: "none",
          }}
          required
        />

        <textarea
          name="content"
          onChange={handleChange}
          value={blog.content}
          placeholder="Blog Content"
          style={{
            padding: "1rem",
            fontSize: "1.3rem",
            backgroundColor: "transparent",
            border: "none",
            borderLeft: "8px solid #BEBEBE",
            outline: "none",
            height: "800px",
          }}
          required
        ></textarea>

        <button
          type="submit"
          style={{
            padding: "30px 20px",
            fontSize: "18px",
            borderRadius: "12px",
            backgroundColor: "#69A95D",
            color: "#FFF",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Update Blog
        </button>
      </form>
    </>
  );
};

export default Editpage;
