import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { observer } from "mobx-react";

import { Line } from "chart.js";
import "chart.js/dist/Chart.min.css";

import "./Dashboard.scss";
import Navbar from "../../../components/Navbar/Navbar";

import { useStore } from "../../../store";

const SellerDashboard = () => {
  const {
    user: {
      seller: { games, activeGames, pendingGames, loadingGames, loadGames },
    },
  } = useStore("auth");

  const lineChartCtx = React.createRef();

  useEffect(() => {
    loadGames();
    new Line(lineChartCtx.current, {
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "ORDERS",
            data: [10, 8, 6, 5, 12, 8, 16, 17, 6, 7, 6, 10],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "red",
            fontSize: 18,
          },
        },
      },
    });
  }, []);

  if (loadingGames) return <Loading />;

  return (
    <div className="App seller-dashboard">
      <Navbar />

      <div className="post">
        <Link to="/sell-your-game">
          <button class="topcoat-button--large">Create Listing</button>
        </Link>
      </div>
      <canvas id="lineChart" ref={this.lineChartCtx}></canvas>
      <div className="chart-filters">
        <div className="topcoat-button-bar">
          <div className="topcoat-button-bar__item">
            <button className="topcoat-button-bar__button--large">Daily</button>
          </div>
          <div className="topcoat-button-bar__item">
            <button className="topcoat-button-bar__button--large">
              Weekly
            </button>
          </div>
          <div className="topcoat-button-bar__item">
            <button className="topcoat-button-bar__button--large">
              Monthly
            </button>
          </div>
          <div className="topcoat-button-bar__item">
            <button className="topcoat-button-bar__button--large">
              Yearly
            </button>
          </div>
        </div>
      </div>
      <div className="listings">
        <div className="active">
          {activeGames().map((game) => (
            <Link
              key={game.id}
              to={`/sell-your-game/${game.id}/distribution/add`}
            >
              {game.title}
            </Link>
          ))}
        </div>
        <div className="pending">
          {pendingGames().map((game) => (
            <Link
              key={game.id}
              to={`/sell-your-game/${game.id}/distribution/add`}
            >
              {game.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(SellerDashboard);
