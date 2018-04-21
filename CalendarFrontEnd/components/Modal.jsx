import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Form from './AddEventForm';
import { timeConverter } from '../utils';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '50%',
  },
};
Modal.setAppElement('#app');

class ModalStyled extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    axios.delete(`/api/event/${id}`)
      .then(res => res)
      .then(() => {
        this.props.onFormSubmit();
      });
  }

  render() {
    const {
      modalIsOpen, afterOpenModal, onRequestClose, selectedDate, onFormSubmit, events,
    } = this.props;
    return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
      >
        <button onClick={onRequestClose}>close</button>
        <div>
          {events.map((eventObj) => {
            const { event, time, _id } = eventObj;
            return (
              <div key={_id}>
                <p>{`${timeConverter(time)}: ${event.slice(0, 15)}`}<button onClick={() => { this.handleDelete(_id); }} >Delete</button></p>
              </div>
            );
          })}
          <Form selectedDate={selectedDate} onFormSubmit={onFormSubmit} onRequestClose={onRequestClose} />
        </div>
      </Modal>
    );
  }
}

export default ModalStyled;

