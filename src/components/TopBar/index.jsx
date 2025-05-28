import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox, Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PhotoUploadDialog from "../PhotoUploadDialog";
import models from "../../modelData/models";

import "./styles.css";

function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [contextText, setContextText] = useState("");
  const [advancedFeatures, setAdvancedFeatures] = useState(() => {
    const stored = localStorage.getItem('advancedFeatures');
    return stored === 'true';
  });
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

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
        setContextText(currentUser ? "User List" : "Please Login");
      }
    }

    fetchUser();
  }, [location, currentUser]);

  const handleAdvancedFeaturesChange = (event) => {
    const newValue = event.target.checked;
    setAdvancedFeatures(newValue);
    localStorage.setItem('advancedFeatures', newValue);
    window.dispatchEvent(new Event('storage'));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePhotoUploadSuccess = () => {
    // If we're on the user's photos page, refresh it
    const pathParts = location.pathname.split("/");
    if (pathParts.includes("photos")) {
      window.location.reload();
    } else {
      // Navigate to the user's photos page
      navigate(`/photos/${currentUser._id}`);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {contextText}
        </Typography>
        
        {currentUser && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">
              Hi {currentUser.first_name}
            </Typography>
            <Button 
              color="inherit" 
              onClick={() => setUploadDialogOpen(true)}
            >
              Add Photo
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={advancedFeatures}
                  onChange={handleAdvancedFeaturesChange}
                />
              }
              label="Enable Advanced Features"
            />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
      
      <PhotoUploadDialog 
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onSuccess={handlePhotoUploadSuccess}
      />
    </AppBar>
  );
}

export default TopBar;