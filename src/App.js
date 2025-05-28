import './App.css';
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import SinglePhotoViewer from "./components/UserPhotos/SinglePhotoViewer";
import LoginRegister from "./components/LoginRegister";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [advancedFeatures, setAdvancedFeatures] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem('advancedFeatures');
      setAdvancedFeatures(storedValue === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '64px' }}>
              <Routes>
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/" element={<Navigate to="/users" replace />} />
                
                <Route 
                  path="/users" 
                  element={
                    <ProtectedRoute>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <UserList />
                        </Grid>
                        <Grid item xs={9}>
                          <Paper style={{ padding: 16 }}>
                            Please select a user from the list
                          </Paper>
                        </Grid>
                      </Grid>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/users/:id" 
                  element={
                    <ProtectedRoute>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <UserList />
                        </Grid>
                        <Grid item xs={9}>
                          <UserDetail />
                        </Grid>
                      </Grid>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/photos/:userId" 
                  element={
                    <ProtectedRoute>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <UserList />
                        </Grid>
                        <Grid item xs={9}>
                          <UserPhotos />
                        </Grid>
                      </Grid>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/photos/:userId/:photoId" 
                  element={
                    <ProtectedRoute>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <UserList />
                        </Grid>
                        <Grid item xs={9}>
                          <SinglePhotoViewer />
                        </Grid>
                      </Grid>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Grid>
          </Grid>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
