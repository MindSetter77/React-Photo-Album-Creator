import './creator.css'
import { Button, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import FileDropzone from './FileDropzone';
import SettingsPanel from './SettingsPanel';
import '@fontsource/roboto'; // Importuje domyślną wersję czcionki Roboto
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useNavigate } from 'react-router-dom';

const Creator = ({user}) => {
  const navigate = useNavigate()

  const [images, setImages] = useState([]);
  const [buttonClick, setButtonClick] = useState('1');
  const [uploadedFileCount, setUploadedFileCount] = useState(0);
  const [albumName, setAlbumName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [album_id, setAlbumId] = useState('');
  const [privacy, setPrivacy] = useState('public')
  
  const title = albumName
  const user_id = user.result[0].id

  function getFirstName(currentUser) {
    if (currentUser && currentUser.result && currentUser.result.length > 0) {
      return currentUser.result[0].firstName;
    }
    return ''; // Lub możesz zwrócić null lub undefined, jeśli chcesz obsługiwać te przypadki w inny sposób
  }

  const handleButtonClick = async () => {
    if (buttonClick === '1') {
      try {
        if(title === ''){
          setErrorMessage('Title cant be empty!')
          return
        }
        
        const albumAjDi = `${user_id}_${title}`
        
        setAlbumId(albumAjDi)
        
        
        const response = await fetch('http://localhost:3001/albums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, user_id, album_id: albumAjDi, privacy: privacy }),
        });
  
        if (!response.ok) {
          if (response.status === 409) {
            console.log("Album name already is use!")
            setErrorMessage("Album name already is use!")
          } else {
            console.log("An error occurred while adding the album.")
          }
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        console.log('New album added:', result);
        setErrorMessage('')
        setButtonClick(prevState => (parseInt(prevState) + 1).toString());
        
      } catch (error) {
        console.error('Error adding album:', error);
        // Nie musisz ustawiać komunikatu tutaj, ponieważ już ustawiliśmy go powyżej
      }
    } else if (buttonClick === '2') {

      if(uploadedFileCount < 8) {
        setErrorMessage("You need to choose alteast 8 photos")
        return
      }

      navigate("/profile")
      //USENAVIGATE
    }
  };
  

  return (
    <div className='main-groundd'>
      {
        buttonClick === '2' ? (
          <div className='et1'>
            <div className='text1' style={{ marginBottom: '50px', marginTop: '50px', fontSize: "40px"}}>Upload Your photos!</div>

            <FileDropzone setImages={setImages} setUploadedFileCount={setUploadedFileCount} album_id={album_id}/>
            
            {errorMessage === '' ? (null):(
              <div style={{alignContent: 'center' , backgroundColor: 'pink', border: '1px solid red', height: '40px', marginTop: '20px'}}>
                <Typography style={{fontFamily: 'Roboto'}}>{errorMessage}</Typography>
              </div>
            )}
            
            
            <Typography style={{marginTop: '10px', fontFamily: 'Roboto', fontSize: '18px'}}>Number of photos found: {uploadedFileCount}</Typography>
            <Box 
              sx={{
                border: '2px dashed grey',
                padding: '20px',
                textAlign: 'center',
                width: '400px',
                borderRadius: '4px',
                position: 'relative',
                marginTop: '10px',
                maxHeight: '400px', // Ustawia maksymalną wysokość kontenera
                overflowY: 'auto' 
              }}
            >
              {images.length === 0 ? (
                <Typography style={{fontFamily: 'Roboto', fontSize: '20px'}}>No photos selected</Typography>
              ) : (
                images.map((image, index) => (
                  <div>
                  <Box 
                    key={index} 
                    sx={{ 
                      marginBottom: '10px', 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={image.url} alt={image.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ marginLeft: '10px', fontSize: '20px', fontFamily: 'Roboto' }}
                      >
                        {image.name.length > 10 ? image.name.slice(0, 20) + '...' : image.name}
                      </Typography>
                    </Box>
                    <CheckCircleIcon style={{ color: 'green', marginLeft: 'auto' }} />
                  </Box>
                  </div>
                ))
              )}
            </Box>
          </div>
        ) : (
          <SettingsPanel albumName={albumName} setAlbumName={setAlbumName} errorMessage={errorMessage} setPrivacy={setPrivacy} privacy={privacy}/>
        )}
      <Button
        variant="contained"
        color='primary'
        onClick={handleButtonClick}
        disableElevation
        disableRipple
        sx={{
          marginTop: '20px',
          fontSize: '16px',
          borderRadius: '20px',
          fontWeight: 'bold',
          height: '50px',
          width: '200px'
        }}
      >
        Continue
      </Button>
    </div>
  );
};

export default Creator;
