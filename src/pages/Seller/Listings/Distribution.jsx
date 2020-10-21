import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../store';
import { Helmet } from 'react-helmet';

import './Distribution.scss';

import Errors from '../../../components/Errors/Errors';
import Loading from '../../../components/Loading/Loading';

const ChooseDistribution = observer(({ onChange, selected }) => (
  <div className="choose-distribution">
    <h4>Choose Distribution Method</h4>
    <label className="topcoat-radio-button">
      Steam Keys
      <input
        type="radio"
        name="distibution"
        value="steam_keys"
        checked={selected === 'steam_keys'}
        onChange={onChange}
      />
      <div className="topcoat-radio-button__checkmark" />
    </label>
    <label className="topcoat-radio-button">
      Installer
      <input
        type="radio"
        name="distibution"
        value="installer"
        checked={selected === 'installer'}
        onChange={onChange}
      />
      <div className="topcoat-radio-button__checkmark" />
    </label>
  </div>
));

const SteamKeys = observer(({ steamKeys, add, remove }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(null);

  const addKey = (k) => {
    const keyToAdd = k || key;
    setError(false);

    if (keyToAdd.trim().length === 0) {
      setError('Please enter a valid key.');
      setKey('');
      return;
    }

    if (steamKeys.includes(keyToAdd)) {
      setError('Same key is already added.');
      setKey('');
      return;
    }

    add(keyToAdd.trim());
    setKey('');
  };

  const addKeys = () => {
    if (key.includes(',')) {
      const keys = key.split(',');
      keys.forEach((k) => addKey(k));
    } else {
      addKey();
    }
  };

  const removeKey = (e) => {
    e.preventDefault();
    remove(e.target.dataset.key);
  };

  const onChange = (e) => {
    setKey(e.target.value);
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) addKeys();
  };

  return (
    <div className="steam_keys">
      <p>
        Upload your keys (50 minimum) ---- (
        {50 - steamKeys.length}
        {' '}
        left to add)
      </p>
      <div className="keys">
        {steamKeys.map((steamKey) => (
          <p key={steamKey} className="key">
            {steamKey}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="delete" data-key={steamKey} onClick={removeKey}>
              X
            </a>
          </p>
        ))}
      </div>
      <div className="enter-key">
        <input
          type="text"
          value={key}
          placeholder="Enter your key"
          onChange={onChange}
          className="topcoat-text-input--large"
          onKeyUp={onKeyUp}
        />
        <button
          type="button"
          onClick={addKeys}
          className="button"
        >
          ADD KEY
        </button>
      </div>
      <p>Split your keys with comma, and we will process them all at once.</p>
      {error && <p className="error">{error}</p>}
    </div>
  );
});

const Installer = observer(({ platform }) => {
  const [canDrop, setCanDrop] = useState(false);

  const cancelDrop = (e) => {
    e.preventDefault();
    setCanDrop(false);
  };

  const allowDrop = (e) => {
    e.preventDefault();
    setCanDrop(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setCanDrop(false);
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i += 1) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          platform.distributionForm.addInstaller(file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
        platform.distributionForm.addInstaller(e.dataTransfer.files[i]);
      }
    }
  };

  return (
    <div className="uploader">


      <br />
      <br />
      <h4>
        Installer for
        {platform.supported_platform.name}
      </h4>
      <div
        className="drop-placeholder"
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onDragLeave={cancelDrop}
      >
        {platform.distributionForm.installer ? (
          <h4>
            Installer for
            {' '}
            {platform.supported_platform.name}
            {' '}
            added
            {' '}
            {platform.distributionForm.installer.name}
          </h4>
        ) : (
          <h4>
            Drop installer for
            {platform.supported_platform.name}
            {' '}
            here
          </h4>
        )}
        {canDrop && <h1>Drop now</h1>}
      </div>
      {platform.distributionForm.installer && (
        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${platform.distributionForm.installer.progress}%`,
            }}
          />
        </div>
      )}
    </div>
  );
});

const Console = observer(({ distribution, platformName, create }) => (
  <div className="platform">
    {platformName}
    <br />
    <SteamKeys
      steamKeys={distribution.steam_keys}
      add={distribution.addKey}
      remove={distribution.removeKey}
    />
    <br />
    <br />
    <button onClick={create} type="button" className="button">
      CREATE
    </button>
    {distribution.errors.full_messages.length > 0 && (
    <Errors errors={distribution.errors.full_messages.toJSON()} />
    )}
  </div>
));

const Installers = observer(({ platforms }) => platforms.map((platform) => (
  <Installer key={platform.id} platform={platform} />
)));

const PC = observer(({ platform, create }) => {
  const childrens = platform.getChildrenPlatforms();

  if (childrens.every((children) => children.distribution)) return null;

  const onChange = (e) => {
    platform.distributionForm.setMethod(e.target.value);
  };

  return (
    <div className="platform">
      {platform.supported_platform.name}
      <br />
      <ChooseDistribution
        selected={platform.distributionForm.method}
        onChange={onChange}
      />
      {platform.distributionForm.method === 'steam_keys' ? (
        <SteamKeys
          steamKeys={platform.distributionForm.steam_keys}
          add={platform.distributionForm.addKey}
          remove={platform.distributionForm.removeKey}
        />
      ) : (
        <Installers platforms={childrens} />
      )}
      <br />
      <br />
      <button
        disabled={platform.uploadingInstallers()}
        onClick={create}
        type="button"
        className="button"
      >
        CREATE
      </button>
      {platform.uploadingInstallers() && <p>Installers are uploading</p>}
      {platform.distributionForm.errors.full_messages.length > 0 && (
        <Errors
          errors={platform.distributionForm.errors.full_messages.toJSON()}
        />
      )}
    </div>
  );
});

const Platform = observer(({ platform, redirect }) => {
  if (platform.distribution) return null;

  if (platform.creatingDistribution) return <Loading />;

  const create = async () => {
    if (platform.distributionForm.validate()) {
      await platform.createDistribution();
      redirect();
    }
  };

  if (platform.supported_platform.name === 'PC') {
    return <PC platform={platform} create={create} />;
  }

  return (
    <Console
      distribution={platform.distributionForm}
      platformName={platform.supported_platform.name}
      create={create}
    />
  );
});

const Distribution = ({ match, history }) => {
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

  if (loadingGames || !selectedGame) return <Loading />;

  const redirect = () => {
    if (selectedGame.distributionsSet()) {
      history.push({
        pathname: '/',
        state: { notification: 'Done' },
      });
    }
  };

  const metaDesc = "Add Installers or Steam keys to be purchased for Bitcoin or Monero."
  return (
    <div className="App add-distribution">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Add Distribution for ${selectedGame.title}`}</title>
        <meta
          name="description"
          content={metaDesc}
        />
      </Helmet>

      <h2>
        Add distribution for
        {selectedGame.title}
      </h2>

      {selectedGame.groupedSupportedPlatforms().map((platform) => (
        <Platform key={platform.id} platform={platform} redirect={redirect} />
      ))}
    </div>
  );
};

export default observer(Distribution);
