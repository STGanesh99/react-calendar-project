import React from "react";
import { Button } from "@material-ui/core";
import { isAfter, format } from "date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import {
  useHistory
} from "react-router-dom";

const Toolbar = (props) => {
  const history = useHistory();
  const goToBack = () => {
    let mDate = props.date;
    let newDate = new Date(
      mDate.getFullYear(),
      mDate.getMonth() - 1,
      mDate.getDate()
    );
    props.setDate(newDate);
  };

  const goToNext = () => {
    let mDate = props.date;
    let newDate = new Date(
      mDate.getFullYear(),
      mDate.getMonth() + 1,
      mDate.getDate()
    );
    props.setDate(newDate);
  };

  return (
    <>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
    <div style={{marginLeft:"60px",fontSize:"18px"}}>
    <p>Logged in as :{props.owner}</p>
    </div>
    <div    style={{
            display: "flex",
            alignItems:"center",
            fontSize: "15px",
            borderRadius: ".3rem",
            color:"white",
            justifyContent:"flex-end",
            flex:"1",
            marginRight:"50px"
          }}>
    <Button
          variant="outlined"
          onClick={() => history.replace("/")}
        >
        <span>Log out</span>
    </Button>
    </div>
    </div>
    <div className="toolbar-container">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          value={props.date}
          views={["month", "year"]}
          onChange={props.setDate}
          minDate={new Date()}
          inputVariant="outlined"
          style={{ width: "auto" }}
          format="MM/yyyy"
          InputProps={{ readOnly: true }}
        />
      </MuiPickersUtilsProvider>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "-20px",
          flexWrap: "wrap",
        }}
      >
       <Button disabled={!isAfter(props.date, new Date())} onClick={goToBack}>
          <ChevronLeftIcon style={{ fontSize: "25px" }} />
      </Button>
        <p
        style={{
          fontWeight: "bolder",
          fontSize: "2rem",
          alignItems:"center",
          display:"flex"
        }}
      >
        {format(new Date(props.date), "MMMM")} {props.date.getFullYear()}
      </p>
        <Button style={{ marginRight: "10px" }} onClick={goToNext}>
          <ChevronRightIcon style={{ fontSize: "25px" }} />
        </Button>
        </div>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "15px",
            borderRadius: ".3rem",
            marginLeft: "10px",
            color:"white"
          }}
          variant="outlined"
          onClick={() => props.showUpdateModal(true)}
        >
          <AddIcon style={{ fontSize: "25px" }} />
          <span>Create New Event</span>
        </Button>
    </div>
    </>
  );
};

export default Toolbar;
