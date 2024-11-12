import React from "react";
import styles from "./Pcard.module.css";
import { formatDate } from "../../utils/Datechanger";
import clockpng from "../../assets/icons/clock.png";
import heartpng from "../../assets/icons/heart.png";

const Pcard = ({pPost, handleClick}) => {
  const date = formatDate(pPost.timestamp);
  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.imgContainer}>
        <img src={pPost.image} />
      </div>
      <div className={styles.rightPart}>
        <h1 className={styles.heading}>{pPost.title}</h1>
        <p className={styles.subheading}>{pPost.description}</p>
        <div className={styles.row}>
          <p>{date}</p>
          <div className={styles.pairs}>
            <img src={clockpng} alt="clock" />
            <p>{pPost.timeToReadInMinutes} min</p>
          </div>
          <div className={styles.pairs}>
            <img src={heartpng} alt="Likes" />
            <p>{pPost.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pcard;
