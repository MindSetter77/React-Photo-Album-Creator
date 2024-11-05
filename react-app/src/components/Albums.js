import React, {useState, useEffect} from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Typography, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Albums = ({ currentUser, setCurrentPage }) => {
  
  const theme = useTheme()
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    

      const getAlbums = async () => {
        try {
          const response = await fetch(`http://localhost:3001/getPublicAlbums`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Something went wrong');
          }

          const result = await response.json();
          setAlbums(result);
          console.log('Fetched albums:', result);
        } catch (error) {
          console.error('Error fetching albums:', error);
        }
      };

      getAlbums();
    
  }, [currentUser]);

  
  console.log(albums)
  return (
    <div style={{backgroundColor: theme.palette.primary.lighter, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: theme.palette.secondary.main, fontSize: '25px'}}>User created albums
      <div style={{borderTop: `2px solid ${theme.palette.third.main}`, width: '100vh', padding: '20px', paddingTop: '25px'}}>
        {albums.map((album) => (
          <div
            style={{padding: '4px', background: 'linear-gradient(to right, #544483, #44648B)', marginBottom: '15px', borderRadius: '25px',}}
          >
          <div
            key={album.album_id}
            style={{
              display: 'flex',
              alignItems: 'center',
              
              
              padding: '10px',
              
              backgroundColor: '#3A7690',
              borderRadius: '20px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                backgroundColor: 'blue',
                borderRadius: '5px',
                marginRight: '15px',
                fontSize: '10px'
              }}
            ></div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '20px'}}>
              <h3 style={{ margin: '0', marginBottom: '5px', fontSize: '18px', color: '#333' }}>
                {album.title}
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: theme.palette.secondary.main }}>
                Created at: {new Date(album.created_at).toLocaleString()}
              </p>
              <p style={{ margin: '0', fontSize: '14px', color: theme.palette.secondary.main }}>
                Privacy: {album.privacy || 'N/A'}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
              <button style={{ marginBottom: '5px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}>
                Download
              </button>
              <button style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#17a2b8', color: '#fff', border: 'none' }}>
                Share
              </button>
          </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
