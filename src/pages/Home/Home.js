import React from "react";

import ReactPlayer from "react-player";

import { observer } from "mobx-react";

import "./Home.scss";
import "../../slider.css";

import Navbar from "../../components/Navbar/Navbar";

import GamesListings from "./GamesListings";

import bastion from "../../img/bastion.jpeg";
import fire_emblem from "../../img/fire_emblem.png";
import kingdomCome from "../../img/kingdom_come.jpeg";
import greedfall from "../../img/greedfall.jpg";
import xcom from "../../img/xcom.jpg";

import { useStore } from "../../store";

const Home = () => {
  const { selectedGame } = useStore("games");

  return (
    <div className="App">
      <Navbar />

      <div className="slider-container">
        {selectedGame && (
          <div>
            <ReactPlayer
              url={selectedGame.videos[0]}
              playing={true}
              width="55vw"
              height="50vh"
              autoPlay
              controls
              muted
            />
          </div>
        )}
        {!selectedGame && (
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
        )}
      </div>

      <nav
        className="navbar browse-listings"
        role="navigation"
        aria-label="main navigation"
      >
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <input
                type="search"
                placeholder="enter search term or tag"
                className="topcoat-search-input"
              />
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <label htmlFor="sort-by">Sort By</label>

              <div className="select">
                <select name="sort-by">
                  <option value="sort_by">Relevance</option>
                  <option value="release_date">Release Date</option>
                  <option value="Name">Name</option>
                  <option value="price_asc">Lowest Price</option>
                  <option value="price_desc">Highest Price</option>
                  <option value="reviews">User Reviews</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="games">
        <div className="game-list">
          <GamesListings />
        </div>

        <div className="filters">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Narrow by Price</p>
            </header>
            <div className="card-content">
              <div className="content">
                <input type="range" className="topcoat-range" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Home);
