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
    <div style={{display:"flex"}}>
    <div style={{marginLeft:"60px",fontSize:"18px"}}>
    <p>Logged in as :{props.owner}</p>
    </div>
    <Button
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "15px",
            borderRadius: ".3rem",
            marginLeft: "10px",
            color:"white",
          }}
          variant="outlined"
          onClick={() => history.replace("/")}
        >
        <span>Log out</span>
    </Button>
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
      <p
        style={{
          fontWeight: "bolder",
          fontSize: "2rem",
        }}
      >
        {format(new Date(props.date), "MMMM")} {props.date.getFullYear()}
      </p>
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
        <Button style={{ marginRight: "10px" }} onClick={goToNext}>
          <ChevronRightIcon style={{ fontSize: "25px" }} />
        </Button>
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
    </div>
    </>
  );
};

export default Toolbar;
