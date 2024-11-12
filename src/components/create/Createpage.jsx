import React, { useState } from "react";
import Navbarcreate from "./Navbarcreate";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Createpage = () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = Date.now().toString();
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        id: id,
        title: blog.title,
        description: blog.description,
        category: blog.category,
        content: blog.content,
        image: blog.image,
        timestamp: new Date().toISOString(),
        timeToReadInMinutes: Math.ceil(blog.content.split(" ").length / 200),
        likes: 0,
        comments: [],
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
      alert("Blog Published Successfully");
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
      <Navbarcreate />
      <h1
        style={{
          textAlign: "center",
          margin: "20px auto",
        }}
      >
        Create Blog
      </h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "5rem 15rem",
        }}
        onSubmit={handleSubmit}
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
          Publish Blog
        </button>
      </form>
    </>
  );
};

export default Createpage;
