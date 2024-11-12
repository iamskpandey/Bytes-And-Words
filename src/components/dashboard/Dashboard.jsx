import React from "react";
import NavbarDashboard from "./NavbarDashboard";
import Pubcard from "./PubCard";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";


const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };
    fetchPosts();
  }, [posts]);

  const styles = {
    margin: "3rem 5rem",
  };
  return (
    <>
      <NavbarDashboard />
      <h1
        style={{
          margin: "3rem 5rem",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Published
      </h1>
      <div style={styles}>
        {posts.map((post) => (
          <Pubcard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
