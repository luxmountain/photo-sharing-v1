import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const params = useParams();
  
  const getContextText = () => {
    if (!params.userId) {
      if (location.pathname === "/" || location.pathname === "/users") {
        return "User List";
      }
      return "";
    }
    console.log("params.userId", params.userId);
    const user = models.userModel(params.userId);
    if (!user) return "";
    
    if (location.pathname.includes("/photos/")) {
      return `Photos of ${user.first_name} ${user.last_name}`;
    } else if (location.pathname.includes("/users/")) {
      return `${user.first_name} ${user.last_name}`;
    }
    return "";
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h5" className="topbar-title" color="inherit">
          Tạ Cao Sơn
        </Typography>
        <Typography variant="h6" className="topbar-context" color="inherit">
          {getContextText()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;