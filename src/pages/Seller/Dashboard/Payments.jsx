import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { Line } from 'chart.js';
import 'chart.js/dist/Chart.min.css';

import { useStore } from '../../../store';
import Loading from '../../../components/Loading/Loading';

import CoinWallets from './CoinWallets/CoinWallets';

const ChartOptions = ({ options, onClick, active }) => options.map((option) => (
  <div className="button-bar__item" key={option}>
    <button
      type="button"
      name={option}
      onClick={onClick}
      className={`button-bar__button ${active === option ? 'active' : ''}`}
    >
      {option}
    </button>
  </div>
));

const Payments = () => {
  const [showCoinWalletsModal, setShowCoinWalletsModal] = useState(false);
  const [activeChartOption, setActiveChartOption] = useState('Daily');

  const lineChartCtx = useRef(null);

  const {
    user: {
      seller: {
        statsLoaded, loadStats, statsLabelsFor, statsDataFor,
      },
    },
  } = useStore('auth');

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (statsLoaded) {
      const labels = statsLabelsFor(activeChartOption);
      const data = statsDataFor(activeChartOption);
      // eslint-disable-next-line no-new
      new Line(lineChartCtx.current, {
        data: {
          labels,
          datasets: [
            {
              label: 'ORDERS',
              data,
              backgroundColor: 'rgba(69,57,240, 0.2)',
              borderColor: 'rgba(42, 106, 152, 1)',
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
  }, [statsLoaded, activeChartOption]);

  const closeCoinWalletsModal = () => {
    setShowCoinWalletsModal(false);
  };

  const openCoinWalletsModal = () => {
    setShowCoinWalletsModal(true);
  };

  if (!statsLoaded) return <Loading />;

  const chartOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  const handleChartOptionClick = (e) => {
    setActiveChartOption(e.target.name);
  };

  return (
    <div className="dashboard">
      <div className="manage-payments">
        <button type="button" className="button" onClick={openCoinWalletsModal}>
          Manage Payments
        </button>
      </div>
      <canvas id="lineChart" ref={lineChartCtx} />
      <div className="chart-filters">
        <div className="button-bar">
          <ChartOptions
            active={activeChartOption}
            options={chartOptions}
            onClick={handleChartOptionClick}
          />
        </div>
      </div>
      {showCoinWalletsModal && <CoinWallets close={closeCoinWalletsModal} />}
    </div>
  );
};

export default observer(Payments);
