import { useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa"; // Importing the green tick icon from react-icons
import { useNavigate } from 'react-router-dom';
import "../css/Successful.css";

const Successful = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/store'); // Redirect to /store after 5 seconds
    }, 5000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="card-container">
      <div className="success-card">
        <FaCheckCircle className="checkmark-icon" />
        <h2 className="heading">You have logged in successfully</h2>
      </div>
    </div>
  );
};

export default Successful;
