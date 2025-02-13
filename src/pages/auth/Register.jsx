import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "../../css/Account.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../../api";

const Account = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // For navigation after successful registration

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
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);

      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
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
        navigate("/register-success");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Register Error:", error);

      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Register"} description={"Register"}>
      <div className="ac-page">
        <div className="ac-container">
          <h2>CREATE ACCOUNT</h2>
          <form onSubmit={handleSubmit}>
            <div className="ac-form-group">
              <label htmlFor="name">Name</label>
              <div className="ac-input-box">
                <FaUser className="ac-icon-user" />
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
            <div className="ac-form-group">
              <label htmlFor="email">Email</label>
              <div className="ac-input-box">
                <FaEnvelope className="ac-icon-email" />
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
            <div className="ac-form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="ac-input-box">
                <FaPhone className="ac-icon-phone" />
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
            <div className="ac-form-group">
              <label htmlFor="address">Address</label>
              <div className="ac-input-box">
                <FaPhone className="ac-icon-address" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="ac-form-group">
              <label htmlFor="answer">Date of Birth</label>
              <div className="ac-input-box">
                <FaPhone className="ac-icon-address" />
                <input
                  type="date"
                  id="answer"
                  name="answer"
                  placeholder="Enter your Address"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="ac-form-group">
              <label htmlFor="password">Password</label>
              <div className="ac-input-box ac-password-box">
                <FaLock className="ac-icon-lock" />
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
                  className="ac-toggle-eye"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="ac-button-wrapper">
              <button type="submit">SUBMIT</button>
            </div>
            {message && <p className="ac-message">{message}</p>}{" "}
            {/* Display success or error message */}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
