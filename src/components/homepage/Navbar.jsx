import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.heading}>
        <p className={style.name} onClick={()=>navigate("/")}>Bytes & Words</p>
        <div>
          <button className={`${style.button} ${style.login}`}>
            <Link to="/login" className={style.login}>Login</Link>
          </button>
          <button className={`${style.button} ${style.sign}`}>
            <Link to="/signup" className={style.sign}>Sign Up</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
