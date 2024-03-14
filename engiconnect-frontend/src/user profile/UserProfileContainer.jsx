import React, { useState, useEffect, useContext } from "react"

import "../css/GlobalStyle.css"
import AppHeader from "../shared/AppHeader.jsx"
import { Grid, LinearProgress } from "@mui/material"
import UserProfileCard from "./UserProfileCard.jsx"
import UserContext from "../profile/UserContext.jsx"

/**
 * Component responsible for user authentication and rendering of both login and registration forms.
 * @returns {JSX.Element} The JSX representation of the Authentication component.
 */
export default function UserProfileContainer() {

    // State variable for holding user data
    const [currentUserData, setCurrentUserData] = useState(null);

    // State variable indicating when the request is in progress.
    const [isDataLoadingActive, setIsDataLoadingActive] = useState(true);

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
      }

       /**
  * Fetch user data on component mount
  */
  useEffect(() => {
    getUserCurrentData();
  }, []);

  /**
   * Updates the current user data state with the response from server.
   */
  const updateCurrentUser = (updatedUser) => {
    setCurrentUserData({
      ...updatedUser,
    });
  }

    return (
        <UserContext.Provider value={{ currentUserData, updateCurrentUser }}>
        <Grid container direction="column">
            {/* Header Section */}
            <Grid item container>
                <AppHeader  showLogoutButton = {true}/>
            </Grid>

            {isDataLoadingActive ? (
          <Grid item xs>
            <LinearProgress />
          </Grid>
          ) : (        
          <Grid item container>
            <UserProfileCard />
          </Grid>
          )}
        </Grid>
        </UserContext.Provider>
    )
}