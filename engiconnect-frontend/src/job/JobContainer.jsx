import React, { useState, useEffect } from "react";

import "../css/GlobalStyle.css";
import AppHeader from "../shared/AppHeader.jsx";
import { Grid, LinearProgress } from "@mui/material";
import UserContext from "../profile/UserContext.jsx";
import Job from "./Job.jsx";

export default function JobContainer() {
    const [currentUserData, setCurrentUserData] = useState(null);
    const [isDataLoadingActive, setIsDataLoadingActive] = useState(true);
    const [currentPosts, setCurrentPosts] = useState([]);
 
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);

    const getUserCurrentData = () => {
        setIsDataLoadingActive(true);
    
        fetch('api/users/me', {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setIsDataLoadingActive(false);
            if (data.errorMessage) {
                throw new Error(data.errorMessage);
            }
            setCurrentUserData(data);
        }).catch(error => {
            setIsDataLoadingActive(false);
            setSnackbarMessage(error.message);
            setShowSnackbar(true);
        });
    };

    useEffect(() => {
        getUserCurrentData();
    }, []);

    useEffect(() => {
        fetch('api/posts') 
            .then((response) => response.json())
            .then((data) => {
                setCurrentPosts(data); 
                setIsDataLoadingActive(false); 
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setIsDataLoadingActive(false); 
            });
    }, []);

    const updateCurrentUser = (updatedUser) => {
        setCurrentUserData({
            ...currentUserData,
            ...updatedUser,
        });
    };

    return (
        <UserContext.Provider value={{ currentUserData, updateCurrentUser }}>
            <Grid container direction="column">
                <Grid item container>
                    <AppHeader showLogoutButton={true} />
                </Grid>

                {isDataLoadingActive ? (
                    <Grid item xs>
                        <LinearProgress />
                    </Grid>
                ) : (
                    <Grid item container>
                        <Job posts={currentPosts} />
                    </Grid>
                )}
            </Grid>
        </UserContext.Provider>
    );
}
