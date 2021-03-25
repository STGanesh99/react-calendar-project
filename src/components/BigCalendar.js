import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isBefore,
  addMinutes,
} from "date-fns";
import eventList from "../sampleData.json";
import UpdateModal from "./UpdateModal";
import ShowModal from "./ShowModal";
import EventComponent from "./EventComponent";
import HeaderComponent from "./HeaderComponent";
import uniqid from "uniqid";
import "./BigCalendar.scss";

const locales = {
  "en-US": import("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const defaultEventData = {
    id: uniqid(),
    title: "",
    priority: "",
    start: new Date(),
    end: addMinutes(new Date(), 30),
    description: "",
    owner: "",
    members: [],
  };

  const [eventData, setEventData] = useState(eventList);
  const [updateModalState, setUpdateModalState] = useState(false);
  const [showModalState, setShowModalState] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(defaultEventData);
  const [showModalData, setShowModalData] = useState({
    date: new Date(),
    events: [],
  });
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
      <UpdateModal
        open={updateModalState}
        handleClose={() => {
          setUpdateModalState(false);
          setUpdateModalData(defaultEventData);
        }}
        data={updateModalData}
        events={eventList}
        updateHandler={setEventData}
      />
      <ShowModal
        open={showModalState}
        handleClose={() => {
          setShowModalState(false);
          setShowModalData({ date: new Date(), events: [] });
        }}
        data={showModalData}
        showUpdateModal={setUpdateModalState}
        modalDataHandler={(formData) =>
          setUpdateModalData({ ...defaultEventData, ...formData })
        }
        events={eventData}
        setEvents={setEventData}
      />
      <Calendar
        localizer={localizer}
        views={["month"]}
        events={eventData}
        startAccessor={(e) => new Date(e.start)}
        endAccessor={(e) => new Date(e.end)}
        style={{ height: 675 }}
        eventPropGetter={(event) => ({
          className: `priority-${event.priority}`,
        })}
        dayPropGetter={(date) => ({
          className: isBefore(date, new Date()) && "rbc-off-range-bg",
        })}
        date={date}
        onNavigate={() => {}}
        onShowMore={(events, date) => {
          setShowModalData({ date: date, events: events });
          setShowModalState(true);
        }}
        components={{
          event: (props) => (
            <EventComponent
              {...props}
              showUpdateModal={setUpdateModalState}
              modalDataHandler={(formData) =>
                setUpdateModalData({ ...defaultEventData, ...formData })
              }
              events={eventData}
              setEvents={setEventData}
            />
          ),
          toolbar: (props) => (
            <HeaderComponent
              {...props}
              showUpdateModal={setUpdateModalState}
              date={date}
              setDate={(d) => setDate(d)}
            />
          ),
        }}
      />
    </div>
  );
};

export default MyCalendar;
