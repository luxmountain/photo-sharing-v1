import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");
  const [advancedFeatures, setAdvancedFeatures] = useState(() => {
    const stored = localStorage.getItem('advancedFeatures');
    return stored === 'true';
  });

useEffect(() => {
  async function fetchUser() {
    const pathParts = location.pathname.split("/");
    const userId = pathParts[pathParts.length - 1];

    if (pathParts.includes("photos")) {
      const user = await models.userModel(userId);
      if (user) {
        setContextText(`Photos of ${user.first_name} ${user.last_name}`);
      } else {
        setContextText("");
      }
    } else if (pathParts.includes("users")) {
      const user = await models.userModel(userId);
      if (user) {
        setContextText(`${user.first_name} ${user.last_name}`);
      } else {
        setContextText("");
      }
    } else {
      setContextText("User List");
    }
  }

  fetchUser();
}, [location]);


  const handleAdvancedFeaturesChange = (event) => {
    const newValue = event.target.checked;
    setAdvancedFeatures(newValue);
    localStorage.setItem('advancedFeatures', newValue);
    // Trigger storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h5" className="topbar-title" color="inherit">
          Tạ Cao Sơn
        </Typography>
        <Typography variant="h6" className="topbar-context" color="inherit">
          {contextText}
        </Typography>
        <div className="topbar-advanced-features">
          <FormControlLabel
            control={
              <Checkbox
                checked={advancedFeatures}
                onChange={handleAdvancedFeaturesChange}
                color="default"
              />
            }
            label="Enable Advanced Features"
            sx={{ color: 'white' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;