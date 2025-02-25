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
import { useTheme } from '@emotion/react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './login';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();



const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  const minLength = 8;

  const rules = [
    { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
    { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
    { pattern: /[0-9]/, message: 'Password must contain at least one digit' },
    { pattern: /[$@$!%*?&]/, message: 'Password must contain at least one special character ($@$!%*?&)' },
    { pattern: new RegExp(`^.{${minLength},}$`), message: `Password must be at least ${minLength} characters long` }
  ];

  for (let rule of rules) {
    if (!rule.pattern.test(password)) {
      return false; 
    }
  }

  return true;
};

const SignUp = ({choosenLanguage}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  console.log(choosenLanguage)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      nickname: data.get('Nickname'),
      email: data.get('email'),
      password: data.get('password'),
    };

    console.log(userData.nickname)

    // Walidacja formularza
    if (!userData.firstName.trim() || !userData.lastName.trim()) {
      console.log('First name or last name is empty');
      return;
    }

    const emailValidation = validateEmail(userData.email);
    const passwordValidation = validatePassword(userData.password);

    if (emailValidation && passwordValidation) {
      try {
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const result = await response.json();
          if(result.id === "ERROR"){
            console.log(`User already exists!`)
          }else{
            navigate('/login');
          }
        } else {
          console.error('Error creating user:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Email or password not valid');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: '#041620', width: '100%', height: '100vh' }}>
        <Container component="main" style={{ backgroundColor: '#041620', maxWidth: '700px' }}>
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
            {choosenLanguage === 'EN' ? (`Sign up`) : (`Zarejestruj się`)}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label={choosenLanguage === 'EN' ? (`First Name`) : (`Imię`)}
                    autoFocus
                    sx={{
                      '& .MuiInputLabel-root': { color: theme.palette.secondary.main },
                      '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.secondary.main },
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme.palette.secondary.main },
                        '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                      },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label={choosenLanguage === 'EN' ? (`Last name`) : (`Nazwisko`)}
                    name="lastName"
                    autoComplete="family-name"
                    sx={{
                      '& .MuiInputLabel-root': { color: theme.palette.secondary.main },
                      '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.secondary.main },
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme.palette.secondary.main },
                        '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                      },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Nickname"
                    label="Nickname"
                    name="Nickname"
                    autoComplete="Nickname"
                    sx={{
                      '& .MuiInputLabel-root': { color: theme.palette.secondary.main },
                      '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.secondary.main },
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme.palette.secondary.main },
                        '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                      },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label={choosenLanguage === 'EN' ? (`Email Address`) : (`Adres email`)}
                    name="email"
                    autoComplete="email"
                    sx={{
                      '& .MuiInputLabel-root': { color: theme.palette.secondary.main },
                      '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.secondary.main },
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme.palette.secondary.main },
                        '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                      },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label={choosenLanguage === 'EN' ? (`Password`) : (`Hasło`)}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    sx={{
                      '& .MuiInputLabel-root': { color: theme.palette.secondary.main },
                      '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.secondary.main },
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme.palette.secondary.main },
                        '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                      },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                {choosenLanguage === 'EN' ? (`Sign up`) : (`Zarejestruj się`)}
              </Button>
            </Box>
          </Box>
          <Box mt={5}>
            <Typography variant="body2" color="secondary" align="center">
            {choosenLanguage === 'EN' ? (`Already have an account?`) : (`Masz już konto?`)}{' '}
              <Link href="#" variant="body2" color="secondary" onClick={() => navigate('/login')}>
              {choosenLanguage === 'EN' ? (`Sign in`) : (`Zaloguj się`)}
              </Link>
            </Typography>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};


export default SignUp;
