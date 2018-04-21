import shortid from 'shortid';

export function eventHasher(events) {
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
      hash[year][month][day] = [{
        event: events[i].event, _id: events[i]._id, start: events[i].start, end: events[i].end,
      }];
    } else {
      hash[year][month][day].push({
        event: events[i].event,
        _id: events[i]._id,
        start: events[i].start,
        end: events[i].end,
      });
    }
  }
  return hash;
}

export function months() { // make utils
  return [{ color: '#B0BEC5', mon: 'January' },
    { color: '#EF5350', mon: 'Feburary' },
    { color: '#673AB7', mon: 'March' },
    { color: '#64B5F6', mon: 'April' },
    { color: '#01579B', mon: 'May' },
    { color: '#66BB6A', mon: 'June' },
    { color: '#AED581', mon: 'July' },
    { color: '#AFB42B', mon: 'August' },
    { color: '#FFC107', mon: 'September' },
    { color: '#E65100', mon: 'October' },
    { color: '#1976D2', mon: 'November' },
    { color: 'goldenrod', mon: 'December' }];
}


export function createCalendar(month, year) {
  const days = new Date(year, month + 1, 0).getDate();
  const FirstDay = new Date(year, month, 1).getDay();
  const output = []; // fill array to account for day that month starts with
  console.log(days, 'days');
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

export function timeConverter(time) {
  if (!time) return '';
  time = time.split(':'); // convert to array
  // fetch
  const hours = Number(time[0]);
  const minutes = Number(time[1]);
  // calculate
  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = `${hours}`;
  } else if (hours > 12) {
    timeValue = `${hours - 12}`;
  } else if (hours == 0) {
    timeValue = '12';
  }

  timeValue += (minutes < 10) ? `:0${minutes}` : `:${minutes}`; // get minutes
  timeValue += (hours >= 12) ? ' pm' : ' am'; // get AM/PM
  return timeValue;
}

export function eventTruncate(detail) {
  return detail.length > 10 ? `${detail.slice(0, 7)}...` : detail;
}
