import React from "react";

const StudioSize = ({
  nextStep,
  style,
  onTransitionEnd,
  update,
  studioSize,
}) => {
  const handleChange = (e) => update({ studioSize: e.target.value });

  return (
    <form
      className="studio-size"
      onSubmit={nextStep}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      <ul className="questions">
        <li>
          <p>Which best describes the size of your game company?</p>

          <div className="answer">
            <div className="select">
              <select value={studioSize} onChange={handleChange}>
                <option value="INDIE">Indie</option>
                <option value="MIDSIZE">Mid-Size</option>
                <option value="AAA">AAA</option>
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

export default StudioSize;
