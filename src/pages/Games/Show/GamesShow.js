import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";

import { useStore } from "../../../store";

import './GamesShow.scss'

import Navbar from "../../../components/Navbar/Navbar";

const GamesShow = ({ history }) => {
  const gamesStore = useStore("games");
  const { slug } = useParams()

  useEffect(() => {
  }, []);

  debugger
  return (
    <div className="App listings-show">
      <Navbar />
    </div>
  )
};

export default observer(GamesShow);
