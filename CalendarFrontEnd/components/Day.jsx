import React from 'react';
import { timeConverter } from '../utils';

const Day = (props) => {
  const { currentDay, dark, events, openModal, selectedDate,day } = props;
  const truncate = events.slice(0, 2); // Limit amount of events in calendar view
  return (
    dark ?
      <div className="date dark">{''}
      </div> :
      <div className="date">{day}
        <button onClick={() => (openModal(selectedDate))}>View</button>
        {truncate.map((eventObj) => {
          const { event, time, _id } = eventObj;
          return (
            <div key={_id}>
              <p>{`${timeConverter(time)}:  ` + event.slice(0, 15)}</p>
            </div>
          );
        })}
      </div>
  );
};

export default Day;
