import React from "react";
import "./PleaseLogin.scss";

const PleaseLogin = () => {
  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlist and Recommendations</p>
      </div>

      <div className="right-panel">
        <h2>Please login</h2>

        <input
          type="text"
          className="input-box"
          placeholder="Enter Email / Mobile number"
        />

        <button className="login-btn">Request OTP</button>

        <p className="terms">
          By continuing, you agree to Flipkart’s Terms of Use and Privacy Policy.
        </p>

        <div className="footer-text">
          <span>New to Flipkart? </span>
          <a href="#">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default PleaseLogin;
