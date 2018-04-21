import React, { Component } from 'react';
import axios from 'axios';

class AddEventFrom extends Component {
  constructor() {
    super();
    this.state = {};
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
        onRequestClose();
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Event
        <input onChange={this.handleChange} type="text" name="event" required />
        </label>
        <label>Time
          <input onChange={this.handleChange} type="time" name="time" required />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AddEventFrom;
