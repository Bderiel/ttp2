import React, { Component } from 'react';
import axios from 'axios';
import { Day } from './components';

let shortid = require('shortid');

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      currentMonth: 3,
      currentYear: 2018,
      daysInMonth: [],
    };
    this.months = this.months.bind(this);
    this.daysInMonth = this.daysInMonth.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // grab all events put on state
    const { currentMonth, currentYear } = this.state;
    this.daysInMonth(currentMonth, currentYear);
  }
  months() { // make utils
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

  daysInMonth(month, year) {
    const days = new Date(year, month, 0).getDate();
    const FirstDay = new Date(year, month, 1).getDay();
    let daysInMonth = [] // fill array to account for day that month starts with

    for (let i = 0; i < FirstDay; i++) daysInMonth.push({ day: '', dark: true, _id: shortid.generate() });
    
    for (let i = 1; i <= 35 - FirstDay; i++) {
      if (i <= days) {
        daysInMonth.push({ day: i, _id: shortid.generate() });
      } else {
        daysInMonth.push({ day: '', dark: true, _id: shortid.generate() });
      }
    }
    this.setState({ daysInMonth });
  }
  handleClick(action) {
    let { currentMonth, currentYear } = this.state;
    if (action === 'right') {
      if (currentMonth === 11) {
        this.setState({
          currentMonth: 0,
        });
        this.daysInMonth(0, currentYear);
      } else {
        this.setState({
          currentMonth: currentMonth += 1,
        });
        this.daysInMonth(currentMonth, currentYear);
      }
    } else if (currentMonth === 0) {
      this.setState({
        currentMonth: 11,
      });
      this.daysInMonth(11, currentYear);
    } else {
      this.setState({
        currentMonth: currentMonth -= 1,
      });
      this.daysInMonth(currentMonth, currentYear);
    }
  }
  render() {
    const month = this.months();
    const { currentMonth, currentYear, daysInMonth } = this.state;
    console.log(daysInMonth);
    return (
      <div className="container">
        <div className="header">
          <i onClick={() => (this.handleClick('left'))} className="fa fa-arrow-left" />
          <div>{month[currentMonth]}<span> {currentYear}  </span>
            <i onClick={() => (this.handleClick('right'))} className="fa fa-arrow-right" />
          </div>
        </div>
        <div className="flex calendar">
          {daysInMonth.length && daysInMonth.map((day, idx) => {
            const test = ['this is a test', 'what is life?', 'okay', 'testing'];
            return (
              <Day events={test} dark={day.dark} currentDay={day.day} key={day._id} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
