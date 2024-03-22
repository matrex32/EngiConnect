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

    const cvFileName = currentUserData.userCvPath ? currentUserData.userCvPath.split('/').pop() : '';



    return (
        <Grid item container direction='column' gap='20px' >
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
                    
                    <Grid item>
                        <TextField
                            id="about-me"
                            label="About me"
                            variant="outlined"
                            value={currentUserData.aboutMe}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            multiline
                        />
                    </Grid>

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

                    <Grid item>
                        <TextField
                            id="phone-number"
                            label="Phone number"
                            variant="outlined"
                            value={currentUserData.phoneNumber}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            value={currentUserData.userCity}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="university"
                            label="University"
                            variant="outlined"
                            value={currentUserData.university}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="faculty"
                            label="Faculty"
                            variant="outlined"
                            value={currentUserData.userFaculty}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="yearOfStudy"
                            label="Year of study"
                            variant="outlined"
                            value={currentUserData.yearOfStudy}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </Grid>

                    {currentUserData.userCvPath && (
                    <Grid item>
                        <TextField
                            label="CV"
                            variant="outlined"
                            value={cvFileName}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                )}

                {currentUserData.userCvPath && (
                    <Grid item>
                        <Button variant="contained" onClick={() => window.open(currentUserData.userCvPath, '_blank')}>
                            View resume
                        </Button>
                    </Grid>
                )}
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