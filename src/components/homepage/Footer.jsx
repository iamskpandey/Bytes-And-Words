import React from "react";
import styles from "./Footer.module.css";
import iconimg from "../../assets/icons/image.png";
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <h3>Learn Share Grow</h3>

      <h1>Bytes & Words</h1>

      <div className={styles.imgRow}>
        <img src={iconimg} alt="Instagram" height={35} />
      </div>
      <p>&copy; 2024 Bytes & Words. All rights reserved.</p>
    </div>
  );
};

export default Footer;
