import React, { useState, useRef } from "react";
import { Popover, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
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
        <div style={{ padding: "10px", minWidth: "200px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={editHandler} color="primary">
              <EditIcon />
            </Button>
            <Button onClick={deleteEvent} color="secondary">
              <DeleteIcon />
            </Button>
          </div>
          <div>
            {props.event.title}
          </div>
        </div>
      </Popover>
      <div ref={eventRef} onClick={() => setPopupState(true)}>
        {props.event.title}
      </div>
    </div>
  );
}
