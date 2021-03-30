import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isSameDay, format } from "date-fns";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EventIcon from "@material-ui/icons/Event";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "350px",
    width: "100%",
  },
  heading: {},
}));

const getColor = (priority) => {
  switch (priority) {
    case "high":
      return "rgba(253, 48, 48, 0.897)";
    case "medium":
      return "rgba(253, 140, 48, 0.897)";
    case "low":
      return "rgba(77, 202, 108, 0.897)";
    default:
      break;
  }
};

export default function SimpleAccordion(props) {
  const classes = useStyles();
  let startDate = new Date(props.event.start);
  let endDate = new Date(props.event.end);
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div
            style={{
              display: "flex",
              margin: "10",
            }}
          >
            <FiberManualRecordIcon
              style={{
                color: getColor(props.event.priority),
              }}
            ></FiberManualRecordIcon>{" "}
            <span style={{ marginLeft: "10px" }}>{props.event.title}</span>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ display: "block" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <ScheduleIcon />
                <div style={{ marginLeft: "10px" }}>
                  {format(startDate, "hh:mm aaa") +
                    " - " +
                    format(endDate, "hh:mm aaa")}
                </div>
              </div>
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <EventIcon />
                <div style={{ marginLeft: "10px" }}>
                  {format(startDate, "d/MM/yy")}
                  {!isSameDay(startDate, endDate) &&
                    " - " + format(endDate, "d/MM/yy")}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <IconButton
                onClick={() => props.edit(props.event)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => props.delete(props.event.id)}
                style={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <PersonIcon />
            <span style={{ marginLeft: "10px" }}>{props.event.owner}</span>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
