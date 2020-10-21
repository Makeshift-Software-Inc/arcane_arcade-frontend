import React, { useEffect, useState, createRef } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Line } from 'chart.js';
import 'chart.js/dist/Chart.min.css';

import CoinWallets from './CoinWallets/CoinWallets';

import Loading from '../../../components/Loading/Loading';
import './Dashboard.scss';
import Navbar from '../../../components/Navbar/Navbar';

import { useStore } from '../../../store';

const SellerDashboard = () => {
  const [showCoinWalletsModal, setShowCoinWalletsModal] = useState(false);

  const {
    user: {
      seller: {
        activeGames, pendingGames, loadingGames, loadGames,
      },
    },
  } = useStore('auth');

  useEffect(() => {
    loadGames();
  }, []);

  const closeCoinWalletsModal = () => {
    setShowCoinWalletsModal(false);
  };

  const openCoinWalletsModal = () => {
    setShowCoinWalletsModal(true);
  };

  const lineChartCtx = React.createRef();
  useEffect(() => {
    if (!loadingGames) {
      // eslint-disable-next-line no-new
      new Line(lineChartCtx.current, {
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'ORDERS',
              data: [10, 8, 6, 5, 12, 8, 16, 17, 6, 7, 6, 10],
              backgroundColor: [
                'rgba(69,57,240, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(42, 106, 152, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            labels: {
              fontColor: 'rgba(69,57,240, 1)',
              fontSize: 14,
            },
          },
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingGames]);

  if (loadingGames) return <Loading />;

  const myGamesRef = createRef();
  const myGamesContent = createRef();
  const dashboardRef = createRef();
  const dashboardContent = createRef();

  const switchPanels = (e) => {
    e.preventDefault();

    const { target } = e;

    let sibling;

    if (target === dashboardRef.current) {
      sibling = target.previousSibling;
    } else {
      sibling = target.nextSibling;
    }

    if (!target.classList.contains('selected')) {
      sibling.classList.remove('selected');
      target.classList.add('selected');

      const dashboard = dashboardContent.current;
      const myGames = myGamesContent.current;
      if (dashboard.classList.contains('is-hidden')) {
        dashboard.classList.remove('is-hidden');
        myGames.classList.add('is-hidden');
      } else {
        dashboard.classList.add('is-hidden');
        myGames.classList.remove('is-hidden');
      }
    }
  };

  return (
    <div className="App seller-dashboard">
      <Navbar />

      <div className="links">
        {/* eslint-disable-next-line */}
        <a
          ref={myGamesRef}
          role="link"
          tabIndex={0}
          onKeyDown={switchPanels}
          onClick={switchPanels}
        >
          My Game(s)
        </a>
        {/* eslint-disable-next-line */}
        <a
          role="link"
          tabIndex={0}
          ref={dashboardRef}
          onClick={switchPanels}
          onKeyDown={switchPanels}
          className="selected"
        >
          Dashboard
        </a>
      </div>

      <div className="dashboard" ref={dashboardContent}>
        <div className="manage-payments">
          <button
            type="button"
            className="button"
            onClick={openCoinWalletsModal}
          >
            Manage Payments
          </button>
        </div>
        <canvas id="lineChart" ref={lineChartCtx} />
        <div className="chart-filters">
          <div className="button-bar">
            <div className="button-bar__item">
              <button
                type="button"
                className="button-bar__button"
              >
                Daily
              </button>
            </div>
            <div className="button-bar__item">
              <button
                type="button"
                className="button-bar__button--large"
              >
                Weekly
              </button>
            </div>
            <div className="button-bar__item">
              <button
                type="button"
                className="button-bar__button--large"
              >
                Monthly
              </button>
            </div>
            <div className="button-bar__item">
              <button
                type="button"
                className="button-bar__button--large"
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-games is-hidden" ref={myGamesContent}>
        <div className="post">
          <Link to="/sell-your-game">
            <button type="button" className="button">
              Post a New Game
            </button>
          </Link>
        </div>
        <div className="listings">
          <div className="active">
            <h1>Active Listings</h1>

            {activeGames().map((game) => (
              <Tippy
                content={(
                  <div className="info">
                    <p>{game.title}</p>

                    <div className="actions">
                      <div className="topcoat-button-bar">
                        <div className="topcoat-button-bar__item">
                          <Link key={game.id} to={`/games/${game.slug}`}>
                            <button
                              type="button"
                              className="topcoat-button-bar__button"
                            >
                              View
                            </button>
                          </Link>
                        </div>

                        <div className="topcoat-button-bar__item">
                          <Link key={game.id} to={`/games/${game.slug}/edit`}>
                            <button
                              type="button"
                              className="topcoat-button-bar__button"
                            >
                              Edit
                            </button>
                          </Link>
                        </div>

                        <div className="topcoat-button-bar__item">
                          <Link
                            key={game.id}
                            to={`/sell-your-game/${game.id}/distribution/add`}
                          >
                            <button
                              type="button"
                              className="topcoat-button-bar__button"
                            >
                              Manage
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                interactive
                interactiveBorder={20}
                delay={100}
                arrow
                placement="auto"
                key={game.id}
              >
                <div className="game-listing">
                  <img src={game.images[0]} alt={`${game.title} cover`} />
                </div>
              </Tippy>
            ))}
          </div>

          <div className="pending">
            <h1>Pending Listings</h1>

            {pendingGames().map((game) => (
              <Tippy
                content={(
                  <div className="info">
                    <p>{game.title}</p>

                    <div className="actions">
                      <div className="topcoat-button-bar">
                        <div className="topcoat-button-bar__item">
                          <Link key={game.id} to={`/games/${game.slug}`}>
                            <button
                              type="button"
                              className="topcoat-button-bar__button"
                            >
                              View
                            </button>
                          </Link>
                        </div>

                        <div className="topcoat-button-bar__item">
                          <Link key={game.id} to={`/games/${game.slug}/edit`}>
                            <button
                              type="button"
                              className="topcoat-button-bar__button"
                            >
                              Edit
                            </button>
                          </Link>
                        </div>

                        <div className="topcoat-button-bar__item">
                          <Link
                            key={game.id}
                            to={`/sell-your-game/${game.id}/distribution/add`}
                          >
                            <button
                              type="button"
                              className="topcoat-button-bar__button"
                            >
                              Manage
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                interactive
                interactiveBorder={20}
                delay={100}
                arrow
                placement="auto"
                key={game.id}
              >
                <div className="game-listing">
                  <img src={game.images[0]} alt={`${game.title} cover`} />
                </div>
              </Tippy>
            ))}
          </div>
        </div>
      </div>
      {showCoinWalletsModal && <CoinWallets close={closeCoinWalletsModal} />}
    </div>
  );
};

export default observer(SellerDashboard);
