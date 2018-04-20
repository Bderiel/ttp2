import React from 'react';

const Day = (props) => {
  const { currentDay, dark, events, openModal, selectedDate } = props;
  const truncate = events.slice(0, 3);
  return (
    dark ?
      <div className="date dark">{currentDay}
      </div> :
      <div className="date">{currentDay}
        <button onClick={() => (openModal(selectedDate))}>Add</button>
        {truncate.map((event) => {
          return (
            <div className="flex">
              <p>{'12:00: ' + event.event.slice(0, 15)}</p>
            </div>
          );
        })}
      </div>
  );
};

export default Day;
