import React, { useEffect } from "react";
import styles from "./Pubcard.module.css";
import { formatDate } from "../../utils/Datechanger";
import { db } from "../../firebase"; 
import { query, where, doc, deleteDoc, getDocs,collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import clockpng from "../../assets/icons/clock.png";
import heartpng from "../../assets/icons/heart.png";
import deletepng from "../../assets/icons/delete.png";
import editpng from "../../assets/icons/edit.png";

const Pubcard = ({ post }) => {
  post.timestamp = formatDate(post.timestamp);
  const navigate = useNavigate();

  const handleDelete= async (id) => {
    const q = query(
      collection(db, "blogs"), 
      where("id", "==", id)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('404');
      return;
    }

    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "blogs", docSnap.id));
    });

    console.log('ok');
  };


  const handleEdit = () => {
    navigate(`/edit/${post.id}`, { state: { post } });
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainerInside}>
        <div className={styles.imgContainer}>
          <img src={post.image} />
        </div>
        <div className={styles.rightPart}>
          <h1 className={styles.heading}>{post.title}</h1>
          <p className={styles.subheading}>{post.description}</p>
          <div className={styles.row}>
            <p>{post.timestamp}</p>
            <div className={styles.pairs}>
              <img src={clockpng} alt="clock" />
              <p>{post.timeToReadInMinutes} min</p>
            </div>
            <div className={styles.pairs}>
              <img src={heartpng} alt="Likes" />
              <p>{post.likes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.someBtn}>
        <img
          src={deletepng}
          alt="Delete"
          onClick={()=>handleDelete(post.id)}
        />
        <img src={editpng} alt="Edit" onClick={handleEdit} />
      </div>
    </div>
  );
};

export default Pubcard;
