import React from 'react';
import '@fontsource/dm-sans';
import '@fontsource/roboto';
import { Button, useTheme } from '@mui/material';


function Home({ currentUser, setCurrentPage}) {

  const isEmptyObject = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  const theme = useTheme(); // Pobierz motyw za pomocą useTheme

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("/z12.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center', // Wyśrodkowanie obrazka
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{ 
        maxWidth: '800px', 
        marginTop: '100px',
        height: '100vh'
      }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '100px',
          margin: '0',
          fontWeight: '700',
          lineHeight: '0.95',
          color: theme.palette.secondary.main,
          letterSpacing: '4px'
        }}>
          Photo Album creator
        </p>
        <p style={{
          marginTop: '25px',
          marginBottom: '40px',
          fontSize: '35px',
          background: 'linear-gradient(to right, #00e7ad, #5f2e7d)',
          WebkitBackgroundClip: 'text', // Używane w Chrome, Safari
          backgroundClip: 'text',
          color: 'transparent',

          fontWeight: '500',
          
        }}>
          Create, Design and Share.
        </p>
        <div style={{ marginBottom: '30px' }}>
          {
            isEmptyObject(currentUser) ? (
              <Button
                variant="contained"
                color="third"
                onClick={() => setCurrentPage('login')}
                disableElevation
                disableRipple
                sx={{
                  fontSize: '16px',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  height: '50px',
                  width: '220px',
                  color: theme.palette.primary.main,
                  ':hover': {
                  backgroundColor: '#1DDDC0',
                  },
                }}
              >
                Login to create!
              </Button>
            ) : (
              <Button
                variant="contained"
                color="third"
                onClick={() => setCurrentPage('editor')}
                disableElevation
                disableRipple
                sx={{
                  fontSize: '16px',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  height: '50px',
                  width: '220px',
                  color: theme.palette.primary.main,
                  ':hover': {
                  backgroundColor: '#1DDDC0',
                  },
                }}
              >
                Create flipbook
              </Button>
            )
          }
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCurrentPage('profile')}
            disableElevation
            disableRipple
            sx={{
              marginLeft: '20px',
              fontSize: '16px',
              borderRadius: '30px',
              fontWeight: 'bold',
              color: theme.palette.secondary.main,
              height: '50px',
              border: '2px solid #ECDFCC',
              ':hover': {
                backgroundColor: '#ECDFCC',
                border: '2px solid #ECDFCC',
                color: theme.palette.primary.main
              },
              '@media (max-width: 424px)': {
                marginLeft: '0px'
              },
              '@media (max-width: 404px)': {
                marginTop: '20px'
              }
            }}
          >
            See examples
          </Button>
        </div>
        <ul style={{
          listStyle: 'none',
          padding: '0',
          fontFamily: 'DM Sans',
          fontSize: '18px',
          color: '#666',
          lineHeight: '1.6',
          margin: '0 auto',
          maxWidth: '600px',
          '@media (max-width: 450px)': {
                marginLeft: '0px'
          }
        }}>
          <li>• Create digital flipbooks with your own photos</li>
          <li>• Edit templates to make the perfect flipbook</li>
          <li>• Share your flipbook with the link</li>
        </ul>
      </div>
      
    </div>
  );
}

export default Home;
