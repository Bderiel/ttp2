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
  }
  componentDidMount() {
    // grab all events put on state
  }
  months() {
    return {
      1: 'January',
      2: 'Feburary',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
    };
  }

  daysInMonth(month, year) {
    const days = new Date(year, month, 0).getDate();
    const output = [];
    for (let i = 1; i <= 35; i++) {
      if (i <= days) {
        output.push({ day: i });
      } else {
        output.push({ day: i % days, dark:true });
      }
    }
    return output;
  }

  render() {
    const month = this.months();
    const { currentMonth, currentYear } = this.state;
    const days = this.daysInMonth(currentMonth, currentYear);
    return (
      <div className="container">
       
        <div className="header">
          <div>{month[currentMonth]}<span> {currentYear}  </span>
            <i class="fa fa-arrow-left"></i>
            <i class="fa fa-arrow-right"></i>
          </div>
        </div>
       
        
        <div className="flex calendar">
          {days.map((day, idx) => {
            console.log(1);
            return (
              <Day dark={day.dark} currentDay={day.day} key={days[idx]} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
