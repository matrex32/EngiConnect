import React from "react"

import "../css/GlobalStyle.css"
import AppHeader from "../shared/AppHeader.jsx"
import { Grid } from "@mui/material"

export default function AuthContainer() {
    
    return (
        <Grid container direction="column">
            <Grid item container>
                <AppHeader/>
            </Grid>
        </Grid>
    )
}