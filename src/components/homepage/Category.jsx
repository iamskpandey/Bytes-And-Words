import React from 'react';
import style from './Category.module.css'

const Category = ({bg = '#d9d9d9', color="black", name = "Software Development", category, handleCategoryClick}) => {
    const styles = {
        backgroundColor : bg, 
        color : color,
        padding : "0.7rem 1rem",
        borderRadius: "1rem",
        display: "inline-block",
        whiteSpace: "nowrap",
    }
      const handleScroll = (e) => {
         e.preventDefault();
         e.stopPropagation();
         const container = document.querySelector('.cat-container');
         const containerScrollPosition = document.querySelector('.cat-container').scrollLeft;
         container.scrollTo({
               top: 0,
               left: containerScrollPosition + e.deltaY,
               behaviour: 'smooth'
         });
      }
  return (
     <div onWheelCapture={handleScroll} style={styles} className={style.cat} onClick={handleCategoryClick}>
        <p>{category.name}</p>
     </div> 
  )
}

export default Category