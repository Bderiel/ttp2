import React, { Component } from 'react';
import axios from 'axios';
import { Day } from './components';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      currentMonth: 4,
      currentYear: 2018,
    };
    this.months = this.months.bind(this);
    this.daysInMonth = this.daysInMonth.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // grab all events put on state
  }
  months() {
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
    const output = [];
    for (let i = 1; i <= 35; i++) {
      if (i <= days) {
        output.push({ day: i });
      } else {
        output.push({ day: i % days, dark: true });
      }
    }
    return output;
  }
  handleClick(action) {
    let { currentMonth, currentYear } = this.state;
    if (action === 'right') {
      if (currentMonth === 11) {
        this.setState({
          currentMonth: 0,
        });
      } else {
        this.setState({
          currentMonth: currentMonth += 1,
        });
      }
    } else if (currentMonth === 0) {
      this.setState({
        currentMonth: 11,
      });
    } else {
      this.setState({
        currentMonth: currentMonth -= 1,
      });
    }
  }
  render() {
    const month = this.months();
    const { currentMonth, currentYear } = this.state;
    console.log(currentMonth, 'currentMonth');
    const days = this.daysInMonth(currentMonth, currentYear);
    return (
      <div className="container">

        <div className="header">
          <div>{month[currentMonth]}<span> {currentYear}  </span>
            <i onClick={() => (this.handleClick('left'))} className="fa fa-arrow-left" />
            <i onClick={() => (this.handleClick('right'))} className="fa fa-arrow-right" />
          </div>
        </div>


        <div className="flex calendar">
          {days.map((day, idx) => {
            console.log(1);
            return (
              <Day dark={day.dark} currentDay={day.day} key={days[idx].day} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
