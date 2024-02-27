import React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Snackbar, LinearProgress, Button, Alert, Grid, Card, CardHeader, CardContent, Typography } from '@mui/material';

/**
 * Component for registering accounts in a database.
 * This component returns a form for users to provide their name, email and password.
 */
function ResetPasswordForm() {

    // State variable for the user's password.
    const [password, setPassword] = useState('');

    // State variable for confirming the user's password.
    const [confirmPassword, setConfirmPassword] = useState('');

    // State variable for storing error message related to the password field.
    const [passwordError, setPasswordError] = useState('');

    // State variable for storing error message related to the confirm password field.
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // State variable indicating when the form submission is in progress.
    const [isLoadingActive, setisLoadingActive] = useState(false);

    // State variable for showing or hiding the Snackbar component.
    const [showSnackbar, setShowSnackbar] = useState(false);

    // State variable for storing the message to display in the Snackbar.
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // State variable indicating whether the Snackbar should display success or error severity.
    const [isSuccessSnackbar, setIsSuccessSnackbar] = useState(false);

    // State variable storing the token from URL
    const [token, setToken] = useState('');

    useEffect(() => {
        document.title = "EngiConnect Reset Password";
    }, []);

    useEffect(() => {
        const currentUrl = window.location.href;
        
        const url = new URL(currentUrl);
        
        const token = url.searchParams.get('token');
        
        if (token) {
            setToken(token);
        } else {
            console.log('token');
        }
    }, []);

    /**
     * Handle input change event for text fields.
     * @param {Object} event - The input change event object.
     * @property {Object} event.target - The target element that triggered the event.
     * @property {string} event.target.id - The ID of the input field that triggered the change event.
     * @property {string} event.target.value - The new value of the input field.
     */
    const handleInputChange = (event) => {
        const { id, value } = event.target;

      
         if (id === "password") {
            setPassword(value);

            if (passwordError !== '') {
                setPasswordError('');
            }
        }
        else if (id === "confirmPassword") {
            setConfirmPassword(value);

            if (confirmPasswordError !== '') {
                setConfirmPasswordError('');
            }
        }
    }

    /**
    * This function clears the input fields.
    */
    const clearInputFields = () => {
        setPassword('');
        setConfirmPassword('');
    }

    /**
     * Send a registration request to the server to create a new user account.
     * @param {Object} newUser - The user object with name, email, and password properties.
     * @returns {Promise} A promise that resolves with the response data from the server.
     * @throws {Error} If the response from the server contains an errorMessage.
     */
    const sendResetPasswordRequest = () => {

        const data = {
            token: token,
            newPassword: password,
        };

        return fetch('/api/users/reset-user-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    clearInputFields();

                    setisLoadingActive(false);

                    setIsSuccessSnackbar(true);
                    setSnackbarMessage('Your password has been reset. Please go back to the login page.');
                    setShowSnackbar(true);
                }
                return response.json();
            })
            .then((data) => {
                setisLoadingActive(false);
              
                if (data.errors){
                    displayInputErrorsFromServer(data.errors);
                } else if (data.errorMessage) {
                    throw new Error(data.errorMessage);
                }
            })
            .catch(error => {
                setisLoadingActive(false);

                setIsSuccessSnackbar(false);

                // If the error name is 'TypeError', it means there was a connection error.
                // Otherwise, display the error message from the error object.
                setSnackbarMessage(error.name == "TypeError" ? "The connection could not be established." : error.message);

                setShowSnackbar(true);
            });
    };

    
    /**
     * Validates and assigns server-side errors to their respective frontend fields.
     * 
     * @param {Array} errorsList - An array of error objects from the server 
     */
    const displayInputErrorsFromServer = (errorsList) => {
        errorsList.forEach(error => {
            switch (error.fieldName) {
                case "password":
                    setPasswordError(error.errorMessage);
                    break;
            }
        });

    }

    /**
    * Validates the input fields for user registration.
    * @returns {boolean} True if all input fields are valid, otherwise false.
    */
    const validateInputs = () => {
        let isPasswordValid = /^.{8,}$/.test(password.trim());
        let isConfirmPasswordValid = confirmPassword.trim() !== '' && password === confirmPassword;

        // Set an error message for each field if it is invalid.
        setPasswordError(isPasswordValid ? '' : 'Password must be at least 8 characters.');
        setConfirmPasswordError(isConfirmPasswordValid ? '' : 'Passwords do not match.');

        return isPasswordValid && isConfirmPasswordValid;
    }

    /*
     * Handle click event of the registration button.
     */
    const handleClickButton = () => {
        // Validate the input fields before proceeding with registration.
        if (validateInputs()) {
            setisLoadingActive(true);

            sendResetPasswordRequest()
        }

    }

    /*
     * Handle the Snackbar close event.
     */
    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    return (

    <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={9} lg={5} xl={5} style={{ marginTop: 50 }}>
            <Card>
            <CardHeader
                        title={'Reset password'}

                        subheader={
                            <Grid container alignItems="center" spacing={1}>
                                {/* Subheader text */}
                                <Grid item>
                                    <Typography>
                                        Please enter your new password.
                                    </Typography>
                                </Grid>
                               
                            </Grid>
                        }
                    />
        <CardContent>
        <form>
            {/* Grid container for layout */}
            <Grid container spacing={3} direction="column">
              
                {/* Password input field */}
                <Grid item>
                    <TextField
                        id="password"
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={handleInputChange}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        fullWidth
                    />
                </Grid>

                {/* Confirm Password input field */}
                <Grid item>
                    <TextField
                        id="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        error={Boolean(confirmPasswordError)}
                        helperText={confirmPasswordError}
                        fullWidth
                    />
                </Grid>

                {/* "Create account" button */}
                <Grid item container justifyContent="center">
                    <Button onClick={handleClickButton} variant="contained" disabled={isLoadingActive}>
                        Reset password
                    </Button>
                </Grid>

                {/* Conditionally render the loading indicator if isLoadingActive is true */}
                {isLoadingActive &&
                <Grid item>
                    <LinearProgress />
                </Grid>}
                

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
            </Grid>
        </form>
        </CardContent>
        </Card>
        </Grid>
        </Grid>

    );
};

export default ResetPasswordForm;