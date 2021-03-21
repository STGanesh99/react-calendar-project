import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 2),
  },
  textfield: {
    minWidth: "250px",
  },
  priorityfield: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default styles;
