import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import Login from './login';

import { useNavigate } from 'react-router-dom';



const SignIn = ({ setUser, choosenLanguage }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState('beforeCode')
  const [userEmailCode, setUserEmailCode] = useState('C-')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get('username'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('http://localhost:3001/loginBeforeCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        //setUser(result.result[0]); // Ustawienie imienia użytkownika
        console.log('success!!!')
        setCurrentView('afterCode')
        
        //navigate('/');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUserEmailCodeChange = (event) => {
    const newText = event.target.value
    
    if(newText.startsWith('C-')){
      setUserEmailCode(event.target.value)
    }
    
    console.log(userEmailCode)
  }

  const verifyCode = async(code) =>{
    console.log(code)

    try {
      const response = await fetch('http://localhost:3001/loginAfterCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: code}),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setUser(result.result[0]); // Ustawienie imienia użytkownika
        console.log('CODE FITS!')
        navigate('/');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <div style={{backgroundColor: '#041620', width: '100%', height: '100vh'}}>
      <Container component="main" style={{backgroundColor: '#041620'}}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="secondary">
            {choosenLanguage === 'EN' ? (`Sign in`) : (`Zaloguj się`)}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {currentView === 'beforeCode' ? (

            
            <div style={{width: '500px'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={choosenLanguage === 'EN' ? (`username`) : (`nazwa użytkownika`)}
                name="username"
                autoComplete="username"
                autoFocus
                sx={{
                  '& .MuiInputLabel-root': { 
                    color: theme.palette.secondary.main, // Kolor etykiety w stanie normalnym
                  },
                  '& .MuiInputLabel-root.Mui-focused': { 
                    color: theme.palette.secondary.main, // Kolor etykiety w stanie fokusu
                  },
                  '& .MuiInputBase-input': { 
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-root': { 
                    '& fieldset': { 
                      borderColor: theme.palette.secondary.main,
                    },
                    '&:hover fieldset': { 
                      borderColor: theme.palette.secondary.main,
                    },
                    '&.Mui-focused fieldset': { 
                      borderColor: theme.palette.secondary.main,
                    },
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Tło pola tekstowego
                  borderRadius: '8px',
                }}
              />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={choosenLanguage === 'EN' ? (`password`) : (`hasło`)}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: theme.palette.secondary.main, // Kolor etykiety
                    },
                    '& .MuiInputLabel-root.Mui-focused': { 
                      color: theme.palette.secondary.main, // Kolor etykiety w stanie fokusu
                    },
                    '& .MuiInputBase-input': {
                      color: 'white', // Kolor tekstu
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.secondary.main, // Kolor obramowania
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.secondary.main, // Kolor obramowania podczas najechania
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.secondary.main, // Kolor obramowania podczas fokusu
                      },
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Tło pola tekstowego
                    borderRadius: '8px',
                  }}
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color='secondary'
                sx={{ mt: 3, mb: 2 }}
              >
                {choosenLanguage === 'EN' ? (`Sign in`) : (`Zaloguj się`)}
              </Button>
              <Login setUser={setUser} /><br/>
            </div>
          ) : (<div style={{width: '500px'}}>
            <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="EmailCode"
                  label={choosenLanguage === 'EN' ? (`Email Code`) : (`Kod z emaila`)}
                  type="EmailCode"
                  id="EmailCode"
                  value={userEmailCode}
                  onChange={handleUserEmailCodeChange}
                  autoComplete="current-password"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: theme.palette.secondary.main, // Kolor etykiety
                    },
                    '& .MuiInputLabel-root.Mui-focused': { 
                      color: theme.palette.secondary.main, // Kolor etykiety w stanie fokusu
                    },
                    '& .MuiInputBase-input': {
                      color: 'white', // Kolor tekstu
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.secondary.main, // Kolor obramowania
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.secondary.main, // Kolor obramowania podczas najechania
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.secondary.main, // Kolor obramowania podczas fokusu
                      },
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Tło pola tekstowego
                    borderRadius: '8px',
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color='secondary'
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => verifyCode(userEmailCode)}
                >
                  {choosenLanguage === 'EN' ? (`Sign in`) : (`Zaloguj się`)}
                </Button>

          </div>)}
          

            
            <div style={{width: '100%', display: 'flex'}}>
              <div style={{width: '100%'}}>
                <Link href="#" variant="body2" color='secondary' onClick={() => navigate('/signup')}>
                {choosenLanguage === 'EN' ? (`Don't have an account? Sign Up`) : (`Nie masz konta? Stwórz je`)}
                </Link>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
      </div>
    </ThemeProvider>
  );
};

export default SignIn;
