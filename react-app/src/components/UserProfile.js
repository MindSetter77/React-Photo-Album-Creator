import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function getFullName(currentUser) {
  if (currentUser && currentUser.result && currentUser.result.length > 0) {
    const { firstName, lastName } = currentUser.result[0]; // Destructure the object
    return `${firstName} ${lastName}`; // Concatenate first and last name
  }
  return ''; // Default value if data is missing
}

const UserProfile = ({ currentUser, setChoosenAlbum }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.result && currentUser.result.length > 0) {
      const user_id = currentUser.result[0].id;

      const getAlbums = async (user_id) => {
        try {
          const response = await fetch(`http://localhost:3001/getAlbums/${user_id}`, {
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

      getAlbums(user_id);
    }
  }, [currentUser]);

  const navigateToEditor = (album_id) => {
    setChoosenAlbum(album_id);
    navigate('/editor');
  };

  const viewClick = (album_id) => {
    setChoosenAlbum(album_id); // Set selected album
    let url = `/viewer/${album_id}`; // Create the URL
    navigate(url); // Navigate to the URL
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #2c3e50, #34495e)', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 10px' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: theme.palette.primary.main }}>
          {getFullName(currentUser).charAt(0)}
        </Avatar>
        <Typography variant="h4" style={{ color: theme.palette.secondary.main }}>
          {getFullName(currentUser)}
        </Typography>
      </Box>

      {/* Albums container */}
      <Box sx={{ width: '100%', maxWidth: '900px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px', color: 'white', fontWeight: 'bold', fontSize: '2rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Albums
        </Typography>

        <Box sx={{ height: '300px', overflowY: 'scroll', padding: '10px 0' }}>
          {albums.map((album) => (
            <Box
            key={album.album_id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              background: 'linear-gradient(120deg, #8e44ad, #2c3e50)', // Darker gradient for album card
              width: '90%',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '20px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              marginBottom: '15px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              overflow: 'visible',  // Ensure overflow is visible during hover
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
                  onClick={() => navigateToEditor(album.album_id)}
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
                  Customize
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
      </Box>
    </div>
  );
};

export default UserProfile;
