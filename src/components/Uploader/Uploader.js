import React, { useState } from "react";
import { observer } from "mobx-react";

import SortablePreviews from "./SortablePreviews";

import "./Uploader.scss";

const Uploader = ({ accepts, files, addFile, reorder }) => {
  const [canDrop, setCanDrop] = useState(false);

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

  return (
    // TODO: implement Browse
    <div className="uploader">
      <div className="drop-column">
        <div
          className="drop-placeholder"
          onDrop={handleDrop}
          onDragOver={allowDrop}
          onDragLeave={cancelDrop}
          >
          {!canDrop && <h4>Drag & Drop or <a>Browse</a></h4>}
          {canDrop && <h1>Drop Now</h1>}
        </div>
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
