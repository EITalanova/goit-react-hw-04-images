import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdpropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleBackdpropClick}>
        <div className={css.modal}>
          <img src={url} alt={alt} />
          <button className={css.closeBtn} onClick={this.handleBackdpropClick}>
            ⛌
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
