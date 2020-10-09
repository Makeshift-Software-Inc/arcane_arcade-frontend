import React from "react";
import { Link } from "react-router-dom";

import {Line} from 'chart.js'
import 'chart.js/dist/Chart.min.css'

import Api from "../../../services/Api";

import "./Dashboard.scss";
import Navbar from "../../../components/Navbar/Navbar";


class SellerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.lineChartCtx = React.createRef();

    this.state = {
      chartInterval: 'daily',
      active_listings:  [],
      pending_listings: []
    }
  }

  componentDidMount() {
    const lineChart = new Line(this.lineChartCtx.current, {
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "ORDERS",
            data: [10,8,6,5,12,8,16,17,6,7,6,10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
         legend: {
             labels: {
                 fontColor: 'red',
                 fontSize: 18,
             }
         }
     }
    });

    Api.get('/listings/seller_listings').then((response) => {
      let activeListings = [];
      let pendingListings = [];

      response.data.data.forEach((listing, i) => {
        if (listing.attributes.status === 'pending')
          pendingListings.push(listing.attributes)

        if (listing.attributes.status === 'active')
          activeListings.push(listing.attributes)
      });

      debugger
    })
  }

  render() {
    return (
      <div className="App seller-dashboard">
        <Navbar />

      <div className="post">
        <Link to="/sell-your-game">
          <button class="topcoat-button--large" >
            Create Listing
          </button>
        </Link>
      </div>

        <canvas id="lineChart" ref={this.lineChartCtx}></canvas>
          <div className="chart-filters">
            <div className="topcoat-button-bar">
              <div className="topcoat-button-bar__item">
                <button className="topcoat-button-bar__button--large">Daily</button>
              </div>
              <div className="topcoat-button-bar__item">
                <button className="topcoat-button-bar__button--large">Weekly</button>
              </div>
              <div className="topcoat-button-bar__item">
                <button className="topcoat-button-bar__button--large">Monthly</button>
              </div>
              <div className="topcoat-button-bar__item">
                <button className="topcoat-button-bar__button--large">Yearly</button>
              </div>
            </div>
          </div>

          <div className="listings">
            <div className="active">
            </div>
            <div className="pending">
            </div>
          </div>
      </div>
    );
  }
};

export default SellerDashboard;
