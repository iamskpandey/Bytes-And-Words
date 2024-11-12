import React from "react";
import style from "./Navbarcreate.module.css";
import { useNavigate } from "react-router-dom";
import handleLogout from "../common/Logout";
import dashpng from "../../assets/icons/dash.png";
import accpng from "../../assets/icons/acc.png";
import logoutpng from "../../assets/icons/logout.png";

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
            src={dashpng}
            alt="create"
            onClick={() => navigate("/dashboard")}
          />
          <img src={accpng} alt="Account" />
          <img
            src={logoutpng}
            alt="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Navbarcreate;
