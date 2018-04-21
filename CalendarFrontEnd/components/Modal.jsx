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
    width: '50%',
    padding: '0px',
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
      modalIsOpen, afterOpenModal, onRequestClose, selectedDate, onFormSubmit, events, monthColor, currentMonth
    } = this.props;
    return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
      >
        <div style={monthColor} className="modal-header">
          <p>{currentMonth} {selectedDate.getDate()}</p>
          <button onClick={onRequestClose} className="modal-close">X</button>
        </div>
        <div className="event-content">
          {events.map((eventObj) => {
            const { event, time, _id } = eventObj;
            return (
              <div className="event" key={_id}>
                <div className="event-container">
                  <p>{`${timeConverter(time)}: ${event}`}</p>
                </div>
                <button className="event-delete" onClick={() => { this.handleDelete(_id); }} >Delete</button>
              </div>
            );
          })}
        </div>
        <Form selectedDate={selectedDate} onFormSubmit={onFormSubmit} onRequestClose={onRequestClose} />
      </Modal>
    );
  }
}

export default ModalStyled;
