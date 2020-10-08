import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { observer } from "mobx-react";

import "./Dashboard.scss";

import { useStore } from "../../../store";

const SellerDashboard = () => {
  const {
    user: {
      seller: { games, loadingGames, loadGames, selectGame },
    },
  } = useStore("auth");

  useEffect(() => {
    loadGames();
  }, []);

  if (loadingGames) return <Loading />;

  return (
    <div className="App seller-dashboard">
      Seller Dashboard
      <Link to="/sell-your-game">Create Listing</Link>
      <div>
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/sell-your-game/${game.id}/distribution/add`}
          >
            {game.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default observer(SellerDashboard);
