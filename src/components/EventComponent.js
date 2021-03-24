import React, { useState, useRef } from "react";
import { Paper, Popover, Button } from "@material-ui/core";

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
        <Paper>
          <div>
            <Button onClick={editHandler}>Edit Event</Button>
            <Button onClick={deleteEvent}>Delete Event</Button>
          </div>
          <div>
            <p>{props.event.title}</p>
          </div>
        </Paper>
      </Popover>
      <div ref={eventRef} onClick={() => setPopupState(true)}>
        {props.event.title}
      </div>
    </div>
  );
}
