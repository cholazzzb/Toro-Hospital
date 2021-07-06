import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { purple } from "@material-ui/core/colors";

let appointmentData = [
  {
    icon: (
      <CalendarTodayIcon
        style={{ color: purple[600] }}
        classname="cursor-pointer"
      />
    ),
    head: "Day",
    body: "Time",
  },
  {
    icon: (
      <LocationOnIcon
        style={{ color: purple[600] }}
        classname="cursor-pointer"
      />
    ),
    head: "Location",
    body: "City",
  },
];

let appointmentsList = [
  {
    name: "Spongebob Squarepants",
    action: "REGISTER",
  },
  {
    name: "Patrick Star",
    action: "FULL",
  },
];

export default function Appointment() {
  return (
    <div className="flex flex-grow justify-between mx-8">
      <div className="flex flex-col color1 p-4 rounded-xl w-1/4 h-1/2 text-center">
        <h1 className="font-bold py-4">YOUR APPOINTMENT</h1>
        <div className="">
          <AccountCircleIcon fontSize="large" />
        </div>
        <div>Name:</div>
        {appointmentData.map((data, index) => (
          <div key={index} className="flex p-2 items-center">
            <div className="color3 p-2">{data.icon}</div>
            <div className="text-left">
              <h1 className="ml-2 font-bold">{data.head}</h1>
              <p className="ml-2">{data.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="color1 p-4 rounded-xl w-full ml-8 mb-8 text-center">
        <h1 className="font-bold p-4">APPOINTMENTS LIST</h1>
        <div className="p-2 border-t-2 border-purple-700">
          SEARCH FILTER AND PAGE NAVIGATION
        </div>
        <div className="text-left flex flex-col flex-grow border-t-2 border-purple-700">
          <div className="flex font-bold p-2">
            <div className="w-3/4">DOCTER NAME</div>
            <div className="w-1/4">ACTION</div>
          </div>
          {appointmentsList.map((data, index) => (
            <div key={index} className="flex p-2">
              <div className="w-3/4 flex items-center">
                <AccountCircleIcon fontSize="large" />
                <p className="ml-2">{data.name}</p>
              </div>
              <div className="w-1/4" className="flex items-center">
                {data.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
