import React, { useEffect } from 'react';

import './Modal.scss';

const Modal = ({
  close, children, blue, className,
}) => {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className={`modal is-active arcane-modal ${className || ''}`}>
      <div className="modal-background" />
      <div className={`modal-content ${blue ? 'is-blue' : ''}`}>{children}</div>
      {close && (
        <button
          type="button"
          onClick={close}
          className="modal-close is-large"
          aria-label="close"
        />
      )}
    </div>
  );
};

export default Modal;
