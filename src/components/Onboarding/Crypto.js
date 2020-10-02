import React, { useState } from "react";
import { observer } from "mobx-react";

import btcIcon from "../../img/bitcoin.png";
import xmrIcon from "../../img/monero.png";

import Errors from "../Errors/Errors";

const Crypto = ({
  nextStep,
  style,
  onTransitionEnd,
  update,
  acceptedCrypto,
}) => {
  const [error, setError] = useState(null);

  const next = (e) => {
    e.preventDefault();
    if (acceptedCrypto.length > 0) {
      nextStep(e);
    } else {
      setError("Please choose at least one crypto currency.");
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      update({ acceptedCrypto: [...acceptedCrypto, e.target.value] });
    } else {
      update({
        acceptedCrypto: acceptedCrypto.filter(
          (name) => name !== e.target.value
        ),
      });
    }
  };

  const checked = (name) => !!acceptedCrypto.find((crypto) => crypto === name);

  const btcChecked = checked("BTC");
  const xmrChecked = checked("XMR");

  return (
    <form
      className="crypto"
      onSubmit={next}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      <ul className="questions">
        <li>
          <p>Which cryptocurrency would you like to be paid in?</p>

          <div className="answer">
            <div className="crypto-options">
              <div className="btc">
                <div className="coin-icon">
                  <img src={btcIcon} alt="bitcoin logo" />
                </div>

                <input
                  type="checkbox"
                  id="bitcoin"
                  onChange={handleChange}
                  checked={btcChecked}
                  name="accepted_crypto"
                  value="BTC"
                />
                <label htmlFor="bitcoin">Toggle</label>
              </div>

              <div className="xmr">
                <div className="coin-icon">
                  <img src={xmrIcon} alt="monero logo" />
                </div>

                <input
                  type="checkbox"
                  onChange={handleChange}
                  id="monero"
                  checked={xmrChecked}
                  name="accepted_crypto"
                  value="XMR"
                />
                <label htmlFor="monero">Toggle</label>
              </div>
            </div>
          </div>

          <Errors errors={[error]} />

          <button type="submit" className="topcoat-button--large continue">
            Continue
          </button>
        </li>
      </ul>
    </form>
  );
};

export default observer(Crypto);
