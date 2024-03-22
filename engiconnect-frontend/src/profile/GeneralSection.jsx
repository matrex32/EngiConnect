import React from "react";

import EngiConnectAvatar from "../shared/EngiConnectAvatar.jsx";

import { Grid, TextField, Button, LinearProgress, Typography, Link } from "@mui/material";

import { useState, useContext, useRef, useEffect } from "react";

import UserContext from "./UserContext.jsx";


export default function GeneralSection({ showMessage }) {
    // State variable indicating whether the edit mode is active.
    const [isEditActive, setIsEditActive] = useState(false);

    // Using the useContext hook to obtain the current context value for UserContext, and storing it in the userContext variable.
    const userContext = useContext(UserContext);

    // Accessing the currentUserData property from the userContext object to get the data of the currently logged-in user.
    const currentUserData = userContext.currentUserData;

    // Accessing the updateCurrentUser function from the userContext object to have a function that updates the current user's data.
    const updateCurrentUser = userContext.updateCurrentUser;

    // State variable for holding the edited user name.
    const [editedUserName, setEditedUserName] = useState(currentUserData.name ?? '');

    // State variable for holding the error message related to the edited name.
    const [editedNameError, setEditedNameError] = useState('');

    // State variable indicating whether the edit submission is in progress.
    const [isLoading, setIsLoading] = useState(false);

    const [editedAboutMe, setEditedAboutMe] = useState(currentUserData.aboutMe ?? '');

    const [editedPhoneNumber, setEditedPhoneNumber] = useState(currentUserData.phoneNumber ?? '');

    const [editedCity, setEditedCity] = useState(currentUserData.userCity ?? '');

    const [editedUniversity, setEditedUniversity] = useState(currentUserData.university ?? '');

    const [editedFaculty, setEditedFaculty] = useState(currentUserData.userFaculty ?? '');

    const [editedYearOfStudy, setEditedYearOfStudy] = useState(currentUserData.yearOfStudy ?? '');

    const [cvFile, setCvFile] = useState(currentUserData.userCvPath ?? '');

    const [cvFileName, setCvFileName] = useState("");

    const cvInputRef = useRef(null);

    useEffect(() => {

        const cvPath = currentUserData.userCvPath;
        if (cvPath) {
            const cvName = cvPath.split('/').pop(); 
            setCvFileName(cvName);
        }
    }, [currentUserData.userCvPath]); 

    useEffect(() => {
        const cvPath = currentUserData.userCvPath;
        if (cvPath) {
            setCvFileName(cvPath.split('/').pop());
        }
    }, [currentUserData.userCvPath]);

    /**
     * Handle input change event for text field.
     */
    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === "name-info") {
            setEditedUserName(value);

            if (editedNameError !== '') {
                setEditedNameError('');
            }
        }
    }

    /**
     *Activates the edit mode when the edit button is clicked.
     */
    const handleClickEditButton = () => {
        setIsEditActive(true);
    }

    const handleCvButtonClick = () => {
        cvInputRef.current.click();
    }


    /**
     * Cancels the edit mode and reverts any unsaved changes when the cancel edit button is clicked.
     */
    const handleClickCancelEditButton = () => {
        // Revert name if it was changed
        if (editedUserName !== currentUserData.name) {
            setEditedUserName(currentUserData.name);
            setEditedNameError('');
        }

        setIsEditActive(false);
    };

    /**
     * Validate edited inputs.
     *
     * @returns {boolean} true if the edited inputs are valid.
     */
    const validateEditedInputs = () => {
        let isEditedNameValid = editedUserName.trim() !== '';
        setEditedNameError(isEditedNameValid ? '' : 'Please provide a non-empty value.');

        return isEditedNameValid;
    }

    /**
     * Send an edit name request to the server.
     */
    const sendEditRequest = () => {
        setIsLoading(true);

        const userGeneralProfileData = {
            name: editedUserName,
            aboutMe: editedAboutMe,
            phoneNumber: editedPhoneNumber,
            userCity: editedCity,
            university: editedUniversity,
            userFaculty: editedFaculty,
            yearOfStudy: editedYearOfStudy
        }

        return fetch('api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userGeneralProfileData),
        }).then((response) => {
            if (response.ok) {
                setIsLoading(false);
                setIsEditActive(false);

                showMessage(true, 'Profile has been updated!')
            }
            return response.json();
        }).then((data) => {
            if (data.errors) {
                if (data.errors[0].fieldName === 'name') {
                    setEditedNameError(data.errors[0].errorMessage);
                }
            } else if (data.errorMessage) {
                throw new Error(data.errorMessage);
            } else {
                updateCurrentUser(data);
            }
        }).catch(error => {
            setIsLoading(false);

            showMessage(false, error.name == "TypeError" ? "The connection could not be established." : error.message);
        });
    };

    const uploadCv = (file) => {

        const formData = new FormData();
        formData.append('cv', file);

        setIsLoading(true);

        fetch('api/users/cv', {
            method: 'PUT',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('An error occurred, please try again later');
                }
                return response.json();
            })
            .then(data => {
                showMessage(true, 'Your resume has been successfully uploaded!');
                updateCurrentUser(data);
            })
            .catch(error => {
                showMessage(false, error.toString());
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    /**
     * Initiates the save process if changes are valid when the save button is clicked.
     */
    const handleClickSaveButton = () => {
        const isNameChanged = editedUserName !== currentUserData.name;
        const isAboutMeChanged = editedAboutMe !== (currentUserData.aboutMe ?? '');
        const isPhoneNumberChanged = editedPhoneNumber !== (currentUserData.phoneNumber ?? '');
        const isCity = editedCity !== (currentUserData.usercity ?? '');
        const isUniversity = editedUniversity !== (currentUserData.university ?? '');
        const isFaculty = editedFaculty !== (currentUserData.userFaculty ?? '');
        const isYearOfStudy = editedFaculty !== (currentUserData.yearOfStudy ?? '');

        if (isNameChanged || isAboutMeChanged || isPhoneNumberChanged || isCity || isUniversity || isFaculty || isYearOfStudy && validateEditedInputs()) {
            sendEditRequest();
        }
        setIsEditActive(false);
    }

    const handleAboutMeChange = (event) => {
        setEditedAboutMe(event.target.value);
    };

    const handlePhoneNumber = (event) => {
        setEditedPhoneNumber(event.target.value);
    };

    const handleCity = (event) => {
        setEditedCity(event.target.value);
    };

    const handleUniversity = (event) => {
        setEditedUniversity(event.target.value);
    };

    const handleFaculty = (event) => {
        setEditedFaculty(event.target.value);
    };

    const handleYearOfStudy = (event) => {
        setEditedYearOfStudy(event.target.value);
    };

    const handleUserCv = (event) => {
        const file = event.target.files[0]
        if (file) {
            setCvFile(file);
            setCvFileName(file.name);
            uploadCv(file)
        }
    };

    const handleDeleteCv = async () => {
        const response = await fetch('api/users/delete-cv', {
            method: 'DELETE',
        });
        if (response.ok) {
            showMessage(true, 'Your resume has been successfully deleted!');
            updateCurrentUser({ ...currentUserData, userCvPath: null });
            setCvFileName("");
            setCvFile(null);
        } else {
            showMessage(false, 'An error occurred, please try again later');
        }
    };





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
                        size={"100px"}
                        profileImagePath={currentUserData.profileImagePath}

                    />
                </Grid>

                {/* Display user info */}
                <Grid item container style={{ flexGrow: 1, flexBasis: 0 }} direction='column' gap='15px'>

                    <Grid item>
                        <TextField
                            id="about-me"
                            label="About me"
                            variant="outlined"
                            value={editedAboutMe}
                            onChange={handleAboutMeChange}
                            InputProps={{ readOnly: !isEditActive }}
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
                            value={editedUserName}
                            InputProps={{ readOnly: !isEditActive }}
                            onChange={handleInputChange}
                            error={Boolean(editedNameError)}
                            helperText={editedNameError}
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
                            value={editedPhoneNumber}
                            onChange={handlePhoneNumber}
                            InputProps={{ readOnly: !isEditActive }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            value={editedCity}
                            onChange={handleCity}
                            InputProps={{ readOnly: !isEditActive }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="university"
                            label="University"
                            variant="outlined"
                            value={editedUniversity}
                            onChange={handleUniversity}
                            InputProps={{ readOnly: !isEditActive }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="faculty"
                            label="Faculty"
                            variant="outlined"
                            value={editedFaculty}
                            onChange={handleFaculty}
                            InputProps={{ readOnly: !isEditActive }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            id="yearOfStudy"
                            label="Year of study"
                            variant="outlined"
                            value={editedYearOfStudy}
                            onChange={handleYearOfStudy}
                            InputProps={{ readOnly: !isEditActive }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <input
                            ref={cvInputRef}
                            type="file"
                            accept="application/pdf"
                            onChange={handleUserCv}
                            style={{ display: "none" }}
                        />
                        {!currentUserData.userCvPath && (
                            <Button
                                variant="contained"
                                component="span"
                                onClick={handleCvButtonClick}
                            >
                                Upload resume
                            </Button>
                        )}

                        {cvFileName && (
                            <TextField
                                id="cvName"
                                label="Your resume"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={cvFileName}
                                margin="normal"
                            />
                        )}

                        {currentUserData.userCvPath && (
                            <Grid container spacing={2} alignItems="center" justify="center">
                                <Grid item>
                                    <a href={currentUserData.userCvPath} target="_blank" rel="noopener noreferrer">
                                        <Button variant="contained">View resume</Button>
                                    </a>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleDeleteCv}
                                        style={{ backgroundColor: 'red', color: 'white' }} 
                                    >
                                        Delete resume
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>

                </Grid>
            </Grid>

            {/* Conditionally render buttons based on Edit Mode */}
            <Grid item container justifyContent="flex-end">
                {isEditActive ? (
                    <Grid item container style={{ maxWidth: 'fit-content' }} gap='10px'>
                        {/* Cancel button */}
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleClickCancelEditButton}
                                disabled={isLoading}
                                style={{ background: 'lightgray', color: 'black' }}>
                                Cancel
                            </Button>
                        </Grid>

                        {/* Save button */}
                        <Grid item>
                            <Button id="save-button"
                                variant="contained"
                                disabled={isLoading}
                                onClick={handleClickSaveButton}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>

                ) : (
                    // Edit button
                    <Grid item>
                        <Button
                            id="edit-button"
                            variant="contained"
                            onClick={handleClickEditButton}
                            disabled={currentUserData.status === 'deleted'}>
                            Edit
                        </Button>
                    </Grid>
                )}
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
};