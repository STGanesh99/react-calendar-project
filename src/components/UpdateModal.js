import React, { useState, useEffect } from "react";
import styles from "./UpdateModalStyles";
import {
  Fade,
  Backdrop,
  Modal,
  Button,
  TextField,
  MenuItem,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CreatableInputOnly from "./Memberbox";
import { isAfter } from "date-fns";
import axios from "axios"
import CloseIcon from '@material-ui/icons/Close';

function TransitionsModal(props) {
  const classes = styles();
  const [timeErr, setTimeErr] = useState(false);
  const [memberErr, setMemberErr] = useState(false);
  const [formState, formHandler] = useState(props.data);

  useEffect(() => {
    formHandler(props.data);
  }, [props.data]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isAfter(formState.start, formState.end)) {
      setTimeErr(true);
      return;
    }
    if (!formState.members.length) {
      setMemberErr(true);
      return;
    }
    setTimeErr(false);
    setMemberErr(false);
    let filteredEventData = props.events.filter(
      (event) => event.id !== formState.id
    );
    props.updateHandler([...filteredEventData, formState]);
    props.setMessage("Successfully updated!")
    props.handleClose();
  };

  const handleChange = (e) => {
    let propertyName = e.target.getAttribute("name");
    let propertyValue = e.target.value;
    let newObject = { ...formState };
    newObject[propertyName] = propertyValue;
    formHandler(newObject);
  };

  return (
    <div style={{display:"flex"}}>
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
        <div style={{display:"flex"}}>
          <h3 id="transition-modal-title">
            {props.data.title ? "Edit Event" : "New Event"}
          </h3>
          <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:1}}>
          <Button
                color="secondary"
                onClick={props.handleClose}
              >
                <CloseIcon/>
              </Button>
            </div>
          </div>
          <h4>Details</h4>
          <form onSubmit={submitHandler} onKeyDown={(e) => e.key !== "Enter"}>
            <TextField
              id="filled-basic"
              name="title"
              label="Title"
              defaultValue={formState.title}
              required
              onChange={handleChange}
              className={classes.textfield}
              style={{ marginRight: "20px" }}
            />
            <TextField
              select
              name="priority"
              label="Priority"
              defaultValue={formState.priority}
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
                <KeyboardDateTimePicker
                  variant="inline"
                  label="From"
                  name="start"
                  required
                  minDate={new Date()}
                  value={formState.start}
                  onChange={(date) =>
                    formHandler({ ...formState, start: date })
                  }
                  style={{
                    marginRight: "20px",
                    width:"225px"
                  }}
                  InputProps={{ readOnly: true }}
                />
                <KeyboardDateTimePicker
                  variant="inline"
                  label="To"
                  name="end"
                  required
                  value={formState.end}
                  minDate={new Date()}
                  onChange={(date) => formHandler({ ...formState, end: date })}
                  style={{
                    marginRight: "20px",
                    width:"225px"
                  }}
                  InputProps={{ readOnly: true }}
                />
              </MuiPickersUtilsProvider>
              {timeErr && (
                <div className="alert alert-danger">
                  Please select a Valid Timeline!
                </div>
              )}
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
              style={{ width: "460px" }}
            />
            <br />
            <h4 style={{ margin: "20px 0" }}>Attendees</h4>
            <div style={{ width: "460px" }}>
              <CreatableInputOnly
                memberListHandler={(memberList) =>
                  formHandler({
                    ...formState,
                    members: memberList,
                  })
                }
                memberState={formState.members}
              />
              {memberErr && (
                <div className="alert alert-danger">
                  Add atleast one Member!
                </div>
              )}
            </div>
            <div style={{ marginTop: "15px" }}>
              <Button variant="outlined" color="primary" type="submit">
                {formState.title.length ? "Save" : "Add event"}
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
    </div>
  );
}

export default TransitionsModal;
