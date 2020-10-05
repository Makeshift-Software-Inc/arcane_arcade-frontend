import React from "react";
import { sortableHandle } from "react-sortable-hoc";

const DragHandle = sortableHandle(() => <span className="drag-handle">+</span>);

const Preview = ({ file }) => {
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

export default Preview;
