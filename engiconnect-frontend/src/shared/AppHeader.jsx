import * as React from 'react';
import { AppBar, Toolbar, Typography, Grid } from "@mui/material"
import { useState, useContext } from 'react';

/**
 * Header component displaying the application's logo and title.

 * @returns {JSX.Element} The JSX representation of the Header component.
 */
function AppHeader() {

    return (
        /* App Bar for Header */
        <AppBar position="static" style={{backgroundColor:'#529CFF'}}>
            <Toolbar>
                <Grid item container wrap="nowrap" style={{maxWidth: 'fit-content', alignItems: 'center'}}>
                    {/* Logo */}
                    <Grid item>
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            style={{
                                width:40,
                                height: "auto",
                                marginRight: "1rem"
                            }}
                        />
                    </Grid>

                    {/* Title */}
                    <Grid item>
                        <Typography
                            variant = "h5"
                            align = 'center'
                            style={{ color:'white' }}>
                            EngiConnect
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>

        </AppBar>
    )
}
export default AppHeader;