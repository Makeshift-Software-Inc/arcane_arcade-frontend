import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

const SellerDashboard = (props) => {
  return (
    <div>
      Seller Dashboard
      <Link to="/seller/listings/new">Create Listing</Link>
    </div>
  );
};

export default SellerDashboard;
