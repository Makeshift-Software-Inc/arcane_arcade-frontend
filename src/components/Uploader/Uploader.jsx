import React, { Fragment, useState, useRef } from 'react';
import { observer } from 'mobx-react';

import imageIcon from '../../img/uploader/image.svg';
import gifIcon from '../../img/uploader/gif.svg';
import videoIcon from '../../img/uploader/video.svg';

import './Uploader.scss';

const Uploader = ({ accept, addFile, className }) => {
  const [canDrop, setCanDrop] = useState(false);
  const inputField = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setCanDrop(false);
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i += 1) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          addFile(file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
        addFile(e.dataTransfer.files[i]);
      }
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
    setCanDrop(true);
  };

  const cancelDrop = (e) => {
    e.preventDefault();
    setCanDrop(false);
  };

  const chooseFiles = (e) => {
    e.preventDefault();
    inputField.current.click();
  };

  const handleFilesChange = (e) => {
    if (e.target.files.length) {
      const { files: newFiles } = e.target;
      for (let i = 0; i < newFiles.length; i += 1) {
        addFile(newFiles[i]);
      }
    }
  };

  const onDragEnter = () => {
    setCanDrop(true);
  };

  return (
    <div
      className="uploader"
      onDrop={handleDrop}
      onDragOver={allowDrop}
      onDragEnter={onDragEnter}
      onDragLeave={cancelDrop}
    >
      <div
        className={`drop-placeholder flex-column ${
          canDrop ? 'drag-over' : ''
        } ${className || ''}`}
      >
        <div className="drop-placeholder-icons flex-row justify-between is-hidden-touch">
          <div className="flex-row drop-placeholder-icon align-center justify-center">
            <img src={imageIcon} alt="Icon" />
            <div className="flex-column icon-details">
              <p className="icon-title">High Resolution Image</p>
              <p className="icon-caption">PNG, JPG</p>
            </div>
          </div>
          <div className="flex-row drop-placeholder-icon align-center justify-center">
            <img src={gifIcon} alt="Icon" />
            <div className="flex-column icon-details">
              <p className="icon-title">Animated Gif</p>
              <p className="icon-caption">1024x720, 1920x1080</p>
            </div>
          </div>
          <div className="flex-row drop-placeholder-icon align-center justify-center">
            <img src={videoIcon} alt="Icon" />
            <div className="flex-column icon-details">
              <p className="icon-title">Videos</p>
              <p className="icon-caption">MP4, 16:9</p>
            </div>
          </div>
        </div>
        <span className="drop-here flex-grow flex-row align-center justify-center mobile-flex-column">
          {canDrop ? (
            'Drop Now'
          ) : (
            <Fragment>
              Drag & Drop or
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" onClick={chooseFiles}>
                Browse
              </a>
            </Fragment>
          )}
        </span>
      </div>
      <input
        multiple
        type="file"
        className="is-hidden"
        accept={accept}
        ref={inputField}
        onChange={handleFilesChange}
      />
    </div>
  );
};

export default observer(Uploader);
