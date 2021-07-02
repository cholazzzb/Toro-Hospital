import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function Appointment() {
  return (
    <div className="flex flex-grow justify-between mx-8">
      <div className="flex flex-col color1 p-4 rounded-xl w-1/4 h-1/2 text-center">
        <h1 className="font-bold">YOUR APPOINTMENT</h1>
        <div className="text-4xl">
          <AccountCircleIcon fontSize="large" />
        </div>
        <div>Name:</div>
        <div className="bg-">
          <CalendarTodayIcon classname="bg-purple-700 cursor-pointer" />
        </div>
        <div>
          <LocationOnIcon />
        </div>
      </div>
      <div className="color1 p-4 rounded-xl w-full ml-8 mb-8 text-center">
        <h1 className="font-bold">APPOINTMENTS LIST</h1>
        <div>SEARCH FILTER</div>
        <div className="flex flex-col flex-grow border-2 border-purple-700">
          APPOINTMENT LIST FROM DB
        </div>
      </div>
    </div>
  );
}
