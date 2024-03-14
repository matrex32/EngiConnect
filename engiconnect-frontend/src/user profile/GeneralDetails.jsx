import React, { useState, useContext } from 'react';

import "../css/GlobalStyle.css";
import "../css/ProfileStyle.css";

import { Grid, TextField, Button, LinearProgress, Typography } from "@mui/material";
import EngiConnectAvatar from "../shared/EngiConnectAvatar.jsx";
import UserContext from "../profile/UserContext.jsx";

function GeneralDetails() {

    // Using the useContext hook to obtain the current context value for UserContext, and storing it in the userContext variable.
    const userContext = useContext(UserContext);

    // Accessing the currentUserData property from the userContext object to get the data of the currently logged-in user.
    const currentUserData = userContext.currentUserData;

    // State variable indicating whether the edit submission is in progress.
    const [isLoading, setIsLoading] = useState(false);



    return (
        <Grid item container direction='column' gap='20px' >
            <Grid item style={{ padding: '10px' }}>
                <Typography variant="h6">
                    General
                </Typography>
            </Grid>
            <Grid item container gap='10px'>
                {/* Display user avatar */}
                <Grid item style={{ maxWidth: 'fit-content' }}>
                    <EngiConnectAvatar
                        name={currentUserData.name}
                        size={"120px"}
                        profileImagePath={currentUserData.profileImagePath}
                        clickable = {false}

                    />
                </Grid>

                {/* Display user info */}
                <Grid item container style={{ flexGrow: 1, flexBasis: 0 }} direction='column' gap='15px'>
                    {/* Input field for showing and editing the name */}
                    <Grid item>
                        <TextField
                            id="name-info"
                            label="Name"
                            variant="outlined"
                            value={currentUserData.name}
                            InputProps={{ readOnly: true}}
                            fullWidth
                        />
                    </Grid>

                    {/* Display user's email */}
                    <Grid item>
                        <TextField
                            id="email-info"
                            label="Email"
                            variant="outlined"
                            value={currentUserData.email}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>

            {/* Display a progress bar during edit submission */}
            {
                isLoading &&
                <Grid item xs>
                    <LinearProgress />
                </Grid>
            }
        </Grid >
    );
}

export default GeneralDetails