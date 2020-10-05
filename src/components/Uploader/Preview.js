import React from "react";
import { observer } from "mobx-react";
import { sortableHandle } from "react-sortable-hoc";
import Loading from "../Loading/Loading";

const DragHandle = sortableHandle(() => <span className="drag-handle">+</span>);

const Preview = ({ file }) => {
  if (file.loading)
    return (
      <div className="preview">
        <Loading />
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${file.progress}%` }}
          />
        </div>
      </div>
    );

  return (
    <div className="preview">
      <DragHandle />
      {file.type.startsWith("video") ? (
        <video controls src={file.url} draggable={false} />
      ) : (
        <img src={file.url} alt={file.name} draggable={false} />
      )}
    </div>
  );
};

export default observer(Preview);
