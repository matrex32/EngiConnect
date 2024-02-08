import React from "react"

import "../css/GlobalStyle.css"
import AppHeader from "../shared/AppHeader.jsx"
import { Grid } from "@mui/material"
import AuthCard from "./AuthCard.jsx"

/**
 * Component responsible for user authentication and rendering of both login and registration forms.
 * @returns {JSX.Element} The JSX representation of the Authentication component.
 */
export default function AuthContainer() {
    
    return (
        /* Main Container */
        <Grid container direction="column">
            {/* Header Section */}
            <Grid item container>
                <AppHeader/>
            </Grid>

              {/* Authentication Forms Section */}
            <Grid item container>
                <AuthCard/>
            </Grid>
        </Grid>
    )
}