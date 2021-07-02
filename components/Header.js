import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function Header() {
  return (
    <div className="flex h-16 items-center color1 rounded-xl p-4 mx-8 my-4">
      <div className="flex-grow"></div>
      <NotificationsIcon fontSize="medium" className="mx-4 cursor-pointer" />
      <div>
        <h1>NAME</h1>
        <p>ROLE</p>
      </div>
      <AccountCircleIcon fontSize="large" className="ml-2 cursor-pointer" />
    </div>
  );
}
