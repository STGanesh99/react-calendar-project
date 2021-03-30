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
import { useLocation, useHistory } from "react-router-dom";

const Toolbar = (props) => {
  const location = useLocation();
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "15px",
            justifyContent: "space-between",
            width: "84%",
            margin: "10px auto"
          }}
        >
          <p style={{fontSize: "1.1rem"}}>Logged in as: {props.owner}</p>
          <Button
            variant="outlined"
            onClick={() => {
              location.state.email = "";
              history.replace("/login");
            }}
          >
            Log out
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
          }}
        >
          <Button
            disabled={!isAfter(props.date, new Date())}
            style={{ marginRight: "15px" }}
            onClick={goToBack}
          >
            <ChevronLeftIcon style={{ fontSize: "25px" }} />
          </Button>
          <p
            style={{
              fontWeight: "bolder",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            {format(new Date(props.date), "MMMM")} {props.date.getFullYear()}
          </p>
          <Button style={{ marginLeft: "15px" }} onClick={goToNext}>
            <ChevronRightIcon style={{ fontSize: "25px" }} />
          </Button>
        </div>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "15px",
            borderRadius: ".3rem",
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
