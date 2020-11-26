import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import { useStore } from '../../../../store';

import useBreakpoints from '../../../../hooks/useBreakpoints';

import Loading from '../../../../components/Loading/Loading';
import Navbar from '../../../../components/Navbar/Navbar';
import Tabs from '../../../../components/Tabs/SystemRequirementsTabs';

import Platform from './Platforms/Platform';

import './Distributions.scss';

const Distributions = ({ match, history }) => {
  const [selectedTab, setSelectedTab] = useState('');
  const { isMobile } = useBreakpoints();

  const {
    user: {
      seller: {
        selectedGame, loadGames, loadingGames, selectGame,
      },
    },
  } = useStore('auth');

  useEffect(() => {
    const load = async () => {
      await loadGames();
      selectGame(match.params.id);
    };

    load();
  }, []);

  const tabOptions = useRef([]);

  useEffect(() => {
    if (selectedGame) {
      tabOptions.current = selectedGame
        .groupedSupportedPlatforms()
        .map((distribution) => distribution.supported_platform.name);

      setSelectedTab(tabOptions.current[0]);
    }
  }, [selectedGame]);

  if (loadingGames || !selectedGame) return <Loading />;

  const redirect = () => {
    if (selectedGame.distributionsSet()) {
      history.push({
        pathname: '/',
        state: { notification: 'Done' },
      });
    }
  };

  const metaDesc = 'Add Installers or Steam keys to be purchased for Bitcoin or Monero.';
  return (
    <div className="App seller-game-distributions">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Add Distributions for ${selectedGame.title}`}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>
      <Navbar />

      <div className="seller-game-distributions-content">
        <h1 className="form-title">
          Add distributions for
          <br />
          {selectedGame.title}
        </h1>

        <div className="distributions-container flex-column">
          <Tabs
            mobile={isMobile}
            options={tabOptions.current}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          {selectedGame.groupedSupportedPlatforms().map((platform) => (
            <Platform
              key={platform.id}
              platform={platform}
              redirect={redirect}
              selected={platform.supported_platform.name === selectedTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(Distributions);
