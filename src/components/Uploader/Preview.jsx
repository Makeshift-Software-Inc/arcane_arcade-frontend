import React from 'react';
import { observer } from 'mobx-react';
// import { sortableHandle } from 'react-sortable-hoc';
// import Loading from '../Loading/Loading';

import closeIcon from '../../img/close_white.svg';

// const DragHandle = sortableHandle(() => <span className="drag-handle">+</span>);

const RemoveHandle = ({ onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <a className="remove-handle" href="#" onClick={handleClick}>
      <img src={closeIcon} alt="Remove" />
    </a>
  );
};

const Preview = ({ file }) => (
  // if (file.loading) {
  //   return (
  //     <div className="preview">
  //       <Loading />
  //       <div className="progress">
  //         <div
  //           className="progress-bar"
  //           style={{ width: `${file.progress}%` }}
  //         />
  //       </div>
  //     </div>
  //   );
  // }
  <div className="uploader-preview">
    <RemoveHandle onClick={file.remove} />
    {file.type.startsWith('video') ? (
      // eslint-disable-next-line
      <video src={file.url} draggable={false} />
    ) : (
      <img src={file.url} alt={file.name} draggable={false} />
    )}
    {file.loading && (
      <div className="progress">
        <div className="progress-bar" style={{ width: `${file.progress}%` }} />
      </div>
    )}
  </div>
);
export default observer(Preview);
