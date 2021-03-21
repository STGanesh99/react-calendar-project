import React, { useState } from "react";
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

function TransitionsModal(props) {
  const classes = styles();
  const [formState, formHandler] = useState(props.data);

  const submitHandler = (e) => {
    e.preventDefault();
    props.formHandler(formState);
    props.handleClose();
  };
  const handleChange = (e) => {
    let propertyName = e.target.getAttribute("name");
    let propertyValue = e.target.value;
    const newObject = { ...formState };
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
          <h2 id="transition-modal-title">New Event</h2>
          <h4>Details</h4>
          <form onSubmit={submitHandler}>
            <TextField
              id="filled-basic"
              name="title"
              label="Title"
              value={props.data?.title}
              required
              onChange={handleChange}
              className={classes.textfield}
              style={{ marginRight: "20px" }}
            />
            <TextField
              select
              name="priority"
              label="Priority"
              defaultValue={props.data?.priority || "high"}
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
                  <span> Medium</span>
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
                  defaultValue={props.data?.start}
                  value={formState?.start}
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
                  defaultValue={props.data?.end}
                  value={formState?.end}
                  onChange={(date) => formHandler({ ...formState, end: date })}
                  style={{
                    marginRight: "20px",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <h4 style={{ margin: "20px 0" }}>More information</h4>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              name="description"
              style={{ width: "400px" }}
            />
            <br />
            <TextField
              id="outlined-email-input"
              label="Members"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />
            <div style={{ marginTop: "15px" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={props.handleClose}
                style={{ marginRight: "20px" }}
              >
                Close
              </Button>
              <Button variant="outlined" color="primary" type="submit">
                Add event
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export default withStyles(styles)(TransitionsModal);
