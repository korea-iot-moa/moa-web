import React, { useState } from 'react';
import ReactModal from 'react-modal';
import * as styles from './style';

ReactModal.setAppElement('#root');

const Modal: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <button onClick={openModal} style={styles.openModalButton}>열기</button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: styles.modalOverlay,
          content: styles.modalContent,
        }}
      >
        <h2>Modal Title</h2>
        <p>This is the content of the modal</p>
        <button onClick={closeModal} style={styles.closeModalButton}>닫기</button>
      </ReactModal>
    </div>
  );
};

export default Modal;
