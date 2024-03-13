import React, { useRef, useContext, useState, useEffect } from "react";
import UserContext from "../profile/UserContext.jsx";

import { Avatar, Snackbar, Alert, Grid } from "@mui/material";

function EngiConnectAvatar({ size }) {
    const { currentUserData, updateCurrentUser } = useContext(UserContext);
    const fileInputRef = useRef(null);

   // State variable for showing or hiding the Snackbar component.
   const [showSnackbar, setShowSnackbar] = useState(false);

   // State variable for storing the message to display in the Snackbar.
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Acum utilizăm currentUserData direct de la context pentru inițializarea profileImagePath
  const [profileImagePath, setProfileImagePath] = useState(currentUserData?.profileImagePath);

  // State variable indicating whether the Snackbar should display success or error severity.
  const [isSuccessSnackbar, setIsSuccessSnackbar] = useState(false);

    useEffect(() => {
        // Această actualizare va fi declanșată ori de câte ori currentUserData se schimbă
        setProfileImagePath(currentUserData?.profileImagePath);
    }, [currentUserData]);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    /*
     * Handle the Snackbar close event.
     */
    const handleSnackbarClose = () => {
      setShowSnackbar(false);
  };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await fetch("api/users/profile-image", {
                    method: "PUT",
                    body: formData,
                });

                if (response.ok) {
                    const updatedUserData = await response.json();
                    updateCurrentUser(updatedUserData);
                    
                    setIsSuccessSnackbar(true);
                    setSnackbarMessage("Image uploaded successfully");
                    setShowSnackbar(true);
                } else {
                    const errorData = await response.json();
                    setSnackbarMessage(errorData.message || "An error occurred while uploading the image.");
                    setIsSuccessSnackbar(false);
                    setShowSnackbar(true);
                }
            } catch (error) {
                setSnackbarMessage(error.message);
                setShowSnackbar(true);
            }
        }
    };

    return (
        <>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*"
          />
          {profileImagePath ? (
            <Avatar
              onClick={handleAvatarClick}
              style={{ cursor: "pointer", width: size, height: size }}
              src={profileImagePath}
              alt="Profile image"
            />
          ) : (
            <Avatar
              onClick={handleAvatarClick}
              style={{ cursor: "pointer", width: size, height: size }}
              sx={{ width: size, height: size }}
            >
            </Avatar>
          )}
          {/* Conditionally render the Snackbar for showing success or error messages if showSnackbar is true */}
          {showSnackbar &&
                <Grid item>
                    <Snackbar
                        open={showSnackbar}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                         }}
                    >
                        <Alert
                            elevation={6}
                            variant="filled"
                            onClose={handleSnackbarClose}
                            severity={isSuccessSnackbar ? 'success' : 'error'}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Grid>}
        </>
    );
}

export default EngiConnectAvatar;
