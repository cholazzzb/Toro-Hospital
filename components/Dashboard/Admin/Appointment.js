import { TextField } from "@material-ui/core";

let apppointmentData = [];

export default function Appointment() {
  return (
    <div className="flex flex-col mx-8">
      <div className="flex flex-col color1 my-2 rounded-lg">
        <div className="p-4 flex justify-between">
          <div>Show X Entries</div>
          <div className="flex items-center">
            <div className="mx-4">
              <TextField
                className="colorText"
                id="outlined-basic"
                label="Search"
                variant="outlined"
              />
            </div>
            <div className="bg-purple-700 hover:bg-purple-800 cursor-pointer font-bold py-2 px-6 rounded-lg">
              Add Appointment
            </div>
          </div>
        </div>
        <div className="flex color3 p-4 font-bold">
          <div className="w-3/4">NAME</div>
          <div className="w-1/4">TOTAL APPOINTMENTS</div>
        </div>
        <div className="p-4">TABLE OF APPOINTMENTS</div>
      </div>
    </div>
  );
}
