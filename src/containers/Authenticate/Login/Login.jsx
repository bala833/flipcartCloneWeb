import React,  {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { login } from "../../../services/AuthService/AuthService";
import { AuthContext } from "../../../context/authContext";

const Login = () => {
    const navigate = useNavigate();
    const { authToken, setAuthToken } = useContext(AuthContext);
    console.log(authToken)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData, 'login')
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await login(JSON.stringify(formData));
      console.log(response, 'resp')

      console.log(response?.data, 'response')

      if (response?.status === 200) {
        setMessage("✅ Login successful!");
        console.log("User token:", response?.data);
        setAuthToken(response?.data)
    navigate(`/`)

      } else {
        setMessage("❌ Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate(`/signup`)

  }

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card card shadow-lg">
        <div className="row no-gutters">
          {/* Left Side */}
          <div className="col-md-5 login-left d-flex flex-column justify-content-center text-white">
            <div className="p-4">
              <h4>Login</h4>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
              <img
                src="/assets/flipkart-side.png"
                alt="Flipkart illustration"
                className="img-fluid mt-4"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-7 p-4 login-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter username/Mobile number"
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
                  placeholder="Enter Password"
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
                {loading ? "Logging in..." : "Login"}
              </button>

              {message && <p className="text-center mt-3">{message}</p>}

              <div className="text-center my-3 text-muted">OR</div>

              <button
                type="button"
                className="btn btn-outline-secondary btn-block"
                onClick={() => alert("Request OTP clicked")}
              >
                Request OTP
              </button>

              <div className="text-center mt-4">
                <span className="text-muted">
                  New to Flipkart?{" "}
                  <div onClick={() => handleSignup()} className="text-primary font-weight-bold">
                    Create an account
                  </div>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
