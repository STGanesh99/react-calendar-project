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
import EventComponent from "./EventComponent";
import Toolbar from "./toolbar"

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
  const [modalData, setModalData] = useState({});
  const [eventData, setEventData] = useState(eventList);
  const [date,setDate] = useState(new Date())
  
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
        handleClose={() => {setShowModalState(false);
        setModalData({});}}
        formHandler={(formData) => {setEventData([...eventData, formData])
        console.log(formData)
        }}
        data={modalData}
        events={eventList}
        date = {date} 
        edit = {(events)=>{setEventData(events)}}
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
        popup = {true}
        date={date}
        components={{
          event: (props) => (
            <EventComponent
              {...props}
              showModal={setShowModalState}
              modalDataHandler={setModalData}
              events ={eventData}
              setevents = {setEventData} 
            />
          ),
          toolbar:(props)=>(
            <Toolbar {...props} date = {date} setDate={(d)=>setDate(d)} />
          )  
        }}
      />
    </div>
  );
};

export default MyCalendar;
