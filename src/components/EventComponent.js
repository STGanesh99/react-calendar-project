import React, { useState, useRef } from "react";
import { Popover, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { isSameDay, format } from "date-fns";
import CloseIcon from '@material-ui/icons/Close';
import ScheduleIcon from '@material-ui/icons/Schedule';
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
  
  var startstr = startDate+""
  var endstr = endDate+""
  var start = startstr.split(" ");
  var end = endstr.split(" ");
  var color = "";
  if(props.event.priority=="high"){
    color = "rgba(253, 48, 48, 0.897)"
  }
  else if(props.event.priority=="medium"){
    color = "rgba(253, 140, 48, 0.897)" 
  }
  else{
    color = "rgba(77, 202, 108, 0.897)"
  }
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
            {startDate>(new Date())&&<Button onClick={editHandler} color="primary">
              <EditIcon />
            </Button>}
            <Button onClick={deleteEvent} color="secondary">
              <DeleteIcon />
            </Button>
            <Button onClick={()=>setPopupState(false)} color="secondary">
              <CloseIcon/>
            </Button>
          </div>
          <div>
            <div>
            <p style={{fontSize:"25px"}}>{props.event.title}</p>
            </div>
            <p>
                {console.log(startDate)}
                {start[0]==end[0]?start[0]+" , "+start[1]+" "+start[2]+" , "+start[3]:start[1]==end[1]?start[2]+"-"+
                end[2]+" , "+start[1]+" , "+start[3]:start[1]+" "+
                start[2]+"-"+end[1]+" "+end[2]+","+end[3]
                }
            </p>
            <div style={{display:"flex"}}>
            <ScheduleIcon/>
            <div style={{marginLeft:"10px"}}>
            {
            format(startDate, "hh:mm aaa") +
                  " - " +
             format(endDate, "hh:mm aaa")}
            </div>
            </div>
            <p>Organized by : {props.event.owner}</p>
          </div>
        </div>
      </Popover>
      <div ref={eventRef} onClick={() => setPopupState(true)}>
        {props.event.title}
      </div>
    </div>
  );
}
/*isSameDay(startDate, endDate)
                ? format(startDate, "hh:mm aaa") +
                  " - " +
                  format(endDate, "hh:mm aaa")
                : format(startDate, "d/MM/yy") +
                  " - " +
                  format(endDate, "d/MM/yy")*/