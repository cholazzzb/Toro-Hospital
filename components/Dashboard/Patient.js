import { useState } from "react";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import Content from "./Patient/Content";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ScheduleIcon from "@material-ui/icons/Schedule";

const navbarList = [
  {
    name: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    name: "Appointments",
    icon: <ScheduleIcon fontSize="small" />,
  },
];

export default function Patient({username, role}) {
  const [contentId, setContentId] = useState(0);
  return (
    <div className="flex w-full">
      <Navbar
        content={navbarList}
        contentId={contentId}
        setContentId={setContentId}
      />
      <div className="flex flex-col w-full">
        <Header username={username} role={role}/>
        <Content contentId={contentId} />
      </div>
    </div>
  );
}
