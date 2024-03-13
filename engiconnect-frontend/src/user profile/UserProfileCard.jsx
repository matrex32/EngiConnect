import React, { useState } from 'react';
import {
    Grid, Card, CardHeader, CardContent, Snackbar, Alert,
} from '@mui/material';
import UserProfileForm from './UserProfileForm.jsx';

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
                    <Card>
                        {/* Header for displaying title*/}
                        <CardHeader
                            title={"User profile"}
                        />
    
                        {/* Display loading process or user information */}
                        <CardContent>
                            <Grid container direction='column' gap='30px'>
                                <UserProfileForm
                                    
                                />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    )
}

export default UserProfileCard