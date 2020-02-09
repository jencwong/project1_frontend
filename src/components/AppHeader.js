import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const AppHeader = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        My Restaurant Reservation
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
