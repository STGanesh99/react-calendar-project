import React, { useState, useRef } from "react";
import { Popover, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { isSameDay, format } from "date-fns";
import CloseIcon from "@material-ui/icons/Close";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EventIcon from "@material-ui/icons/Event";

export default function MyEvent(props) {
  const [popupState, setPopupState] = useState(false);
  const eventRef = useRef(null);

  const editHandler = () => {
    props.modalDataHandler(props.event);
    props.showUpdateModal(true);
    setPopupState(false);
  };

  const deleteEvent = () => {
    var id = props.event.id;
    var updated = props.events.filter((event) => {
      return id !== event.id;
    });
    props.setEvents(updated);
  };

  let startDate = new Date(props.event.start);
  let endDate = new Date(props.event.end);

  return (
    <div>
      <Popover
        open={popupState}
        onClose={() => setPopupState(false)}
        anchorEl={eventRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          style={{
            padding: "10px 5px 10px 20px",
            width: "350px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            {startDate > new Date() && (
              <Button onClick={editHandler} color="primary">
                <EditIcon />
              </Button>
            )}
            <Button onClick={deleteEvent} color="secondary">
              <DeleteIcon />
            </Button>
            <Button onClick={() => setPopupState(false)} color="secondary">
              <CloseIcon />
            </Button>
          </div>
          <div>
            <div>
              <p style={{ fontSize: "1.3rem" }}>{props.event.title}</p>
            </div>
            <div style={{ display: "flex" }}>
              <ScheduleIcon />
              <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
                {format(startDate, "hh:mm aaa") +
                  " - " +
                  format(endDate, "hh:mm aaa")}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <EventIcon />
              <div style={{ marginLeft: "10px" }}>
                {format(startDate, "d/MM/yy")}
                {!isSameDay(startDate, endDate) &&
                  " - " + format(endDate, "d/MM/yy")}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0px", marginRight : "15px" }}>
              <span>Organized by : {props.event.owner}</span>
              <span>Priority:  {props.event.priority[0].toUpperCase()+props.event.priority.slice(1)}</span>
            </div>
          </div>
        </div>
      </Popover>
      <div ref={eventRef} onClick={() => setPopupState(true)}>
        {props.event.title}
      </div>
    </div>
  );
}
