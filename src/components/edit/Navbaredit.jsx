import React from "react";
import style from "./Navbaredit.module.css";
import { useNavigate } from "react-router-dom";
import handleLogout from "../common/Logout";

import dash from "../../assets/icons/dash.png";
import acc from "../../assets/icons/acc.png";
import logout from "../../assets/icons/logout.png";

const Navbaredit = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.heading}>
        <p className={style.name} onClick={()=>navigate("/")}>Bytes & Words</p>
        <div className={style.headImg}>
          <img src={dash} alt="dash" onClick={()=>navigate("/dashboard")}/>
          <img src={acc} alt="Account" />
          <img src={logout} alt="Logout" onClick={handleLogout}/>
        </div>
      </div>
    </>
  );
};

export default Navbaredit;
