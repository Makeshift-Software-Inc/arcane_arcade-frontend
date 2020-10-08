import React, { useEffect, useState } from "react";
import { useStore } from "../../../store";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";

import "./Distribution.scss";

import Loading from "../../../components/Loading/Loading";

const ChooseDistribution = ({ onChange, selected }) => {
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
};

const SteamKeys = ({ steamKeys, add, remove }) => {
  const [key, setKey] = useState("");

  const addKey = (e) => {
    add(key);
    console.log(key);
    setKey("");
  };

  const onChange = (e) => {
    setKey(e.target.value);
  };

  return (
    <div className="steam_keys">
      <p>
        Upload your keys (50 minimum) ---- ({50 - steamKeys.length} left to add)
      </p>
      <div className="keys">
        {steamKeys.map((key) => (
          <p key={key}>{key}</p>
        ))}
      </div>
      <input
        type="text"
        value={key}
        onChange={onChange}
        className="topcoat-text-input"
      />
      <button type="button" onClick={addKey}>
        ADD
      </button>
    </div>
  );
};

const Installer = ({ addInstaller, installer }) => {
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
};

const Console = ({ platform, steamKeys, addKey, removeKey }) => {
  return (
    <div className="platform">
      {platform.name}
      <br />
      <SteamKeys steamKeys={steamKeys} add={addKey} remove={removeKey} />
    </div>
  );
};

const PC = ({
  platform,
  steamKeys,
  addKey,
  removeKey,
  addInstaller,
  installer,
}) => {
  const [selectedDistribution, setSelectedDistribution] = useState(
    "steam_keys"
  );

  const onChange = (e) => {
    setSelectedDistribution(e.target.value);
  };

  return (
    <div className="platform">
      {platform.name}
      <br />
      <ChooseDistribution selected={selectedDistribution} onChange={onChange} />
      {selectedDistribution === "steam_keys" ? (
        <SteamKeys steamKeys={steamKeys} add={addKey} remove={removeKey} />
      ) : (
        <Installer installer={installer} addInstaller={addInstaller} />
      )}
    </div>
  );
};

const Platform = ({ platform }) => {
  const [steamKeys, setSteamKeys] = useState([]);
  const [installer, setInstaller] = useState(false);

  const addKey = (key) => {
    setSteamKeys([...steamKeys, key]);
  };

  const removeKey = (key) => {
    setSteamKeys(steamKeys.filter((k) => k !== key));
  };

  if (platform.name === "PC") return null;

  if (["WINDOWS", "LINUX", "MAC"].includes(platform.name)) {
    return (
      <PC
        steamKeys={steamKeys}
        addKey={addKey}
        removeKey={removeKey}
        platform={platform}
        installer={installer}
        addInstaller={setInstaller}
      />
    );
  }

  return (
    <Console
      steamKeys={steamKeys}
      addKey={addKey}
      removeKey={removeKey}
      platform={platform}
    />
  );
};

const Distribution = ({ match }) => {
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

  if (loadingGames || !selectedGame) return <Loading />;

  return (
    <div className="App add-distribution">
      <p>Add distribution for {selectedGame.title}</p>

      {selectedGame.supported_platforms.map((platform) => (
        <Platform key={platform.id} platform={platform} />
      ))}
    </div>
  );
};

export default observer(Distribution);
