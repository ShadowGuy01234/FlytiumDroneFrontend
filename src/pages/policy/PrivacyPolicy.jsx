import React from "react";
import { FaUserShield, FaCookieBite, FaLock } from "react-icons/fa"; // Importing React Icons
import "./PolicyCommon.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <header className="policy-header">
        <h1 className="policy-title">
          <FaLock size={40} color="#007BFF" />
          Privacy Policy
        </h1>
      </header>

      <div className="policy-content">
        <div className="policy-item" style={{ animationDelay: "0.2s" }}>
          <div className="policy-item-header">
            <FaUserShield size={28} color="#004080" />
            <h2>Data Collection and Usage</h2>
          </div>
          <p>
            Flytium Drone Company collects personal data, including but not
            limited to name, contact information, and usage data, to improve
            services, process orders, and provide customer support. We do not
            share this data with third parties without explicit consent.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "0.4s" }}>
          <div className="policy-item-header">
            <FaCookieBite size={28} color="#004080" />
            <h2>Cookies and Tracking</h2>
          </div>
          <p>
            Flytium Drone Company uses cookies and other tracking technologies
            to enhance user experience, track user activity on our site, and
            gather analytics data. You can manage cookie preferences through
            your browser settings.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "0.6s" }}>
          <div className="policy-item-header">
            <FaLock size={28} color="#004080" />
            <h2>Security and Data Protection</h2>
          </div>
          <p>
            Flytium Drone Company takes the protection of your personal data
            seriously and employs industry-standard encryption methods and
            secure storage to safeguard your information from unauthorized
            access or disclosure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
