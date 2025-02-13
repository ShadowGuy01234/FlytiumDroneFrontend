import React from "react";
import { Truck, Timer, MapPin, ShieldCheck, AlertTriangle } from "lucide-react";
import "./PolicyCommon.css";

const ShippingPolicy = () => {
  return (
    <div className="policy-container">
      <header className="policy-header">
        <h1 className="policy-title">
          <Truck size={40} color="#007BFF" />
          Shipping Policy
        </h1>
      </header>

      <div className="policy-content">
        <div className="policy-item" style={{ animationDelay: "0.2s" }}>
          <div className="policy-item-header">
            <ShieldCheck size={28} color="#004080" />
            <h2>Free Shipping</h2>
          </div>
          <p>
            We offer <b>free shipping</b> on all orders across India, ensuring
            no extra delivery charges.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "0.4s" }}>
          <div className="policy-item-header">
            <Timer size={28} color="#004080" />
            <h2>Delivery Time</h2>
          </div>
          <p>
            Orders are processed in <b>1-2 business days</b> and delivered
            within <b>5-7 business days</b>.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "0.6s" }}>
          <div className="policy-item-header">
            <MapPin size={28} color="#004080" />
            <h2>Order Tracking</h2>
          </div>
          <p>
            A <b>tracking ID</b> is provided via email/SMS to track your
            shipment.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "0.8s" }}>
          <div className="policy-item-header">
            <Truck size={28} color="#004080" />
            <h2>Shipping Partners</h2>
          </div>
          <p>
            We work with <b>trusted courier services</b> for secure deliveries.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "1s" }}>
          <div className="policy-item-header">
            <AlertTriangle size={28} color="#FF5733" />
            <h2>Support</h2>
          </div>
          <p>
            For damaged or delayed shipments, contact{" "}
            <b>support@flytiumdrones.com</b> for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
