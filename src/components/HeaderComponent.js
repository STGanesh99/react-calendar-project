import React from "react";
import { Button } from "@material-ui/core";
import { isAfter } from "date-fns";
import { KeyboardDatePicker,DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EventIcon from '@material-ui/icons/Event';
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
   
  const getm = (num)=>{
    var b;
    switch(num+1){
      case 1: b = "January";
          break;
      case 2: b = "February";
          break;
      case 3: b = "March";
          break;
      case 4: b = "April";
          break;
      case 5: b = "May";
          break;
      case 6: b = "June"; 
          break;
      case 7: b = "July";
          break;
      case 8: b = "August";
          break;
      case 9: b = "September";
          break;
      case 10: b = "October";
          break;
      case 11: b = "November";
          break;
      case 12: b = "December";
          break;
      }
      return b;
  }
  
  return (
    <div className="toolbar-container" style={{display:"flex",marginBottom:"10px"}}>
      <div className="navigation-buttons" style= {{display:"flex",marginLeft:"70px"}}>
       <div style={{margin:"11px"}}>
        {isAfter(props.date, new Date()) && (
          <Button onClick={goToBack}> <ChevronLeftIcon style={{fontSize:"40px",color:"#0099FF"}}/></Button>
        )}
        </div>
        <div style={{margin:"10px"}}>
        <Button onClick={goToNext}>
        <ChevronRightIcon style={{fontSize:"40px",color:"#0099FF"}}/>
        </Button>
        </div>
        </div>
        <div style={{marginLeft:"44%",position:"absolute",fontSize:"30px",fontWeight:"bolder"}}>
        <p>{getm(props.date.getMonth())} {props.date.getFullYear()}</p>
        </div>
      <div style={{marginLeft:"75%",position:'absolute'}}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          value={props.date}
          views={["month", "year"]}
          onChange={props.setDate}
          minDate={new Date()}
          inputVariant="outlined"
          style={{width:"200px"}}
          label="Select"
          format="MM/yyyy"
          InputProps={{ readOnly: true }}
          />
      </MuiPickersUtilsProvider>
      </div>
    </div>
  );
};

export default Toolbar;
