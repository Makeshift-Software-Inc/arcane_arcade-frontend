import React from "react";

const Currency = ({
  nextStep,
  style,
  onTransitionEnd,
  update,
  fiatCurrency,
}) => {
  const handleChange = (e) => update({ fiatCurrency: e.target.value });

  return (
    <form
      className="fiat"
      onSubmit={nextStep}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      <ul className="questions">
        <li>
          <p>Which fiat currency will you be pricing in?</p>

          <div className="answer">
            <div className="select">
              <select value={fiatCurrency} onChange={handleChange}>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="CHF">CHF - Swiss Franc</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="SEK">SEK - Swedish Krona</option>
                <option value="NZD">NZD - New Zealand Dollar</option>
              </select>
            </div>
          </div>

          <button type="submit" className="topcoat-button--large continue">
            Continue
          </button>
        </li>
      </ul>
    </form>
  );
};

export default Currency;
