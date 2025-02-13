import React from "react";
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  ClipboardList,
  Package,
} from "lucide-react";
import "./PolicyCommon.css";

const TermsConditions = () => {
  return (
    <div className="policy-container">
      <header className="policy-header">
        <h1 className="policy-title">
          <BookOpen size={40} color="#007BFF" />
          Terms & Conditions
        </h1>
      </header>

      <div className="policy-content">
        <div className="policy-item" style={{ animationDelay: "0.2s" }}>
          <div className="policy-item-header">
            <CheckCircle size={28} color="#004080" />
            <h2>Training & Demonstration</h2>
          </div>
          <p>
            We provide a <b>1-day training</b> or live demonstration for all
            supplied components to ensure proper understanding of their
            functionality.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "0.4s" }}>
          <div className="policy-item-header">
            <AlertTriangle size={28} color="#FF5733" />
            <h2>Product Issues & Returns</h2>
          </div>
          <p>
            Customers must report any{" "}
            <b>damaged or incorrect products within 10 days</b> of receiving the
            order. Claims made after this period will not be entertained.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "0.6s" }}>
          <div className="policy-item-header">
            <ClipboardList size={28} color="#004080" />
            <h2>Warranty Support</h2>
          </div>
          <p>
            If a product is defective and approved under warranty, a{" "}
            <b>replacement unit</b> will be shipped. If out of stock, a{" "}
            <b>partial refund</b> will be processed.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "0.8s" }}>
          <div className="policy-item-header">
            <Package size={28} color="#004080" />
            <h2>Order Details</h2>
          </div>
          <p>
            Customers must ensure <b>accurate shipping details</b> when placing
            an order. <b>No modifications</b> can be made once the order is
            processed.
          </p>
        </div>

        <div className="policy-item" style={{ animationDelay: "1s" }}>
          <div className="policy-item-header">
            <CheckCircle size={28} color="#004080" />
            <h2>Shipping Policy</h2>
          </div>
          <p>
            We offer <b>free shipping</b> on all orders with{" "}
            <b>no extra charges</b>. Tracking details will be shared upon
            shipment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
