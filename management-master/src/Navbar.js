import { AppBar, Avatar, Badge, Box, Toolbar, Typography, styled } from "@mui/material";
import React from "react";
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications';
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Navbar = () => {
  return (
    <AppBar position="sticky">
    <StyledToolbar>
      <Typography variant="h5">Dexwox innovation</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Badge color="secondary" badgeContent={2}>
          <MailIcon />
        </Badge>
        <Badge color="secondary" badgeContent={2}>
          <NotificationsIcon />
        </Badge>
        <Avatar src="/broken-image.jpg" />
      </Box>
    </StyledToolbar>
  </AppBar>
  );
};

export default Navbar;
