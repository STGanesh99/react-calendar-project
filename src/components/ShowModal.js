import React, { useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@material-ui/core";
import { format } from "date-fns";
import styles from "./ShowModalStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isBefore } from "date-fns";

export default function SimpleModal(props) {
  const classes = styles();
  useEffect(() => {}, [props.data.events]);
  const expiredEvents = props.data.events.filter((event) =>
    isBefore(new Date(event.end), new Date())
  );
  const activeEvents = props.data.events.filter(
    (event) => !expiredEvents.includes(event)
  );
  const editHandler = (event) => {
    props.modalDataHandler(event);
    props.showUpdateModal(true);
    props.handleClose();
  };
  const deleteHandler = (id) => {
    let updated = props.events.filter((event) => {
      return id !== event.id;
    });
    props.setEvents(updated);
  };

  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <h3>Events at {format(props.data.date, "d/MM/yy")}</h3>
          <div className={classes.container}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Active Events
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {activeEvents.length ? (
                  <div style={{ display: "block" }}>
                    {activeEvents.map((event) => (
                      <div key={event.id}>
                        <Typography variant="subtitle1">
                          {event.title}
                        </Typography>
                        <Button onClick={() => editHandler(event)}>Edit</Button>
                        <Button onClick={() => deleteHandler(event.id)}>
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography>No Events</Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Expired Events
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {expiredEvents.length ? (
                  <div style={{ display: "block" }}>
                    {expiredEvents.map((event) => (
                      <div key={event.id}>
                        <Typography variant="subtitle1">
                          {event.title}
                        </Typography>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography>No Events</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
          <Button onClick={() => props.handleClose()}>Close</Button>
        </div>
      </Fade>
    </Modal>
  );
}
