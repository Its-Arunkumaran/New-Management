import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import LogoutIcon from "@mui/icons-material/Logout";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import User from "./Path/User";
import Dashboard from "./Path/Dasboard";
import Task from "./Path/Task";
import Timesheet from "./Path/Timesheet";

const item = [
  {
    text: "User",
    icon: <PermIdentityIcon />,
  },
  {
    text: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    text: "Task",
    icon: <TaskIcon />,
  },
  {
    text: "Timesheet",
    icon: <PunchClockIcon />,
  },
];

const component = [
  {
    label: "user",
    content: <User />,
  },
  {
    label: "Dashboard",
    content: <Dashboard />,
  },
  {
    label: "Task",
    content: <Task />,
  },
  {
    label: "Timesheet",
    content: <Timesheet />,
  },
];

const Menu = () => {
  const [componentId, setComponentId] = useState(0);
  const handleChange = (value) => {
    setComponentId(value);
    // console.log(component[componentId].label);
  };

  return (
    <Box display={"flex"}>
      <Box
        // display={"flex"}
        // flexDirection={"column"}
        // justifyContent={"space-between"}
        // height={"50vh"}
      >
        <List>
          {item.map((item, index) => (
            <ListItem key={item.text} onClick={() => handleChange(index)}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" startIcon={<LogoutIcon />}>
          {" "}
          Logout
        </Button>
      </Box>
      <Box>{component[componentId].content}</Box>
    </Box>
  );
};

export default Menu;
