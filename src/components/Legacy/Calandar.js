import React, { useState } from "react";
import sampleData from "../sampleData.json";

import clsx from "clsx";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
  isAfter,
  isBefore,
} from "date-fns";
import "./Calandar.css";
import CalendarHeader from "./Header";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currMonthState, setCurrMonthState] = useState(new Date());
  const [eventData, setEventData] = useState(sampleData);
  let currMonthEvents = eventData.filter((event) =>
    isSameMonth(new Date(event.startDate), currMonthState)
  );
  const eventStartDates = currMonthEvents.map(
    (event) => new Date(event.startDate)
  );
  const eventEndDates = currMonthEvents.map((event) => new Date(event.endDate));
  const renderCells = () => {
    const monthStart = startOfMonth(currMonthState);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        let isEventStartDay =
          eventStartDates.find((startDate) => isSameDay(day, startDate));
          let isEventEndDay =
          eventEndDates.find((endDate) => isSameDay(day, endDate));
        let isEventIntervalDay =
          !isEventStartDay &&
          !isEventEndDay &&
          eventStartDates.filter(
            (startDate, index) =>
              isAfter(day, startDate) && isBefore(day, eventEndDates[index])
              ).length > 0;
          let eventDetails = currMonthEvents.filter((event) =>
            isSameDay(day, new Date(event.startDate))
          );
        const cloneDay = day;
        days.push(
          <div
            className={clsx(
              "col",
              "cell",
              !isSameMonth(day, currMonthState) && "disabled",
              isToday(day) && "today",
              isSameMonth(day, selectedDate) &&
                isSameDay(day, selectedDate) &&
                "selected"
            )}
            key={day}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <div
              className="eventContainer"
              style={{ position: "relative", top: "25px" }}
            >
                    {isEventStartDay && <div className="event event-start">{ eventDetails.length && eventDetails[0].title}</div>}
              {isEventIntervalDay && <div className="event event-interval"></div>}
              {isEventEndDay && <div className="event event-end"></div>}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      <CalendarHeader
        currentMonth={currMonthState}
        monthHandler={setCurrMonthState}
      />
      {renderCells()}
    </div>
  );
}

export default Calendar;
