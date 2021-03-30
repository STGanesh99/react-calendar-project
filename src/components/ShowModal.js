import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  Button,
} from "@material-ui/core";
import { format } from "date-fns";
import styles from "./ShowModalStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isBefore } from "date-fns";
import SimpleAccordion from "./ShowAccordion";
import CloseIcon from "@material-ui/icons/Close";
export default function SimpleModal(props) {
  const classes = styles();

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
          <div style={{ display: "flex" }}>
            <h3>Events at {format(props.data.date, "d MMM yyyy")}</h3>
            <div
              style={{ display: "flex", flex: "1", justifyContent: "flex-end" }}
            >
              <Button onClick={() => props.handleClose()}>
                <CloseIcon />
              </Button>
            </div>
          </div>
          <h3>Active Events</h3>
          <div className={classes.container}>
            {activeEvents.length ? (
              <div style={{ display: "block" }}>
                {activeEvents.map((event) => (
                  <div
                    key={event.id}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <SimpleAccordion
                      event={event}
                      edit={() => editHandler(event)}
                      delete={() => deleteHandler(event)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Typography>No Events</Typography>
            )}
            <h3>Expired Events</h3>
            {expiredEvents.length ? (
              <div style={{ display: "block" }}>
                {expiredEvents.map((event) => (
                  <div
                    key={event.id}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <SimpleAccordion
                      title={event.title}
                      edit={() => editHandler(event)}
                      delete={() => deleteHandler(event)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Typography>No Events</Typography>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
