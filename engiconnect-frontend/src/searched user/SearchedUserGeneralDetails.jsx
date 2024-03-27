import React, { useState, useEffect } from 'react';

import "../css/GlobalStyle.css";
import "../css/ProfileStyle.css";

import { Grid, TextField, Button, LinearProgress} from "@mui/material";
import SearchUserAvatar from '../shared/SearchUserAvatar.jsx';

function SearchUserGeneralDetails() {

    const [searchedUserData, setSearchedUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userDataString = localStorage.getItem('searchedUserData');
        const userData = JSON.parse(userDataString);
        if (userData) {
            setSearchedUserData(userData);

        } else {
            setIsLoading(true); 
        }
    }, []);

    if (isLoading || !searchedUserData) {
        return (
            <Grid item xs={12} style={{ padding: '20px' }}>
                <LinearProgress />
            </Grid>
        );
    }

    const {
        name, profileImagePath, aboutMe, email, phoneNumber, userCity, university, userFaculty, yearOfStudy, userCvPath
    } = searchedUserData;
    const cvFileName = userCvPath ? 'View Resume' : 'No resume uploaded';





    return (
        <Grid item container direction='column' gap='20px' >
            <Grid item container gap='10px'>
                {/* Display user avatar */}
                <Grid item style={{ maxWidth: 'fit-content' }}>
                    <SearchUserAvatar
                        name={searchedUserData.name}
                        size="140px"
                        profileImagePath={searchedUserData.profileImagePath}
                    />
                </Grid>

                {/* Display user info */}
                <Grid item container style={{ flexGrow: 1, flexBasis: 0 }} direction='column' gap='15px'>

                    <Grid item>
                        <TextField
                            id="about-me"
                            label="About me"
                            variant="outlined"
                            value={searchedUserData.aboutMe}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled={true}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-disabled': { 
                                    color: 'black', 
                                },
                            }}
                        />
                    </Grid>

                    {/* Input field for showing and editing the name */}
                    <Grid item>
                        <TextField
                            id="name-info"
                            label="Name"
                            variant="outlined"
                            value={searchedUserData.name}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled={true}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-disabled': { 
                                    color: 'black', 
                                },
                            }}
                        />
                    </Grid>

                    {/* Display user's email */}
                    <Grid item>
                        <TextField
                            id="email-info"
                            label="Email"
                            variant="outlined"
                            value={searchedUserData.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled={true}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-disabled': { 
                                    color: 'black', 
                                },
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="phone-number"
                            label="Phone number"
                            variant="outlined"
                            value={searchedUserData.phoneNumber}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled={true}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-disabled': { 
                                    color: 'black', 
                                },
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            value={searchedUserData.userCity}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled={true}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-disabled': { 
                                    color: 'black', 
                                },
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="university"
                            label="University"
                            variant="outlined"
                            value={searchedUserData.university}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled={true}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-disabled': { 
                                    color: 'black', 
                                },
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="faculty"
                            label="Faculty"
                            variant="outlined"
                            value={searchedUserData.userFaculty}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled={true}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-disabled': { 
                                    color: 'black', 
                                },
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="yearOfStudy"
                            label="Year of study"
                            variant="outlined"
                            value={searchedUserData.yearOfStudy}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled={true}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-disabled': { 
                                    color: 'black', 
                                },
                            }}
                        />
                    </Grid>

                    {userCvPath && (
                        <Grid item>
                            <TextField
                                label="Resume"
                                variant="outlined"
                                value={searchedUserData.cvFileName}
                                InputProps={{
                                    readOnly: true,
                                }}
                                disabled={true}
                                fullWidth
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: 'black',
                                        color: 'black',
                                    },
                                    '& .MuiInputLabel-root.Mui-disabled': { 
                                        color: 'black', 
                                    },
                                }}
                            />
                        </Grid>
                    )}

                    {userCvPath && (
                        <Grid item>
                            <Button variant="contained" onClick={() => window.open(searchedUserData.userCvPath, '_blank')}>
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

export default SearchUserGeneralDetails