import React from 'react';
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



const SignIn = ({ setCurrentPage, setUser }) => {
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful in signIn:', result);
        setUser(result); // Ustawienie imienia użytkownika
        console.log(result)
        setCurrentPage('home');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
                label="Password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
              sx={{
                '& .MuiTypography-root': {
                  color: theme.palette.secondary.main, // Kolor tekstu etykiety
                },
                '& .MuiSvgIcon-root': {
                  color: theme.palette.secondary.main, // Kolor ikonki
                },
                '&.Mui-checked': {
                  '& .MuiSvgIcon-root': {
                    color: theme.palette.secondary.main, // Kolor ikonki zaznaczonej
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Login setUser={setUser} setCurrentPage={setCurrentPage}/><br/>
            <div style={{width: '100%', display: 'flex'}}>
              <div style={{width: '50%'}}>
                <Link href="#" variant="body2" color='secondary'>
                  Forgot password?
                </Link>
              </div>
              <div style={{width: '50%'}}>
                <Link href="#" variant="body2" color='secondary' onClick={() => setCurrentPage('signup')}>
                  {"Don't have an account? Sign Up"}
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
