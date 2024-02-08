import React, { useState } from "react";
import { Grid, Card, CardHeader, Typography, CardContent } from '@mui/material'
import RegistrationForm from "./RegistrationForm.jsx";

function AuthCard() {

    return (
        // Main container for the authentication card
        <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} md={9} lg={5} xl={5} style={{marginTop: 50 }}>
                {/* Card for containing login/registration content */}
                <Card>
                    {/* Header for displaying title and the message from subheader */}
                    <CardHeader
                        title='Create New Account'
                        subheader={
                            <Typography>
                                Start connecting with fellow engineers
                            </Typography>
                        }>
                    </CardHeader>
                    <CardContent>
                        <RegistrationForm/>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}

export default AuthCard