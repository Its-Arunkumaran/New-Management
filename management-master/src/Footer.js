import React from "react";
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box pl={60} mt={15}>
      <Typography display={"flex"}> Copyright <CopyrightIcon /> {year} Dexwox Innovation. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
