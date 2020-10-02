import React from "react";

const AreYouPublisher = ({
  isSeller,
  nextStep,
  update,
  style,
  onTransitionEnd,
}) => {
  const toggle = () => update({ isSeller: !isSeller });

  return (
    <form
      className="is-a-seller"
      onSubmit={nextStep}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      <ul className="questions">
        <li>
          <p>Are you a game developer or publisher?</p>

          <div className="answer">
            <div>NO</div>
            <input
              type="checkbox"
              id="is-a-seller"
              onChange={toggle}
              name="is_a_seller"
              value={isSeller}
            />
            <label htmlFor="is-a-seller">Toggle</label>
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

export default AreYouPublisher;
