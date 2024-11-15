import React from "react";
import styles from "./Card.module.css";
import { formatDate } from "../../utils/Datechanger";
import clockpng from "../../assets/icons/clock.png";
import heartpng from "../../assets/icons/heart.png";

const Card = ({ post, handleClick }) => {
  if (!post) {
    return null; 
  }

  const publishedDate = formatDate(post.timestamp);

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      {post.image ? (
        <img
          className={styles.cardImg}
          src={post.image}
          height={180}
          alt={post.title || "Post Image"}
        />
      ) : (
        <div
          className={styles.cardImgPlaceholder}
          style={{ height: "200px", backgroundColor: "#f0f0f0" }}
        >
          No Image
        </div>
      )}
      <div className={styles.belowPart}>
        <h1 className={styles.heading}>{post.title || "Untitled"}</h1>
        <div className={styles.row}>
          <p>{publishedDate || "Unknown Date"}</p>
          <div className={styles.pairs}>
            <img src={clockpng} alt="clock" />
            <p>
              {post.timeToReadInMinutes
                ? `${post.timeToReadInMinutes} min`
                : "N/A"}
            </p>
          </div>
          <div className={styles.pairs}>
            <img src={heartpng} alt="Likes" />
            <p>{post.likes || 0}</p>
          </div>
        </div>
        <p className={styles.subheading}>
          {post.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default Card;
