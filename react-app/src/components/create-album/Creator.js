import './creator.css'
import { Button, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import FileDropzone from './FileDropzone';
import SettingsPanel from './SettingsPanel';
import '@fontsource/roboto'; // Importuje domyślną wersję czcionki Roboto
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useNavigate } from 'react-router-dom';

const Creator = ({user, choosenLanguage}) => {
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
          setErrorMessage( choosenLanguage === 'EN' ? ('Title cant be empty!') : ('Tytuł nie może być pusty!'))

          return
        }

        if(title.includes(' ')){
          setErrorMessage( choosenLanguage === 'EN' ? ('Space in title is forbidden!') : ('Spacja w tytule jest niedozwolona!') )
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
    <div style={{display: 'flex', justifyContent: 'center', height: 'calc(100vh - 64px)', background: `linear-gradient(to bottom, #002d5b, #000f1e)`,}}>
    <div className='main-groundd' style={{width: '500px', height: '640px', marginTop: '30px', borderRadius: '25px', border: '2px solid cyan', backgroundColor: 'rgb(209, 209, 209, 0.2)',overflow: 'hidden'  }}>
      {
        buttonClick === '2' ? (
          <div className='et1'>
            <div className='text1' style={{ marginBottom: '50px', marginTop: '50px', fontSize: "40px", color: 'white'}}>{choosenLanguage === 'EN' ? (`Upload Your photos!`) : (`Wrzuć swoje zdjęcia!`)}</div>

            <FileDropzone setImages={setImages} setUploadedFileCount={setUploadedFileCount} album_id={album_id} choosenLanguage={choosenLanguage}/>
            
            {errorMessage === '' ? (null):(
              <div style={{alignContent: 'center' , backgroundColor: 'pink', border: '1px solid red', height: '40px', marginTop: '20px'}}>
                <Typography style={{fontFamily: 'Roboto'}}>{errorMessage}</Typography>
              </div>
            )}
            
            
            <Typography style={{marginTop: '10px', fontFamily: 'Roboto', fontSize: '18px', color: 'white',}}>{choosenLanguage === 'EN' ? (`Number of photos found: ${uploadedFileCount}`) : (`Ilość znalezionych zdjęć: ${uploadedFileCount}`)}</Typography>
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
                overflowY: 'auto', 
                maxHeight: '200px'
              }}
            >
              {images.length === 0 ? (
                <Typography style={{fontFamily: 'Roboto', fontSize: '20px', color: 'white'}}>{choosenLanguage === 'EN' ? (`No photos selected`) : (`Nie wybrano zdjęć`)}</Typography>
              ) : (
                images.map((image, index) => (
                  <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={image.url} alt={image.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ marginLeft: '10px', fontSize: '20px', fontFamily: 'Roboto' }}
                      >
                        {image.name.length > 10 ? image.name.slice(0, 20) + '...' : image.name}
                      </Typography>
                    </div>
                    <CheckCircleIcon style={{ color: 'green', marginLeft: 'auto' }} />
                  </div>
                ))
                
              )}
            </Box>
          </div>
        ) : (
          <SettingsPanel albumName={albumName} setAlbumName={setAlbumName} errorMessage={errorMessage} setPrivacy={setPrivacy} privacy={privacy} choosenLanguage={choosenLanguage}/>
        )}
      <Button
        variant="contained"
        onClick={handleButtonClick}
        disableElevation
        disableRipple
        sx={{
          marginTop: '20px',
          fontSize: '16px',
          borderRadius: '20px',
          fontWeight: 'bold',
          height: '50px',
          width: '200px',
          color: 'black',
          backgroundColor: 'rgb(255, 253, 240)',
          '&:hover': {
            backgroundColor: 'rgb(255, 230, 120)', // Zmieniony kolor tła przy hover
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Cień przy hover
          },
        }}
      >
        {choosenLanguage === 'EN' ? (`Continue`) : (`Kontynuuj`)}
      </Button>
    </div>
    </div>
  );
};

export default Creator;
