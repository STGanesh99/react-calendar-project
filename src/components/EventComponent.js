import React, { useState, useRef } from "react";
import { Paper, Popover, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
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
        <Paper  style={{width:"200px",margin:"10px",padding:"10px"}}>
          <div style={{display:"flex"}}>
            <Button onClick={editHandler} color="primary">Edit Event</Button>
            <Button onClick={deleteEvent} color="secondary" style={{marginLeft:"30px"}}><DeleteIcon/></Button>
          </div>
          <div>
            {props.event.title.length>23?<p>{props.event.title.substring(0,24)}...</p>:<p>{props.event.title}</p>}
          </div>
        </Paper>
      </Popover>
      <div ref={eventRef} onClick={() => setPopupState(true)}>
        {props.event.title}
      </div>
    </div>
  );
}
