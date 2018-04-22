import React, { Component } from 'react';
import axios from 'axios';

class AddEventFrom extends Component {
  constructor() {
    super();
    this.state = {
      event: '',
      end: '',
      start: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { onRequestClose, onFormSubmit } = this.props;
    const formData = this.state;
    formData.date = this.props.selectedDate;
    axios.post('/api/event', formData)
      .then(res => res)
      .then(() => {
        onFormSubmit();
        // onRequestClose();
        this.setState({ event: '' });
      });
  }

  render() {
    const { time, event, start, end } = this.state;
    return (
      <form id="add-event"className="container" onSubmit={this.handleSubmit}>
        <label>Add Event:
        <input onChange={this.handleChange} type="text" name="event" value={event} required />
        </label>
        <label>Start:
          <input onChange={this.handleChange} type="time" name="start" value={start} required />
        </label>
        <label>End:
          <input onChange={this.handleChange} type="time" name="end" value={end} required />
        </label>
        <button className="add-event-button" type="submit">Submit</button>
      </form>
    );
  }
}

export default AddEventFrom;
