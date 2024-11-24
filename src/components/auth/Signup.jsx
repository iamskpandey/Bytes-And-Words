import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.css";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import signupimg from "../../assets/auth/signup.png";

export const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await sendEmailVerification(userCred.user)
      alert("Verify Your Email! Check your email");
      navigate("/login");
    } catch (error) {
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
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Bytes & Words
              </Link>
            </p>
            <button className={style.button}>
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </button>
          </div>
          <div className={style.imgContainer}>
            <img
              className={style.backimg}
              src={signupimg}
              alt="signup Image"
            />
          </div>
        </div>

        <div className={style.formContainer}>
          <form onSubmit={handleSubmit}>
            <p className={style.info}>Become a member Today</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={style.inputBox}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              className={style.inputBox}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirm_password"
              className={style.inputBox}
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
            />

            <button type="submit" className={style.lbutton}>
              SIGN UP
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
