import React, { useRef, useContext, useState, useEffect } from "react";
import UserContext from "../profile/UserContext.jsx";

import { Avatar, Snackbar, Alert } from "@mui/material";

function EngiConnectAvatar({ size }) {
    const { currentUserData, updateCurrentUser } = useContext(UserContext);
    const fileInputRef = useRef(null);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    // Acum utilizăm currentUserData direct de la context pentru inițializarea profileImagePath
    const [profileImagePath, setProfileImagePath] = useState(currentUserData?.profileImagePath);

    useEffect(() => {
        // Această actualizare va fi declanșată ori de câte ori currentUserData se schimbă
        setProfileImagePath(currentUserData?.profileImagePath);
    }, [currentUserData]);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
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
                    setSnackbarMessage("Image uploaded successfully");
                    setSnackbarSeverity('success');
                    setShowSnackbar(true);
                } else {
                    const errorData = await response.json();
                    setSnackbarMessage(errorData.message || "An error occurred while uploading the image.");
                    setSnackbarSeverity('error');
                    setShowSnackbar(true);
                }
            } catch (error) {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
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
          <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={() => setShowSnackbar(false)}>
            <Alert onClose={() => setShowSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
          </Snackbar>
        </>
    );
}

export default EngiConnectAvatar;
