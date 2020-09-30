import React from 'react';
import { ToastContainer } from 'react-toastify';


import './Home.scss';
import '../slider.css';

import Navbar from './Navbar.js'

import bastion from '../img/bastion.jpeg';
import fire_emblem from '../img/fire_emblem.png';
import kingdomCome from '../img/kingdom_come.jpeg';
import greedfall from '../img/greedfall.jpg';
import xcom from '../img/xcom.jpg';


class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />

        <Navbar loggedInStatus={this.props.loggedInStatus} />

        <div className="slider-container">
          <div className="slider">
            <a href="#slide-1">1</a>
            <a href="#slide-2">2</a>
            <a href="#slide-3">3</a>
            <a href="#slide-4">4</a>
            <a href="#slide-5">5</a>

            <div className="slides">
              <div id="slide-1">
                <img src={kingdomCome}  alt="kingdom come deliverance cover" />
              </div>
              <div id="slide-2">
                <img src={fire_emblem}  alt="civilizations 6 cover" />
              </div>
              <div id="slide-3">
                <img src={bastion}  alt="bastion cover" />
              </div>
              <div id="slide-4">
                <img src={greedfall}  alt="greedfall 6 cover" />
              </div>
              <div id="slide-5">
                <img src={xcom}  alt="civilizations 6 cover" />
              </div>
            </div>
          </div>

        </div>

        <nav class="navbar browse-listings" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" class="navbar-menu">
              <div class="navbar-start">
                <div class="navbar-item">
                  <input type="search" placeholder="enter search term or tag" class="topcoat-search-input" />
                </div>
              </div>

              <div class="navbar-end">
                <div class="navbar-item">
                  <label htmlFor="sort-by">Sort By</label>

                  <div class="select">
                    <select name="sort-by">
                      <option value="sort_by"
                        >Relevance
                      </option>
                      <option value="release_date">
                        Release Date
                      </option>
                      <option value="Name">
                        Name
                      </option>
                      <option value="price_asc">
                        Lowest Price
                      </option>
                      <option value="price_desc">
                        Highest Price
                      </option>
                      <option value="reviews">
                        User Reviews
                      </option>
                    </select>
                  </div>

                </div>
              </div>
            </div>
          </nav>

        <div className="games">
          <div className="game-list">
            <div className="game-listing">
              <img src={kingdomCome}  alt="kingdom come deliverance cover" />
            </div>

            <div className="game-listing">
              <img src={fire_emblem}  alt="civilizations 6 cover" />
            </div>

            <div className="game-listing">
              <img src={bastion}  alt="bastion cover" />

            </div>

            <div className="game-listing">
              <img src={greedfall}  alt="bastion cover" />

            </div><div className="game-listing">
              <img src={xcom}  alt="bastion cover" />

            </div>
          </div>

          <div className="filters">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Narrow by Price
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <input type="range" class="topcoat-range" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
