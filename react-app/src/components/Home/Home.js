import React, {useEffect} from 'react';
import '@fontsource/dm-sans';
import '@fontsource/roboto';
import { Button, useTheme } from '@mui/material';

function Home({ currentUser, setCurrentPage, setUser }) {
  const isEmptyObject = (obj) => obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  const theme = useTheme();

  useEffect(() => {
    // Funkcja, która pobiera todos oraz wszystkich użytkowników
    const fetchData = async () => {
      try {
        // Pobranie todos
        const todosResponse = await fetch('http://localhost:3001/todos', {
          method: 'GET',
          credentials: 'include', // Ważne, aby wysłać ciasteczka
        });
        
        if (!todosResponse.ok) {
          console.log("NOT OK")
          throw new Error('Failed to fetch todos');
        }
        const todosData = await todosResponse.json();
        setUser(todosData)
        
  
      } catch (err) {
        console.log('gownatus')
        console.error(err);
      }
    };

    fetchData(); // Wywołanie funkcji fetchData
  }, []); // Pusty array zapewnia, że ten efekt wykona się tylko raz po załadowaniu komponentu


    

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #002d5b, #000f1e)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 'calc(100vh - 104px)',
        textAlign: 'center',
        overflow: 'hidden',
        width: '100%',
        height: 'calc(100vh - 64px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1150px', marginTop: '100px', height: '100vh' }}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              marginRight: 'auto',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px',
              }}
            >
              <div style={{ display: 'flex', height: '50%' }}>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '135px',
                    margin: '0',
                    fontWeight: '700',
                    lineHeight: '0.95',
                    letterSpacing: '4px',
                    background: 'linear-gradient(to right, #00e7ad, #d12473)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  PhotoCraft
                </p>
              </div>
              <div style={{ display: 'flex', height: '50px', marginLeft: '320px' }}>
                <p
                  style={{
                    fontSize: '35px',
                    background: 'linear-gradient(to right, #00e7ad, #d12473)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: '500',
                    margin: '0',
                  }}
                >
                  Create, Design and Share.
                </p>
              </div>
            </div>
            <div style={{ marginLeft: '30px' }}>
              <img src="a.png" style={{ height: '300px' }} alt="Image" />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          {isEmptyObject(currentUser) ? (
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
                ':hover': { backgroundColor: '#5d337f' },
              }}
            >
              Login to create!
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => setCurrentPage('editor')}
              disableElevation
              disableRipple
              sx={{
                backgroundColor: '#ab64e5',
                fontSize: '16px',
                borderRadius: '15px',
                fontWeight: 'bold',
                height: '50px',
                width: '220px',
                color: theme.palette.primary.main,
                ':hover': { backgroundColor: '#1DDDC0' },
              }}
            >
              Create flipbook
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => setCurrentPage('profile')}
            disableElevation
            disableRipple
            sx={{
              marginLeft: '20px',
              fontSize: '16px',
              borderRadius: '15px',
              fontWeight: 'bold',
              color: '#f02984',
              height: '50px',
              border: '2px solid #f02984',
              ':hover': {
                backgroundColor: '#ECDFCC',
                border: '2px solid #ECDFCC',
                color: theme.palette.primary.main,
              },
              '@media (max-width: 424px)': { marginLeft: '0px' },
              '@media (max-width: 404px)': { marginTop: '20px' },
            }}
          >
            See examples
          </Button>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '18px',
            color: '#B0B0B0',
            lineHeight: '1.8',
            margin: '0 auto',
            maxWidth: '700px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <li style={{ marginBottom: '15px', fontWeight: '500', color: '#ffffff' }}>
            • Create digital flipbooks with your own photos
          </li>
          <li style={{ marginBottom: '15px', fontWeight: '500', color: '#ffffff' }}>
            • Edit templates to make the perfect flipbook
          </li>
          <li style={{ marginBottom: '0', fontWeight: '500', color: '#ffffff' }}>
            • Share your flipbook with the link
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
