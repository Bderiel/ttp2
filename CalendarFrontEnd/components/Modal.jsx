import React, { Component } from 'react';
import Modal from 'react-modal';
import Form from './AddEventForm';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#app');

const ModalStyled = (props) => {
  const { modalIsOpen, afterOpenModal, onRequestClose, selectedDate } = props;
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      style={customStyles}
    >
      <button onClick={onRequestClose}>x</button>
      <Form selectedDate={selectedDate} />
    </Modal>
  );
};
export default ModalStyled;

