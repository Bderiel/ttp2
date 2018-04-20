import React from 'react';

const Day = (props) => {
  const { currentDay, dark, events } = props;
  const truncate = events.slice(0, 3);
  return (
    dark ?
      <div className="date dark">{currentDay}
      </div> :
      <div className="date">{currentDay}
        {truncate.map((event) => {
          return (<p>{event.slice(0, 15)}</p>);
        })}
      </div>
  );
};

export default Day;
