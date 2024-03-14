import * as React from 'react';
import { AppBar, Typography, Toolbar, Button, Grid, Tooltip, IconButton, Menu, MenuItem, Divider } from "@mui/material";

import EngiConnectAvatar from "./EngiConnectAvatar.jsx";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import UserContext from '../profile/UserContext.jsx';

import { useState, useContext } from 'react';
/**
 * Header component displaying the application's logo and title.

 * @returns {JSX.Element} The JSX representation of the Header component.
 */
function AppHeader({ showLogoutButton }) {
    // A state variable to hold the DOM element that the user menu is anchored to.
    const [anchorElUser, setAnchorElUser] = useState(null);

    // Accesing the current value of currentUserData stored in the userContext variable.
    const userContext = useContext(UserContext);
    const currentUserData = userContext ? userContext.currentUserData : null;

    // Handle the opening of the user menu. It sets anchorElUser to the target of the triggering event, which sets the DOM element that the menu is anchored to.
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // Handle the closing of the user menu. 
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    console.log(showLogoutButton, currentUserData);


    return (
        /* App Bar for Header */
        <AppBar position="static" style={{ backgroundColor: '#529CFF' }}>
            <Toolbar>
                <Grid container justifyContent="space-between">
                    <Grid item container wrap="nowrap" style={{ maxWidth: 'fit-content', alignItems: 'center' }}>
                        {/* Logo */}
                        <Grid item>
                            <img
                                src="/img/logo.png"
                                alt="Logo"
                                style={{
                                    width: 40,
                                    height: "auto",
                                    marginRight: "1rem",
                                }}
                            />
                        </Grid>

                        {/* Title */}
                        <Grid item>
                            <Typography
                                variant="h5"
                                align='center'
                                style={{ color: 'black' }}>
                                EngiConnect
                            </Typography>
                        </Grid>
                    </Grid>

                    {showLogoutButton && currentUserData &&
                        <Grid item container style={{ maxWidth: 'fit-content' }}>
                            <Grid item>
                                {/* Helper text */}
                                <Tooltip title="Open menu">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ borderRadius: '0px' }}>
                                        <Grid container alignItems="center" style={{ borderLeft: "2px solid #A9A9A9" }}>
                                            <Grid item style={{ marginLeft: '7px' }}>
                                                {/* Current user name */}
                                                <Typography variant="body1" style={{ fontSize: '15px', color: 'black' }}>
                                                    {currentUserData.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item style={{ marginRight: '5px' }}>
                                                <ArrowDropDownIcon />
                                            </Grid>
                                            <Grid item>
                                                {/* Current user avatar */}
                                                <EngiConnectAvatar
                                                    profileImagePath={currentUserData.profileImagePath}
                                                    size={"40px"}
                                                    clickable={false}
                                                />
                                            </Grid>
                                        </Grid>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                {/* Avatar drop down menu */}
                                <Menu
                                    MenuListProps={{ sx: { padding: '0px' } }}
                                    id="menu"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted

                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu} style={{ padding: 0 }}>
                                        <Grid container direction="column">

                                            <Grid item>
                                                <form>
                                                    <Button
                                                        onClick={() => window.location.href = '/user-profile'}
                                                        style={{ color: 'black', textTransform: 'none', minWidth: '130px' }}>
                                                        Profile
                                                    </Button>
                                                </form>
                                            </Grid>
                                            <Divider />
                                            <Grid item>
                                                <form>
                                                    <Button
                                                        onClick={() => window.location.href = '/'}
                                                        style={{ color: 'black', textTransform: 'none', minWidth: '130px' }}>
                                                        Settings
                                                    </Button>
                                                </form>
                                            </Grid>
                                            <Divider />
                                            <Grid item>
                                                <form action="/logout" method="post">
                                                    {/* Log out button */}
                                                    <Button
                                                        type="submit"
                                                        style={{ color: 'black', textTransform: 'none', minWidth: '130px' }}>
                                                        Log out
                                                    </Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Toolbar>

        </AppBar>
    );
}
export default AppHeader;
