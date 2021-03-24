import React from "react";
import { Button } from "@material-ui/core";
import { isAfter } from "date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Toolbar = (props) => {
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
    <div className="toolbar-container">
      <div className="navigation-buttons">
        {isAfter(props.date, new Date()) && (
          <Button onClick={goToBack}>prev</Button>
        )}
        <Button onClick={goToNext}>
          next
        </Button>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant="inline"
          value={props.date}
          views={["month", "year"]}
          onChange={props.setDate}
          minDate={new Date()}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Toolbar;
