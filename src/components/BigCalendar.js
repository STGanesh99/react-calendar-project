import React, { useState,useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isBefore,
  addMinutes,
} from "date-fns";

import UpdateModal from "./UpdateModal";
import ShowModal from "./ShowModal";
import EventComponent from "./EventComponent";
import HeaderComponent from "./HeaderComponent";
import uniqid from "uniqid";
import "./BigCalendar.scss";
import { useLocation } from "react-router-dom";
import {
  useHistory
} from "react-router-dom";
import axios from 'axios';
import {CircularProgress} from '@material-ui/core'
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
  const history = useHistory();
  const location = useLocation();
  const [eventData, setEventData] = useState([]);
  const [spinner,setspinner] = useState(true)
  useEffect(()=>{
     if(location.state==undefined){
       history.replace("/")
     }
     setTimeout(()=>{
     axios.get("sampleData.json")
     .then(res => {
       const persons = res.data;
       setEventData(persons)
       setspinner(false)
     })},2000)
  },[location.state])
  const defaultEventData = {
    id: uniqid(),
    title: "",
    priority: "",
    start: new Date(),
    end: addMinutes(new Date(), 30),
    description: "",
    owner: location.state?.email,
    members: [],
  };
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
    {spinner&&<div style={{textAlign:"center",margin:"300px"}}><CircularProgress size="10rem"/></div>}
      <UpdateModal
        open={updateModalState}
        handleClose={() => {
          setUpdateModalState(false);
          setUpdateModalData(defaultEventData);
        }}
        data={updateModalData}
        events={eventData}
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
      {!spinner&&<Calendar
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
      />}
    </div>
  );
};

export default MyCalendar;
