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
  const [message, setMessage] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      if (res && res.data.success) {
        toast.success(res.data.message, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
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
    <div className="vb-login-container">
      <div className="vb-login-form">
        <h2>LOGIN</h2>

        <form onSubmit={handleSubmit}>
          <div className="vb-input-container">
            <label htmlFor="email">Email</label>
            <div className="vb-input-wrapper">
              <FaUserAlt className="vb-icon" />
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
          <div className="vb-input-container">
            <label htmlFor="password">Password</label>
            <div className="vb-input-wrapper">
              <FaLock className="vb-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={togglePasswordVisibility} className="vb-icon-eye">
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>
          <div className="vb-button-container">
            <button type="submit">SUBMIT</button>
          </div>
          {message && <p className="vb-message">{message}</p>}{" "}
          {/* Display success or error message */}
        </form>

        <p className="vb-p1">
          Don’t have an account?{" "}
          <Link to="/signup" className="Vijit">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
