import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isSameDay, format } from "date-fns";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EventIcon from "@material-ui/icons/Event";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "350px",
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

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
          <Typography className={classes.heading}>
            {props.event.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "block" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex" }}>
                <ScheduleIcon />
                <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
                  {format(startDate, "hh:mm aaa") +
                    " - " +
                    format(endDate, "hh:mm aaa")}
                </div>
              </div>
              <div style={{ display: "flex" }}>
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
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button onClick={() => props.edit}>Edit</Button>
              <Button onClick={() => props.delete}>Delete</Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "5px"
            }}
          >
            <span>Organized by: {props.event.owner}</span>
            <span>
              Priority: {props.event.priority[0].toUpperCase() +
                    props.event.priority.slice(1)}
            </span>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
