import React from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import signinimg from "../../assets/auth/signinimg.png";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

export const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const querySnapshot = await getDocs(collection(db, "admins"));
      querySnapshot.forEach((doc) => {
        if (doc.data().email === formData.email) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      });
    } catch {
      console.error("Error signing in/up:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.innerContainer}>
          <div className={style.heading}>
            <p className={style.name}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Bytes & Words
              </Link>
            </p>
            <button className={style.button}>
              <Link
                to="/signup"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Link>
            </button>
          </div>
          <div className={style.imgContainer}>
            <img src={signinimg} className={style.backimg} alt="pencils" />
          </div>
        </div>

        <div className={style.formContainer}>
          <form onSubmit={handleSubmit}>
            <p className={style.info}>Already Have an Account?</p>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className={style.inputBox}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className={style.inputBox}
              placeholder="Password"
            />
            <button type="submit" className={style.lbutton}>
              LOGIN
            </button>
            <div className={style.textContainer}>
              <p>
                <span style={{ color: "#006E89" }}>Learn</span>,{" "}
                <span style={{ color: "#009022" }}>Share</span> and{" "}
                <span style={{ color: "#7C8A00" }}>Grow</span>
              </p>
              <p>@</p>
              <p>
                <span style={{ color: "#5602A4" }}>Byte</span> & Words
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
