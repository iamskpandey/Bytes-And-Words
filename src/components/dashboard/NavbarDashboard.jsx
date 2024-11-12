import React from "react";
import style from "./NavbarDashboard.module.css";
import { useNavigate } from "react-router-dom";
import handleLogout from "../common/Logout";

import create from "../../assets/icons/create.png";
import acc from "../../assets/icons/acc.png";
import logout from "../../assets/icons/logout.png";

const NavbarDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.heading}>
        <p className={style.name} onClick={() => navigate("/")}>
          Bytes & Words
        </p>
        <div className={style.headImg}>
          <img
            src={create}
            alt="create"
            onClick={() => {
              navigate("/create");
            }}
          />
          <img src={acc} alt="Account" />
          <img src={logout} alt="Logout" onClick={handleLogout} />
        </div>
      </div>
    </>
  );
};

export default NavbarDashboard;
