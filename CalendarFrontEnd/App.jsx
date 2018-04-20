import React, { Component } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { Day, Modal } from './components';

function eventHasher(events) {
  const hash = {};
  for (let i = 0; i < events.length; i++) {
    const day = new Date(events[i].date).getDate();
    const month = new Date(events[i].date).getMonth();
    const year = new Date(events[i].date).getFullYear();
    if (!hash[year]) {
      hash[year] = {};
    }
    if (!hash[year][month]) {
      hash[year][month] = {};
    }
    if (!hash[year][month][day]) {
      hash[year][month][day] = [{ event: events[i].event, _id: events[i]._id }];
    } else {
      hash[year][month][day].push({
        event: events[i].event,
        _id: events[i]._id,
      });
    }
  }
  return hash;
}

function months() { // make utils
  return ['January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];
}

function createCalendar(month, year) {
  const days = new Date(year, month, 0).getDate();
  const FirstDay = new Date(year, month, 1).getDay();
  const output = []; // fill array to account for day that month starts with

  for (let i = 0; i < FirstDay; i++) output.push({ day: '', dark: true, _id: shortid.generate() });

  for (let i = 1; i <= 35 - FirstDay; i++) {
    if (i <= days) {
      output.push({ day: i, _id: shortid.generate(), date: new Date(year, month, i) });
    } else {
      output.push({ day: '', dark: true, _id: shortid.generate() });
    }
  }
  return output;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      currentMonth: 3,
      currentYear: 2018,
      calendar: [],
      events: null,
      modalIsOpen: false,
      selectedDate: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    // grab all events put on state
    const { currentMonth, currentYear } = this.state;
    const calendar = createCalendar(currentMonth, currentYear);
    this.setState({ calendar });
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
    console.log(selectedDate);
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
      currentMonth, currentYear, calendar, events, modalIsOpen, selectedDate
    } = this.state;
    return (
      <div className="container">
        <Modal modalIsOpen={modalIsOpen} onRequestClose={this.closeModal} onAfterOpen={this.afterOpenModal} selectedDate={selectedDate} />
        <div className="header">
          <i onClick={() => (this.handleClick('left'))} className="fa fa-arrow-left" />
          <div>{monthObj[currentMonth]}<span> {currentYear}  </span>
            <i onClick={() => (this.handleClick('right'))} className="fa fa-arrow-right" />
          </div>
        </div>
        <div className="flex calendar">
          {events && calendar.length && calendar.map((day) => {
            const date = day.date ? day.date.getDate() : null;
            const month = day.date ? day.date.getMonth() : null;
            const year = day.date ? day.date.getFullYear() : null;
            return (
              <Day openModal={this.openModal} events={events[year] && events[year][month] && events[year][month][date] ? events[year][month][date] : []} dark={day.dark} selectedDate={day.date} key={day._id} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
