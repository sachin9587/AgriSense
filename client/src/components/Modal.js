import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Modal.css';

const Modal = ({ title, content, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Event listener for ESC key
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          {content}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;