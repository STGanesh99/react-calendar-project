import { Button, IconButton } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import { format, addMonths, subMonths, isBefore, isAfter } from "date-fns";

const Header = (props) => {
  const dateFormat = "MMMM yyyy";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 8px",
      }}
    >
      <Button onClick={() => props.monthHandler(new Date())}>Today</Button>

      <div>
        {isAfter(props.currentMonth, new Date("2010-01-01")) && (
          <IconButton
            onClick={() => props.monthHandler(subMonths(props.currentMonth, 1))}
          >
            <ChevronLeft />
          </IconButton>
        )}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            views={["year", "month"]}
            variant="inline"
            minDate={new Date("2010-01-01")}
            maxDate={new Date("2030-12-31")}
            value={format(props.currentMonth, dateFormat)}
            onChange={(dateVal) => props.monthHandler(dateVal)}
            animateYearScrolling
            inputProps={{ style: { textAlign: "center" } }}
          />
        </MuiPickersUtilsProvider>

        {isBefore(props.currentMonth, new Date("2030-11-01")) && (
          <IconButton
            onClick={() => props.monthHandler(addMonths(props.currentMonth, 1))}
          >
            <ChevronRight />
          </IconButton>
        )}
      </div>
      <Button>Add new Task</Button>
    </div>
  );
};
export default Header;
