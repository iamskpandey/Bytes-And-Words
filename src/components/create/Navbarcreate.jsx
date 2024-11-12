import React from "react";
import style from "./Navbarcreate.module.css";
import { useNavigate } from "react-router-dom";
import handleLogout from "../common/Logout";

const Navbarcreate = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.heading}>
        <p className={style.name} onClick={() => navigate("/")}>
          Bytes & Words
        </p>
        <div className={style.headImg}>
          <img
            src="src\assets\icons\dash.png"
            alt="create"
            onClick={() => navigate("/dashboard")}
          />
          <img src="src\assets\icons\acc.png" alt="Account" />
          <img
            src="src\assets\icons\logout.png"
            alt="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Navbarcreate;
