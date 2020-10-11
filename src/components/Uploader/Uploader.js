import React, { useState, useRef } from "react";
import { observer } from "mobx-react";

import Tippy from "@tippyjs/react";

import SortablePreviews from "./SortablePreviews";

import "./Uploader.scss";

const Uploader = ({ accept, files, addFile, reorder }) => {
  const [canDrop, setCanDrop] = useState(false);
  const inputField = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setCanDrop(false);
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          const file = e.dataTransfer.items[i].getAsFile();
          addFile(file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    reorder(oldIndex, newIndex);
  };

  const chooseFiles = (e) => {
    e.preventDefault();
    inputField.current.click();
  };

  const handleFilesChange = (e) => {
    if (e.target.files.length) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        addFile(files[i]);
      }
    }
  };

  return (
    <div className="uploader">
      <div className="icons">
        <Tippy
          content={`High Resolution Image (.png, .jpeg, .gif 1024x720, 1920x1080)`}
          interactive={true}
          interactiveBorder={20}
          delay={100}
          arrow={true}
          placement="auto"
        >
          <i className="far fa-image"></i>
        </Tippy>
        <Tippy
          content={`Videos (.mp4, .webm) 16:9`}
          interactive={true}
          interactiveBorder={20}
          delay={100}
          arrow={true}
          placement="auto"
        >
          <i className="far fa-file-video"></i>
        </Tippy>
      </div>

      <div className="drop-column">
        <div
          className="drop-placeholder"
          onDrop={handleDrop}
          onDragOver={allowDrop}
          onDragLeave={cancelDrop}
        >
          {!canDrop && (
            <h4>
              Drag & Drop or{" "}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" onClick={chooseFiles}>
                Browse
              </a>
            </h4>
          )}
          {canDrop && <h1>Drop Now</h1>}
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

      <div className="preview-column">
        <SortablePreviews
          files={files}
          onSortEnd={onSortEnd}
          helperClass="SortableHelper"
          axis="xy"
          useDragHandle
        />
      </div>
    </div>
  );
};

export default observer(Uploader);
