import React, {useEffect, useState } from "react";
import styles from "./UpdateModalStyles";
import {
  withStyles,
  Fade,
  Backdrop,
  Modal,
  Button,
  TextField,
  MenuItem,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CreatableInputOnly from "./memberbox"
import "./warnmessages.css"

var uniqid = require('uniqid');

function TransitionsModal(props) {
  const classes = styles();
  var [timeerr,settimeerr] = useState(""); 
  const [membererr,setmembererr] = useState("");
  var t = false;
  t = (props.data
    && Object.keys(props.data).length === 0 && props.data.constructor === Object)
  const [formState, formHandler] = useState({});
  useEffect(()=>{
    if(!(props.data
      && Object.keys(props.data).length === 0 && props.data.constructor === Object)){
        formHandler(props.data)
        console.log(formState)
      }
    else{
       var enddate = new Date(props.date.valueOf())
       enddate.setMinutes(enddate.getMinutes()+30)
      formHandler({start: props.date, end:enddate ,inputValue:"",value:[]})
    } 
  },[props.data,props.date])


  const submitHandler = (e) => {
    e.preventDefault();
    var d1 = new Date(formState.start)
    var d2= new Date(formState.end)
    console.log(d1,d2)
    if(d1>d2){
      settimeerr("Please select a Valid Timeline!")
      return;
    }
    if(formState.value.length==0){
        setmembererr("Please add Member's for the Event")
        return;
    }
    if(t){
    formState.id = uniqid();
    props.formHandler(formState);
    }
    else{
      var deleteid = formState.id;
      var afterdelete = props.events.filter(function(obj){
        return obj.id!=deleteid
      })
      formHandler({start: new Date(), end: new Date(),inputValue:"",value:[]})
      props.edit([...afterdelete,formState])
    }
    props.settimeerr("")
    formHandler({})
    props.handleClose();
  };

  const handleChange = (e) => {
    let propertyName = e.target.getAttribute("name");
    let propertyValue = e.target.value;
    let newObject;
      newObject = JSON.parse(JSON.stringify(formState));
    newObject[propertyName] = propertyValue;
    formHandler(newObject);
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >   
      <Fade in={props.open}>
        <div className={classes.paper}>
           {t? 
          <h2 id="transition-modal-title">New Event</h2>:<h2 id="transition-modal-title">Edit Event</h2>
           }
          <h4>Details</h4>
          <form onSubmit={submitHandler}>
            <TextField
              id="filled-basic"
              name="title"
              label="Title"
              defaultValue={formState?.title}
              required
              onChange={handleChange}
              className={classes.textfield}
              style={{ marginRight: "20px" }}
            />
            <TextField
              select
              name="priority"
              label="Priority"
              defaultValue={formState?.priority || ""}
              required
              onChange={(e) =>
                formHandler({ ...formState, priority: e.target.value })
              }
              style={{ minWidth: "100px" }}
            >
              <MenuItem value="high">
                <div className={classes.priorityfield}>
                  <FiberManualRecordIcon
                    style={{ color: "rgba(253, 48, 48, 0.897)" }}
                  />
                  <span>High</span>
                </div>
              </MenuItem>
              <MenuItem value="medium">
                <div className={classes.priorityfield}>
                  <FiberManualRecordIcon
                    style={{ color: "rgba(253, 140, 48, 0.897)" }}
                  />
                  <span>Medium</span>
                </div>
              </MenuItem>
              <MenuItem value="low">
                <div className={classes.priorityfield}>
                  <FiberManualRecordIcon
                    style={{ color: "rgba(77, 202, 108, 0.897)" }}
                  />
                  <span>Low</span>
                </div>
              </MenuItem>
            </TextField>
            <div style={{ marginTop: "20px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  variant="inline"
                  label="From"
                  name="start"
                  required
                  minDate = {new Date()}
                  value={formState.start}
                  onChange={(date) =>
                    formHandler({ ...formState, start: date })
                  }
                  style={{
                    marginRight: "20px",
                  }}
                />
                <DateTimePicker
                  variant="inline"
                  label="To"
                  name="end"
                  required
                  value={formState.end}
                  minDate={new Date()}
                  onChange={(date) => formHandler({ ...formState, end: date })}
                  style={{
                    marginRight: "20px",
                  }}
                />
              </MuiPickersUtilsProvider>
              {timeerr!=""&&<div class="alert alert-warning" role="alert">{timeerr}</div>}
              </div>
            <h4 style={{ margin: "20px 0" }}>More information</h4>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              name="desc"
              defaultValue={formState?.desc}
              onChange={handleChange}
              style={{ width: "400px" }}
            />
            <br />
            <h4 style={{ margin: "20px 0" }}>Attendees</h4>
            <div style={{width:'400px'}}>
            <CreatableInputOnly formHandler={(obj)=>formHandler(obj)} formState = {formState} membererr={membererr}
                  setmembererr = {setmembererr}
            />
            </div>
            <div style={{ marginTop: "15px" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={props.handleClose}
                style={{ marginRight: "20px" }}
              >
                Close
              </Button>
              {t&&<Button variant="outlined" color="primary" type="submit">
                Add event
              </Button>}
              {!t&&<Button variant="outlined" color="primary" type="submit">
                Save
              </Button>}
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export default withStyles(styles)(TransitionsModal);
