import React from 'react';
import styles from './Modal.module.css'; // make sure to create this CSS module

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
