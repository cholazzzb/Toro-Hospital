import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function InlineDateTimePicker({ label, value, onChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        variant="inline"
        label={label}
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
}

export default InlineDateTimePicker;
