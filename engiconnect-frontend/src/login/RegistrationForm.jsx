import React from 'react'
import { useState } from 'react'
import { TextField, Snackbar, LinearProgress, Button, Alert, Grid } from '@mui/material'

/**
 * Component for registering accounts in a database.
 * This component returns a form for users to provide their name, email and password.
 */
function RegistrationForm({ toggleForm }) {
    // State variable for the user's name.
    const [name, setName] = useState('')

    // State variable for the user's email address.
    const [email, setEmail] = useState('')
    // State variable for the user's password.
    const [password, setPassword] = useState('')

    // State variable for confirming the user's password.    
    const [confirmPassword, setConfirmPassword] = useState('')

    // State variable for storing error message related to the name field.
    const [nameError, setNameError] = useState('')

    // State variable for storing error message related to the email field.
    const [emailError, setEmailError] = useState('')

    // State variable for storing error message related to the password field.
    const [passwordError, setPasswordError] = useState('')

    // State variable for storing error message related to the confirm password field.
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    // State variable indicating when the form submission is in progress.
    const [isLoadingActive, setIsLoadingActive] = useState(false)

    // State variable for showing or hiding the Snackbar component.
    const [showSnackbar, setShowSnackbar] = useState(false)

    // State variable for storing the message to display in the Snackbar.
    const [snackbarMessage, setSnackbarMessage] = useState('')

    // State variable indicating whether the Snackbar should display success or error severity.
    const [isSuccessSnackbar, setIsSuccessSnackbar] = useState(false)

      /**
     * Handle input change event for text fields.
     * @param {Object} event - The input change event object.
     * @property {Object} event.target - The target element that triggered the event.
     * @property {string} event.target.id - The ID of the input field that triggered the change event.
     * @property {string} event.target.value - The new value of the input field.
     */
    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if(id === "name-register") {
            setName(value);

            if(emailError !== '') {
                setEmailError('')
            }

        } else if( id === "email-register") {
            setEmail(value)
            
            if(emailError !== '') {
                setEmailError('')
            }
        } else if( id === "password-register") {
            setPassword(value)

            if(passwordError !== '') {
                setPasswordError('')
            }
        } else if( id === "confirmPassword-register") {
            setConfirmPassword(value)

            if(confirmPasswordError !== '') {
                setConfirmPasswordError('')
            }
        }
    }

     /**
    * This function clears the input fields.
    */
    const clearInputFields = () => {
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    /**
    * Validates the input fields for user registration.
    * @returns {boolean} True if all input fields are valid, otherwise false.
    */
    const validateInputs = () => {
        let isNameValid = name.trim() !== ''
        let isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        let isPasswordValid = /^.{8,}$/.test(password.trim())
        let isConfirmPasswordValid = confirmPassword.trim() !== '' && password === confirmPassword

        // Set an error message for each field if it is invalid.
        setNameError(isNameValid ? '' : 'Please provide a non-empty value.')
        setEmailError(isEmailValid ? '' : 'Email should be valid.')
        setPasswordError(isPasswordValid ? '' : 'Input field is too short. Please enter a longer value.')
        setConfirmPasswordError(isConfirmPasswordValid ? '' : 'Passwords do not match.')

        return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid
    }

    /*
     * Handle click event of the registration button.
     */
    const handleClickButton = () => {

        // Validate the input fields before proceeding with registration.
        if(validateInputs()) {
            setIsLoadingActive(true);

            // Create a new user object.
            const newUser = {
                name: name.trim(),
                email: email.trim(),
                password: password.trim()
            }

            sendRegistrationRequest(newUser)
        }
    }

    /*
     * Handle the Snackbar close event.
     */
    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    }

    const sendRegistrationRequest = (newUser) => {
        return fetch('api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
            .then((response) => {
                if (response.ok) {
                    clearInputFields()

                    setIsLoadingActive(false)

                    setIsSuccessSnackbar(true)
                    setSnackbarMessage('You have been successfully registered.')
                    setShowSnackbar(true)
                }
                return response.json()
            })
            .then((data) => {
                setIsLoadingActive(false)

                if(data.errors) {
                    displayInputErrorsFromServer(data.errors)
                }else if(data.errorMessage) {
                    throw new Error(data.errorMessage)
                }
            })
            .catch(error => {
                setIsLoadingActive(false)

                setIsSuccessSnackbar(false)

                // If the error name is 'TypeError', it means there was a connection error.
                // Otherwise, display the error message from the error object.
                setSnackbarMessage(error.name == "TypeError" ? "The connection could not be established." : error.message)

                setShowSnackbar(true)
            })
    }

    /**
     * Validates and assigns server-side errors to their respective frontend fields.
     * 
     * @param {Array} errorsList - An array of error objects from the server 
     */
    const displayInputErrorsFromServer = (errorsList) => {
        errorsList.forEach(error => {
            switch (error.fieldName) {
                case "name":
                    setNameError(error.errorMessage);
                    break;
                case "email":
                    setEmailError(error.errorMessage);
                    break;
                case "password":
                    setPasswordError(error.errorMessage);
                    break;
            }
        });

    }


    return (
        <form>
            {/* Grid container for layout */}
            <Grid container spacing={3} direction='column'>
                <Grid item>
                    {/* Name input field */}
                    <TextField
                        id="name-register"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        fullWidth
                    />
                </Grid>

               {/* Email input field */}
               <Grid item>
                    <TextField
                        id="email-register"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleInputChange}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        fullWidth
                    />
                </Grid>

                {/* Password input field */}
                <Grid item>
                    <TextField
                        id="password-register"
                        label="Password"
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
                        id="confirmPassword-register"
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        error={Boolean(confirmPasswordError)}
                        helperText={confirmPasswordError}
                        fullWidth
                    />
                    </Grid>

                    {/* "Create account" button */}
                    <Grid item container justifyContent='center'>
                        <Button onClick={handleClickButton} variant='contained' disabled={isLoadingActive}>
                            Create account
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
    )
}

export default RegistrationForm