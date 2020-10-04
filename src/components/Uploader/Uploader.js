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
    <div className="uploader">
      <div
        className="drop-placeholder"
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onDragLeave={cancelDrop}
      >
        <h4>Drop files here</h4>
        {canDrop && <h1>Drop now</h1>}
      </div>
      <SortablePreviews
        files={files}
        onSortEnd={onSortEnd}
        helperClass="SortableHelper"
        axis="xy"
        useDragHandle
      />
    </div>
  );
};

export default observer(Uploader);
