import React, { Fragment, useState } from 'react';
import {
  Slider, Rail, Handles, Tracks,
} from 'react-compound-slider';

import './Range.scss';

const SliderRail = ({ getRailProps }) => (
  <Fragment>
    <div className="rail-outer-style" {...getRailProps()} />
    <div className="rail-inner-style" />
  </Fragment>
);

const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) => (
  <Fragment>
    <div
      className="handle-outer"
      style={{ left: `${percent}%` }}
      {...getHandleProps(id)}
    />
    {/* eslint-disable-next-line */}
    <div
      className={`handle-inner ${disabled ? 'disabled' : ''}`}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{ left: `${percent}%` }}
    />
  </Fragment>
);

const Track = ({
  source, target, getTrackProps, disabled,
}) => (
  <div
    className={`range-track ${disabled ? 'disabled' : ''}`}
    style={{
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);

const RangeSlider = ({
  range, values, setValues, maxValue,
}) => {
  const [update, setUpdate] = useState(range);

  const onUpdate = (newValues) => {
    setUpdate(newValues);
  };

  const onChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <div className="arcane-range-slider">
      <Slider
        mode={2}
        step={1}
        domain={range}
        values={values}
        update={update}
        onUpdate={onUpdate}
        onChange={onChange}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={range}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
      <div className="range-text">
        <span>
          From $
          {update[0]}
          {' '}
          to $
          {maxValue && update[1] === maxValue ? `${update[1]}+` : update[1]}
        </span>
      </div>
    </div>
  );
};

export default RangeSlider;
