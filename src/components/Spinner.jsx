import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import '../styles/Spinner.css';

const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);

    if (count === 0) {
      navigate('/');
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="spinner-container"
    >
      <div className="spinner-content">
        <motion.div
          animate={{ rotate: 360 }}
          transition={spinTransition}
          className="custom-spinner"
        />
        <motion.h2
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="redirect-text"
        >
          Redirecting in {count}
        </motion.h2>
      </div>
    </motion.div>
  );
};

// Add PropTypes validation
Spinner.propTypes = {
  path: PropTypes.string
};

export default Spinner;
