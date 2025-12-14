import React, { useState } from "react";
import "./Signup.scss";
import { signUp } from "../../../services/AuthService/AuthService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData, "login");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await signUp(JSON.stringify(formData));

      if (response.status === 200) {
        setMessage("✅ Account created successfully! Please loging");
        console.log("User created:", response);
      } else {
        setMessage("❌ Signup failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const login = (id) => {
    navigate(`/login`);
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="signup-card card shadow-lg">
        <div className="row no-gutters">
          {/* Left */}
          <div className="col-md-5 signup-left d-flex flex-column justify-content-center text-white">
            <div className="p-4">
              <h4>Looks like you're new here!</h4>
              <p>Sign up with your mobile number to get started</p>
              <img
                src="/assets/flipkart-side.png"
                alt="Flipkart illustration"
                className="img-fluid mt-4"
              />
            </div>
          </div>
          {message ? (
            <div className="col-md-7 p-4 signup-right">

            <div className="text-center mt-4">
              <span className="text-muted">
                User Created Successfully Please login
                <div
                  onClick={() => login()}
                  className="text-primary font-weight-bold"
                >
                  Log in
                </div>
              </span>
            </div>
            </div>
          ) : (
            <div className="col-md-7 p-4 signup-right">
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email/Mobile number"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <p className="text-muted small">
                  By continuing, you agree to Flipkart's{" "}
                  <span className="text-primary">Terms of Use</span> and{" "}
                  <span className="text-primary">Privacy Policy</span>.
                </p>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Continue"}
                </button>

                {message && <p className="text-center mt-3">{message}</p>}

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Existing User?{" "}
                    <div
                      onClick={() => login()}
                      className="text-primary font-weight-bold"
                    >
                      Log in
                    </div>
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
