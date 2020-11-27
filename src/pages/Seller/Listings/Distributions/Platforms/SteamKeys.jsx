import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react';

import Papa from 'papaparse';

const SteamKeys = ({ steamKeys, add, remove }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(null);
  const [parsing, setParsing] = useState(false);

  const fileInputRef = useRef(null);

  const addKey = (k) => {
    const keyToAdd = k || key;
    setError(false);

    if (keyToAdd.trim().length === 0) {
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

  const browse = () => {
    fileInputRef.current.click();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setError(false);
    if (file) {
      if (file.type !== 'text/csv') {
        setError('Only CSV files are supported.');
        return;
      }
      setParsing(true);
      Papa.parse(file, {
        complete: (parsed) => {
          setParsing(false);
          if (parsed.errors.length) {
            setError("We couldn't parse your CSV file.");
            return;
          }

          parsed.data.forEach((data) => {
            data
              .map((k) => k.trim())
              .filter((k) => k.length > 0)
              .forEach((k) => {
                if (!steamKeys.includes(k)) {
                  add(k);
                }
              });
          });
        },
      });
    }
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
      <p className="flex-row justify-between counter">
        <span>50 minimum</span>
        <span>
          {steamKeys.length}
          {' '}
          added
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
      <div className="csv-parser flex-column align-center">
        <input
          ref={fileInputRef}
          type="file"
          className="is-hidden"
          onChange={handleFile}
        />
        <button
          type="button"
          disabled={parsing}
          onClick={browse}
          className="button"
        >
          {parsing ? 'Loading...' : 'Import from CSV File'}
        </button>
      </div>

      {error && <p className="error text-center">{error}</p>}
    </div>
  );
};

export default observer(SteamKeys);
