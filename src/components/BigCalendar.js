import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import eventList from "../sampleData.json";
import "./BigCalendar.scss";
import { Button } from "@material-ui/core";
import UpdateModal from "./UpdateModal";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const [showModalState, setShowModalState] = useState(false);
  const [eventData, setEventData] = useState(eventList);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        style={{ alignSelf: "flex-end" }}
        onClick={() => setShowModalState(true)}
      >
        + Add new Task
      </Button>
      <UpdateModal
        open={showModalState}
        handleClose={() => setShowModalState(false)}
        formHandler={(formData) => setEventData([...eventData, formData])}
      />
      <Calendar
        localizer={localizer}
        views={["month"]}
        events={eventData}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={(event) => ({
          className: `priority-${event.priority}`,
        })}
      />
    </div>
  );
};

export default MyCalendar;
