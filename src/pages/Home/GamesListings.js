import React, { useEffect } from "react";
import { useStore } from "../../store";
import { observer } from "mobx-react";

import GameListing from "../../components/GameListing/GameListing";
import Loading from "../../components/Loading/Loading";

const GamesListings = () => {
  const { games, load, loading } = useStore("games");

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;


  return games.map((game) => {
    return <GameListing key={game.id} game={game} />;
  });
};

export default observer(GamesListings);
