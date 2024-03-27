import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SearchUserAvatar from "./SearchUserAvatar.jsx";
import { Grid } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const SearchResultContainer = styled('div')(({ theme, showResults }) => ({
  display: showResults ? 'block' : 'none',
  padding: theme.spacing(1, 1, 1, 0),
  maxHeight: '300px',
  overflowY: 'auto',
  width: '40ch',
  position: 'absolute',
  top: '90%',
  zIndex: 1000,
  backgroundColor: '#D5D5D5',
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
}));

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const CustomListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5),
  minHeight: '15px',
  maxHeight: '38PX',
  marginBottom: theme.spacing(1),
  '& .MuiListItemText-primary': {
    fontSize: '1rem',
  },
  '&:last-child': {
    marginBottom: 0,
  }
}));

function SearchUser() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      fetch(`/api/users/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          setSearchResults(data)
          setShowResults(true)
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      setSearchResults([]);
      setShowResults(false)
    }
  };

  const handleUserClick = (userId) => {
    event.preventDefault()
    console.log('Aici sunt')
    fetch(`/api/users/searched-user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('searchedUserData', JSON.stringify(data));
        window.location.href = 'searched-user'
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
    setShowResults(false);
  };

  return (
    <Container>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search an engineer"
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </Search>
      <SearchResultContainer showResults={showResults}>
        <List>
          {searchResults.map((user) => (

            <CustomListItem button key={user.id} onClick={() => handleUserClick(user.id)}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <SearchUserAvatar size="35px" profileImagePath={user.profileImagePath} />
                </Grid>
                <Grid item>
                  <ListItemText primary={user.name} />
                </Grid>
              </Grid>
            </CustomListItem>
          ))}
        </List>
      </SearchResultContainer>
    </Container>
  );
}

export default SearchUser;
