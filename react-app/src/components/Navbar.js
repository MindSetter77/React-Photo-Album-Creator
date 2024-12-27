import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation here
import { gapi } from "gapi-script";
import theme from "../theme";

const clientID = "886640315071-6465nnkplthi38gq0ca8o6j1fgdie9d1.apps.googleusercontent.com";

const isEmptyObject = (obj) => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

function getFirstName(currentUser) {
  if (currentUser && currentUser.result && currentUser.result.length > 0) {
    return currentUser.result[0].firstName;
  }
  return "";
}

function Navbar({ currentUser, dataOnline, setDataOnline }) {
  const [visiblePage, setVisiblePage] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();  // Now inside the Navbar component

  // Check if we are on the "editor" page
  const isEditorPage = location.pathname === '/editor';

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const openMenu = (event) => {
    setVisiblePage(event.currentTarget);
  };

  const closeMenu = () => {
    setVisiblePage(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu(); // Zamknięcie menu w wersji mobilnej
  };

  return (
    <AppBar position="relative" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "20px",
            width: '220px',
            color: theme.palette.secondary.main,
            display: { xs: "none", md: "flex" },
          }}
        >
          Album generator
        </Typography>
        {isEditorPage === true ? (
          <Typography style={{width: '300px', marginRight: '5px', marginTop: '2px', color: theme.palette.secondary.main}}>
          { dataOnline ? 'Changes in album: Saved.' : 'Changes in album: Unsaved.' }
        </Typography>
        ):(
          null
        )}
        
        
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", width: '100%' }}>
  {
    isEmptyObject(currentUser) ? (<div style={{marginLeft: 'auto'}}/>) : (
      <Button
        color="inherit"
        sx={{ fontSize: "23px", color: theme.palette.secondary.main, textTransform: "none", marginLeft: 'auto' }}
        onClick={() => handleNavigation("/create-album")}
      >
        Create album!
      </Button>
            )
          }
          {["/", "/albums"].map((path, index) => (
            <Button
              key={path}
              color="inherit"
              sx={{ fontSize: "23px", color: theme.palette.secondary.main, textTransform: "none" }}
              onClick={() => handleNavigation(path)}
            >
              {["Home", "Albums"][index]}
            </Button>
          ))}
          {isEmptyObject(currentUser) ? (
            <Button
              color="inherit"
              sx={{ fontSize: "23px", color: theme.palette.secondary.main, textTransform: "none" }}
              onClick={() => handleNavigation("/login")}
            >
              Login
            </Button>
          ) : (
            <Button
              color="third"
              disableElevation
              disableRipple
              variant="contained"
              sx={{
                fontSize: "23px",
                borderRadius: "15px",
                height: "40px",
                textTransform: "none",
                color: theme.palette.primary.main,
                ":hover": {
                  backgroundColor: "#1DDDC0",
                },
              }}
              onClick={() => handleNavigation("/profile")}
            >
              {getFirstName(currentUser)}
            </Button>
          )}
        </Box>

        {/* Menu mobilne */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" edge="start" color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Menu open={Boolean(visiblePage)} onClose={closeMenu} anchorEl={visiblePage}>
            <MenuList>
              {["/", "/albums", "/login"].map((path, index) => (
                <MenuItem key={path} onClick={() => handleNavigation(path)}>
                  {["Home", "Albums", "Login"][index]}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <CollectionsBookmarkIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ marginRight: "auto", display: { xs: "flex", md: "none" } }}
        >
          Album Generator
        </Typography>
      </Toolbar>

      {/* Gradient pod navbar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(to right, #00e7ad, #5f2e7d)",
          zIndex: 1,
        }}
      />
    </AppBar>
  );
}

export default Navbar;
