import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import "../../css/Account.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../../api";

const Account = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    answer: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, phone, address } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be 10 digits.");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    if (!name || !address) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { name, email, password, phone, address, answer } = formData;
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/register-success");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Register Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title="Register" description="Create your account">
      <div className="modern-account-container">
        <div className="modern-account-card">
          <h2>Register</h2>
          <p className="modern-subtitle">Join us today!</p>
          <form onSubmit={handleSubmit}>
            <div className="modern-input-container">
              <label htmlFor="name">Name</label>
              <div className="modern-input-wrapper">
                <FaUser className="modern-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modern-input-container">
              <label htmlFor="email">Email</label>
              <div className="modern-input-wrapper">
                <FaEnvelope className="modern-icon" />
                <input
                  type="email"
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
              <label htmlFor="phone">Phone</label>
              <div className="modern-input-wrapper">
                <FaPhone className="modern-icon" />
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modern-input-container">
              <label htmlFor="address">Address</label>
              <div className="modern-input-wrapper">
                <FaMapMarkerAlt className="modern-icon" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modern-input-container">
              <label htmlFor="answer">Date of Birth</label>
              <div className="modern-input-wrapper">
                <FaCalendarAlt className="modern-icon" />
                <input
                  type="date"
                  id="answer"
                  name="answer"
                  placeholder="Enter your date of birth"
                  value={formData.answer}
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
                <span
                  className="modern-icon-eye"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="modern-input-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="modern-input-wrapper">
                <FaLock className="modern-icon" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="modern-icon-eye"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Password Advice Section */}
            <div className="password-advice">
              <ul>
                <li className={passwordStrength.length ? "valid" : ""}>
                  At least 8 characters
                </li>
                <li className={passwordStrength.upper ? "valid" : ""}>
                  At least one uppercase letter
                </li>
                <li className={passwordStrength.special ? "valid" : ""}>
                  At least one special character (!@#$%^&*)
                </li>
              </ul>
            </div>

            <button type="submit" className="modern-submit-button">
              Register
            </button>
          </form>
          <p className="modern-login-prompt">
            Already have an account?{" "}
            <button
              className="modern-login-button"
              onClick={() => navigate("/login")}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
