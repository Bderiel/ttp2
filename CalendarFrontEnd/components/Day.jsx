import React from 'react';

const Day = (props) => {
  const { currentDay, dark } = props;
  console.log(currentDay);
  return (
    dark ?
      <div className="date dark">{currentDay}</div> :
      <div className="date">{currentDay}</div>
  );
};

export default Day;