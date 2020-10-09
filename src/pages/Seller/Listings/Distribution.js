import React, { useEffect, useState } from "react";
import { useStore } from "../../../store";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";

import "./Distribution.scss";

import Errors from "../../../components/Errors/Errors";
import Loading from "../../../components/Loading/Loading";

const ChooseDistribution = observer(({ onChange, selected }) => {
  return (
    <div className="choose-distribution">
      <h4>Choose Distribution Method</h4>
      <label className="topcoat-radio-button">
        Steam Keys
        <input
          type="radio"
          name="distibution"
          value="steam_keys"
          checked={selected === "steam_keys"}
          onChange={onChange}
        />
        <div className="topcoat-radio-button__checkmark"></div>
      </label>
      <label className="topcoat-radio-button">
        Installer
        <input
          type="radio"
          name="distibution"
          value="installer"
          checked={selected === "installer"}
          onChange={onChange}
        />
        <div className="topcoat-radio-button__checkmark"></div>
      </label>
    </div>
  );
});

const SteamKeys = observer(({ steamKeys, add, remove }) => {
  const [key, setKey] = useState("");
  const [error, setError] = useState(null);

  const addKey = (k) => {
    const keyToAdd = k ? k : key;
    setError(false);

    if (keyToAdd.trim().length === 0) {
      setError("Please enter a valid key.");
      setKey("");
      return;
    }

    if (steamKeys.includes(keyToAdd)) {
      setError("Same key is already added.");
      setKey("");
      return;
    }

    add(keyToAdd.trim());
    setKey("");
  };

  const addKeys = () => {
    if (key.includes(",")) {
      const keys = key.split(",");
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
        Upload your keys (50 minimum) ---- ({50 - steamKeys.length} left to add)
      </p>
      <div className="keys">
        {steamKeys.map((key) => (
          <p key={key} className="key">
            {key}
            <a href="#" className="delete" data-key={key} onClick={removeKey}>
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
          className="topcoat-button--large"
        >
          ADD KEY
        </button>
      </div>
      <p>Split your keys with comma, and we will process them all at once.</p>
      {error && <p className="error">{error}</p>}
    </div>
  );
});

const Installer = observer(({ addInstaller, installer }) => {
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
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          const file = e.dataTransfer.items[i].getAsFile();
          addInstaller(file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        addInstaller(e.dataTransfer.files[i]);
      }
    }
  };

  return (
    <div className="uploader">
      <div
        className="drop-placeholder"
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onDragLeave={cancelDrop}
      >
        {installer ? (
          <h4>Installer added {installer.name}</h4>
        ) : (
          <h4>Drop installer here</h4>
        )}
        {canDrop && <h1>Drop now</h1>}
      </div>
    </div>
  );
});

const Console = observer(({ distribution, platformName, create }) => {
  return (
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
      <button onClick={create} type="button" className="topcoat-button--large">
        CREATE
      </button>
      {distribution.errors.full_messages.length > 0 && (
        <Errors errors={distribution.errors.full_messages.toJSON()} />
      )}
    </div>
  );
});

const PC = observer(({ platformName, distribution, create }) => {
  const onChange = (e) => {
    distribution.setMethod(e.target.value);
  };

  return (
    <div className="platform">
      {platformName}
      <br />
      <ChooseDistribution selected={distribution.method} onChange={onChange} />
      {distribution.method === "steam_keys" ? (
        <SteamKeys
          steamKeys={distribution.steam_keys}
          add={distribution.addKey}
          remove={distribution.removeKey}
        />
      ) : (
        <Installer
          installer={distribution.installer}
          addInstaller={distribution.addInstaller}
        />
      )}
      <br />
      <br />
      <button
        disabled={
          distribution.installer && distribution.installer.uploaded
            ? false
            : true
        }
        onClick={create}
        type="button"
        className="topcoat-button--large"
      >
        CREATE
      </button>
      {distribution.installer && !distribution.installer.uploaded && (
        <p>Installer is uploading.</p>
      )}
      {distribution.errors.full_messages.length > 0 && (
        <Errors errors={distribution.errors.full_messages.toJSON()} />
      )}
    </div>
  );
});

const Platform = observer(({ platform, redirect }) => {
  if (platform.supported_platform.name === "PC" || platform.distribution)
    return null;

  if (platform.creatingDistribution) return <Loading />;

  const create = async (e) => {
    if (platform.distributionForm.validate()) {
      await platform.createDistribution();
      redirect();
    }
  };

  if (["WINDOWS", "LINUX", "MAC"].includes(platform.supported_platform.name)) {
    return (
      <PC
        distribution={platform.distributionForm}
        platformName={platform.supported_platform.name}
        create={create}
      />
    );
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
      seller: { selectedGame, loadGames, loadingGames, selectGame },
    },
  } = useStore("auth");

  useEffect(() => {
    const load = async () => {
      await loadGames();
      selectGame(match.params.id);
    };

    load();
  }, []);

  if (loadingGames || !selectedGame || selectedGame.creatingDistributions)
    return <Loading />;

  const redirect = () => {
    if (selectedGame.distributionsSet()) {
      history.push({
        pathname: "/",
        state: { notification: "Done" },
      });
    }
  };

  return (
    <div className="App add-distribution">
      <h2>Add distribution for {selectedGame.title}</h2>

      {selectedGame.supported_platform_listings.map((platform) => (
        <Platform key={platform.id} platform={platform} redirect={redirect} />
      ))}
    </div>
  );
};

export default observer(Distribution);
