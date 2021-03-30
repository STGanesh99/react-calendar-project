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
  useEffect(() => {
    axios
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
  }, []);

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
  const [postUpdateState, setPostUpdateState] = useState(null);
  const [showModalData, setShowModalData] = useState({
    date: new Date(),
    events: [],
  });
  const [date, setDate] = useState(new Date());
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
