import React from 'react';
import { timeConverter } from '../utils';

const Day = (props) => {
  const { currentDay, dark, events, openModal, selectedDate } = props;
  const truncate = events.slice(0, 3);
  return (
    dark ?
      <div className="date dark">{currentDay}
      </div> :
      <div className="date">{currentDay}
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
