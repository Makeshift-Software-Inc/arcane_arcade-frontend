import React, { useEffect } from 'react';

const Modal = ({ close, children }) => {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">{children}</div>
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
