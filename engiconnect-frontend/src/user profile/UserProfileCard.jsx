import React, { useState } from 'react';
import {
    Grid, Card, CardHeader, CardContent} from '@mui/material';
import GeneralDetails from './GeneralDetails.jsx';
import '../css/BackgroundCard.css'

function UserProfileCard() {
    // State variable for showing or hiding the Snackbar component.
    const [showSnackbar, setShowSnackbar] = useState(false);

    // State variable for storing the message to display in the Snackbar.
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // State variable indicating whether the Snackbar should display success or error severity.
    const [isSuccessSnackbar, setIsSuccessSnackbar] = useState(false);

    return (
        // Main container for the profile user card
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={10} lg={8} xl={6} style={{ marginTop: 50 }}>
                <Card className='card-background'>
                    {/* Header for displaying title*/}
                    <CardHeader
                        title={"Profile"}
                    />

                    {/* Display user information */}
                    <CardContent>
                        <Grid container direction='column' gap='30px'>
                            <GeneralDetails />

                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserProfileCard