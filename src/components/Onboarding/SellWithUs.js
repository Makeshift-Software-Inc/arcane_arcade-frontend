import React from "react";

const SellWithUs = ({
  sellWithUs,
  nextStep,
  update,
  style,
  onTransitionEnd,
}) => {
  const toggle = () => update({ sellWithUs: !sellWithUs });

  return (
    <form
      className="wants-to-sell"
      onSubmit={nextStep}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      <ul className="questions">
        <li>
          <p>Are you interested in selling your game(s) on Arcane Arcade?</p>

          <div className="answer">
            <div>NO</div>
            <input
              type="checkbox"
              id="wants-to-sell"
              onChange={toggle}
              name="user[wants-to-sell]"
              value={sellWithUs}
            />
            <label htmlFor="wants-to-sell">Toggle</label>
            <div>YES</div>
          </div>

          <button type="submit" className="topcoat-button--large continue">
            Continue
          </button>
        </li>
      </ul>
    </form>
  );
};

export default SellWithUs;
