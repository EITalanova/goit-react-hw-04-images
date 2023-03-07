import { useEffect } from 'react';
import css from './Modal.module.css';

function Modal({ onClose, url, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); }
    // eslint-disable-next-line
  }, [])

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdpropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return (
      <div className={css.overlay} onClick={handleBackdpropClick}>
        <div className={css.modal}>
          <img src={url} alt={alt} />
          <button className={css.closeBtn} onClick={handleBackdpropClick}>
            ⛌
          </button>
        </div>
      </div>
    );
  
}

export default Modal;
