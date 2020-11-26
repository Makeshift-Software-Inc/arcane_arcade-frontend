import React, { useState } from 'react';
import { observer } from 'mobx-react';

const SteamKeys = ({ steamKeys, add, remove }) => {
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
      <div className="keys">
        {steamKeys.map((steamKey) => (
          <p key={steamKey} className="key">
            {steamKey}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="delete"
              data-key={steamKey}
              onClick={removeKey}
            >
              X
            </a>
          </p>
        ))}
      </div>
      <p className="flex-row justify-between">
        <span>50 minimum</span>
        <span>
          {50 - steamKeys.length}
          {' '}
          left to add
        </span>
      </p>
      <div className="enter-key">
        <input
          type="text"
          value={key}
          placeholder="Enter your key"
          onChange={onChange}
          className="topcoat-text-input--large"
          onKeyUp={onKeyUp}
        />
        <button type="button" onClick={addKeys} className="button">
          ADD KEY
        </button>
      </div>
      <p>Split your keys with comma, and we will process them all at once.</p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default observer(SteamKeys);
