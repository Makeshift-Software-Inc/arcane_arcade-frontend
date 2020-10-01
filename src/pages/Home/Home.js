import React from "react";

import "./Home.scss";
import "../../slider.css";

import Navbar from "../../components/Navbar/Navbar";

import bastion from "../../img/bastion.jpeg";
import fire_emblem from "../../img/fire_emblem.png";
import kingdomCome from "../../img/kingdom_come.jpeg";
import greedfall from "../../img/greedfall.jpg";
import xcom from "../../img/xcom.jpg";

const Home = () => {
  return (
    <div className="App">
      <Navbar />

      <div className="slider-container">
        <div className="slider">
          <a href="#slide-1">1</a>
          <a href="#slide-2">2</a>
          <a href="#slide-3">3</a>
          <a href="#slide-4">4</a>
          <a href="#slide-5">5</a>

          <div className="slides">
            <div id="slide-1">
              <img src={kingdomCome} alt="kingdom come deliverance cover" />
            </div>
            <div id="slide-2">
              <img src={fire_emblem} alt="civilizations 6 cover" />
            </div>
            <div id="slide-3">
              <img src={bastion} alt="bastion cover" />
            </div>
            <div id="slide-4">
              <img src={greedfall} alt="greedfall 6 cover" />
            </div>
            <div id="slide-5">
              <img src={xcom} alt="civilizations 6 cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
