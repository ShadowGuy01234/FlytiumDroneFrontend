import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../api";
import { useAuth } from "../../Context/auth";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      validatePassword(value); // Validate password in real time
    }
  };

  // Validate password strength
  

  // Pre-backend validations
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      if (res && res.data.success) {
        toast.success(res.data.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });

        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/login-success");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="modern-login-container">
      <div className="modern-login-card">
        <h2>Welcome Back!</h2>
        <p className="modern-subtitle">Login to continue your journey</p>
        <form onSubmit={handleSubmit}>
          <div className="modern-input-container">
            <label htmlFor="email">Email</label>
            <div className="modern-input-wrapper">
              <FaUserAlt className="modern-icon" />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="modern-input-container">
            <label htmlFor="password">Password</label>
            <div className="modern-input-wrapper">
              <FaLock className="modern-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={togglePasswordVisibility} className="modern-icon-eye">
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            
          </div>
          <button type="submit" className="modern-submit-button">
            Login
          </button>
        </form>
        <p className="modern-footer-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="modern-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
