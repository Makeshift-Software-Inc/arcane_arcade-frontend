import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

const SellerDashboard = (props) => {
  return (
    <div className="App seller-dashboard">
      Seller Dashboard
      <Link to="/sell-your-game">Create Listing</Link>
    </div>
  );
};

export default SellerDashboard;
