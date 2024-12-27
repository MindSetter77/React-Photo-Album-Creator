import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Albums = ({ currentUser, setCurrentPage }) => {
  const theme = useTheme();
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const response = await fetch('http://localhost:3001/getPublicAlbums', {
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
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    getAlbums();
  }, [currentUser]);

  const viewClick = (album_id) => {
    let url = `/viewer/${album_id}`; 
    navigate(url); 
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #002d5b, #000f1e)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 10px',
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          marginBottom: '20px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '2rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Shadow for better contrast on dark background
        }}
      >
        Public Albums
      </Typography>

      {/* Albums container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white for a subtle effect
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {albums.map((album) => (
          <Box
            key={album.album_id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              background: 'linear-gradient(120deg, #8e44ad, #2c3e50)', // Darker gradient for album card
              borderRadius: '20px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              marginBottom: '15px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)', // Shadow effect on hover
              },
            }}
          >
            {/* Album thumbnail */}
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: 2,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `linear-gradient(to right, #ff7e5f, #feb47b)`,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <span>{album.title.slice(0, 2)}</span>
            </Box>

            {/* Album information */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 0.5 }}>
                {album.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0C4DE' }}>
                Created at: {new Date(album.created_at).toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0C4DE' }}>
                Privacy: {album.privacy || 'N/A'}
              </Typography>
            </Box>

            {/* Action buttons */}
            <Box>
              <Button
                size="small"
                sx={{
                  color: 'white',
                  backgroundColor: '#1abc9c',
                  mb: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#16a085',
                  },
                }}
              >
                Download
              </Button>
              <Button
                onClick={() => viewClick(album.album_id)}
                size="small"
                sx={{
                  color: 'white',
                  backgroundColor: '#3498db',
                  mb: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#2980b9',
                  },
                }}
              >
                View
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Albums;
