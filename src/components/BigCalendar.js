import React, { useState, useEffect } from "react";
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
import { useLocation, Redirect } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Snackbar } from "@material-ui/core";
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
  const location = useLocation();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const defaultEventData = {
    title: "",
    priority: "",
    start: new Date(),
    end: addMinutes(new Date(), 30),
    desc: "",
    members: [],
  };
  const [updateModalData, setUpdateModalData] = useState(defaultEventData);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    
    axios.post("http://13.127.179.148:8085/api/login?mail="+location.state?.email)
     .then((res)=>{
       setUpdateModalData({...res.data,...updateModalData})
     }).catch((err)=>{
           console.log("error in logging in please try again")
     }
     )
    
      var m  = date.getMonth()+"";
      m = Number(m)+1;
      const month = m.length==1?0+m:m;
      const year = date.getFullYear(); 

      axios.get("http://13.127.179.148:8085/api/eventdetails/monthview?month="+month+"&year="+year+"&userId=16")
      .then((res)=>{
        console.log(res.data.eventList[0])
         var events =  res.data.eventList[0].map((event)=>{
             return{
              title: event.eventname,
              priority:event.pid==1?"high":event.pid==2?"medium":"low",
              start: new Date(event.fromDate+"T"+event.fromTime),
              end: new Date(event.toDate+"T"+event.toTime),
              desc: event.eventDescription,
              members: event.memberDetails,
              owner:event.adminemail
             }
         })
         console.log(events)
         setLoading(false)
         setEventData([...events])
      });

    },[]);
  const [updateModalState, setUpdateModalState] = useState(false);
  const [showModalState, setShowModalState] = useState(false);
 
  const [postUpdateState, setPostUpdateState] = useState(null);
  const [showModalData, setShowModalData] = useState({
    date: new Date(),
    events: [],
  });
  
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
      {!location.state && <Redirect to="/login" />}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={err}
        onClose={() => setErr(false)}
        message="Server is down... Please try later..."
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={postUpdateState ? true : false}
        autoHideDuration={6000}
        onClose={() => setPostUpdateState(null)}
        message={postUpdateState}
      />
      {loading && (
        <div style={{ textAlign: "center", margin: "300px" }}>
          <CircularProgress size="10rem" />
        </div>
      )}
      <UpdateModal
        open={updateModalState}
        handleClose={() => {
          setUpdateModalState(false);
          setUpdateModalData(defaultEventData);
        }}
        data={updateModalData}
        events={eventData}
        updateHandler={setEventData}
        setMessage={setPostUpdateState}
        date={date}
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
      {!loading && !err && (
        <Calendar
          localizer={localizer}
          views={["month"]}
          selectable={true}
          events={eventData}
          startAccessor={(e) => new Date(e.start)}
          endAccessor={(e) => new Date(e.end)}
          style={{ height: 675 }}
          eventPropGetter={(event) => ({
            className: `priority-${event.priority}`,
          })}
          dayPropGetter={(date) => ({
            className:
              isBefore(date, new Date()) && "rbc-off-range rbc-off-range-bg",
          })}
          date={date}
          onNavigate={() => {}}
          onShowMore={(events, date) => {
            setShowModalData({ date: date, events: events.slice(1) });
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
                owner={location.state.email}
              />
            ),
          }}
          onSelectSlot={(props) => {
            if (
              props.start.getMonth() === date.getMonth() &&
              props.start > new Date()
            ) {
              setUpdateModalState(true);
              setUpdateModalData({
                ...updateModalData,
                start: props.start,
                end: addMinutes(props.start, 30),
              });
            }
          }}
          messages={{ showMore: () => "View More" }}
        />
      )}
    </div>
  );
};

export default MyCalendar;

/*axios
.get("sampleData.json")
.then((res) => {
  const persons = res.data;
  setEventData(persons);
  setLoading(false);
})
.catch((err) => {
  setErr(true);
  setLoading(false);
});
}, [date]);*/