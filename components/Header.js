import { useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";

function ProfileMenu({ username }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      const res = await fetch(`/api/auth/logout?username=${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();
      if (resData.success) {
        router.push("/login");
      }
    } catch (error) {}
  };

  return (
    <div>
      <AccountCircleIcon
        fontSize="large"
        className="ml-2 cursor-pointer"
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default function Header({ username, role }) {
  return (
    <div className="flex h-16 items-center color1 rounded-xl p-4 mx-8 my-4">
      <div className="flex-grow"></div>
      <NotificationsIcon fontSize="small" className="mx-4 cursor-pointer" />
      <div>
        <h1>{username}</h1>
        <p>{role}</p>
      </div>
      <ProfileMenu username={username} />
    </div>
  );
}
