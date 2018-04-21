import React, { Component } from 'react';
import axios from 'axios';
import { Day, Modal } from './components';
import { eventHasher, months, createCalendar } from './utils';


class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      currentMonth: 3,
      currentYear: 2018,
      calendar: [],
      events: {},
      modalIsOpen: false,
      selectedDate: new Date(),
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    // grab all events put on state
    const { currentMonth, currentYear } = this.state;
    this.state.calendar = createCalendar(currentMonth, currentYear);;
    axios.get('/api/event')
      .then((res) => {
        const events = res.data;
        this.setState({ events: eventHasher(events) });
      });
  }
  onFormSubmit() {
    axios.get('/api/event')
      .then((res) => {
        const events = res.data;
        this.setState({ events: eventHasher(events) });
      });
  }

  handleClick(action) {
    let { currentMonth, currentYear } = this.state;
    if (action === 'right') {
      if (currentMonth === 11) {
        const calendar = createCalendar(0, currentYear);
        this.setState({
          currentMonth: 0,
          currentYear: currentYear += 1,
          calendar,
        });
      } else {
        const calendar = createCalendar(currentMonth += 1, currentYear);
        this.setState({
          currentMonth,
          calendar,
        });
      }
    } else if (currentMonth === 0) {
      const calendar = createCalendar(11, currentYear);

      this.setState({
        currentMonth: 11,
        currentYear: currentYear -= 1,
        calendar,
      });
    } else {
      const calendar = createCalendar(currentMonth -= 1, currentYear);
      this.setState({
        currentMonth, calendar,
      });
    }
  }

  openModal(selectedDate) {
    this.setState({ modalIsOpen: true, selectedDate });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const monthObj = months();
    const {
      currentMonth, currentYear, calendar, events, modalIsOpen, selectedDate,
    } = this.state;
    const monthColor = { backgroundColor: monthObj[currentMonth].color };
    const monthWord = monthObj[currentMonth].mon;
    return (
      <div className="container">
        <Modal currentMonth={monthWord} monthColor={monthColor} onFormSubmit={this.onFormSubmit} events={events[currentYear] && events[currentYear][currentMonth] && events[currentYear][currentMonth][selectedDate.getDate()] ? events[currentYear][currentMonth][selectedDate.getDate()] : []} modalIsOpen={modalIsOpen} onRequestClose={this.closeModal} onAfterOpen={this.afterOpenModal} selectedDate={selectedDate} onFormSubmit={this.onFormSubmit} />
        <div className="header" style={monthColor}> 
          <i onClick={() => (this.handleClick('left'))} className="fa fa-arrow-left" />
          <div>{monthWord}<span> {currentYear}  </span>
            <i onClick={() => (this.handleClick('right'))} className="fa fa-arrow-right" />
          </div>
        </div>
        <div className="flex calendar">
          {calendar.length && calendar.map((day) => {
            const date = day.date ? day.date.getDate() : null;
            const month = day.date ? day.date.getMonth() : null;
            const year = day.date ? day.date.getFullYear() : null;
            return (
              <Day openModal={this.openModal} events={events[year] && events[year][month] && events[year][month][date] ? events[year][month][date] : []} dark={day.dark} selectedDate={day.date} day={day.day} key={day._id} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
