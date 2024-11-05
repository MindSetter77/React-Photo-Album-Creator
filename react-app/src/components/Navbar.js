import React, { useEffect } from "react";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, MenuList, Toolbar, Typography } from '@mui/material';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import MenuIcon from '@mui/icons-material/Menu';
import { gapi } from "gapi-script";
import theme from "../theme";

const clientID = '886640315071-6465nnkplthi38gq0ca8o6j1fgdie9d1.apps.googleusercontent.com';

const isEmptyObject = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

function getFirstName(currentUser) {
  if (currentUser && currentUser.result && currentUser.result.length > 0) {
    return currentUser.result[0].firstName;
  }
  return ''; // Lub możesz zwrócić null lub undefined, jeśli chcesz obsługiwać te przypadki w inny sposób
}

function Navbar({ setCurrentPage, currentUser }) {
  const [visiblePage, setVisiblePage] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);

  console.log('Current user in render:', currentUser);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: ""
      });
      setLoaded(true);
    }
    gapi.load('client:auth2', start);
  }, []);

  const openMenu = (event) => {
    setVisiblePage(event.currentTarget);
  };

  const closeMenu = () => {
    setVisiblePage(null);
  };

  return (
    <AppBar position='relative' color="primary" >
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ display: { xs: 'none', md: 'flex' }, color: theme.palette.secondary.main }}>
          <CollectionsBookmarkIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ fontSize: '23px', color: theme.palette.secondary.main,  marginRight: 'auto', display: { xs: 'none', md: 'flex' } }}>Album generator</Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {isEmptyObject(currentUser) ? (
            <div></div>
          ) : (
            <Button
            onClick={() => setCurrentPage('creator')}
            disableElevation
            disableRipple
            sx={{
              fontSize: '23px',
              borderRadius: '20px',
              height: '40px',
              textTransform: 'none',
              color: theme.palette.secondary.main,
              
              boxShadow: 'none', // opcjonalnie, aby usunąć cień
              '&:hover': {
                background: 'linear-gradient(to right, #544483, #44648B)', // opcjonalnie, aby gradient pozostał podczas najechania myszką
              },
            }}
          >
            Go to editor
          </Button>
          )
          } 
          <Button color='inherit' sx={{fontSize: '23px', color: theme.palette.secondary.main, textTransform: 'none'}} onClick={() => setCurrentPage('home')}>Home</Button>
          <Button color='inherit' sx={{fontSize: '23px', color: theme.palette.secondary.main, textTransform: 'none'}} onClick={() => setCurrentPage('albums')}>Albums</Button>
          {
            isEmptyObject(currentUser) ? (
                <Button color='inherit' sx={{fontSize: '23px', color: theme.palette.secondary.main, textTransform: 'none'}} onClick={() => setCurrentPage('login')}>Login</Button>
            ) : (
                <Button color='third' disableElevation disableRipple variant="contained" sx={{
                  fontSize: '23px',
                  borderRadius: '20px',
                  height: '40px',
                  textTransform: 'none',
                  color: theme.palette.primary.main,
                  ':hover': {
                  backgroundColor: '#1DDDC0',
                  },
                }} onClick={() => setCurrentPage('profile')}>{getFirstName(currentUser)}</Button> // Imię użytkownika zamiast 'Login'
            )
          }
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Menu open={Boolean(visiblePage)} onClose={closeMenu} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MenuList>
              <MenuItem onClick={() => { setCurrentPage('home'); closeMenu(); }}>Home</MenuItem>
              <MenuItem onClick={() => { setCurrentPage('albums'); closeMenu(); }}>Albums</MenuItem>
              <MenuItem onClick={() => { setCurrentPage('login'); closeMenu(); }}>Login</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ display: { xs: 'flex', md: 'none' } }}>
          <CollectionsBookmarkIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ marginRight: 'auto', display: { xs: 'flex', md: 'none' } }}>Album generator!</Typography>
      </Toolbar>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(to right, #00e7ad, #5f2e7d)',
          zIndex: 1, // Ustawienie pseudoelementu pod treściami
        }}
      />
    </AppBar>
  );
}

export default Navbar;
