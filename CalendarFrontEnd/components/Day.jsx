import React from 'react';
import { timeConverter, eventTruncate } from '../utils';

const Day = (props) => {
  const { currentDay, dark, events, openModal, selectedDate, day } = props;
  const truncate = events.slice(0, 3); // Limit amount of events in calendar view
  return (
    dark ?
      <div className="date dark">{''}
      </div> :
      <div onClick={() => (openModal(selectedDate))} className="date" role="link">{day}
        {truncate.map((eventObj) => {
          const { event, start, _id } = eventObj;
          return (
            <div className="date-preview" key={_id}>
              <p><span className="date-preview-time">{timeConverter(start)}: </span>{ eventTruncate(event)}</p>
            </div>
          );
        })}
      </div>
  );
};

export default Day;
