import './creator.css';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { Typography} from '@mui/material';

const SettingsPanel = ({albumName, setAlbumName, errorMessage, setPrivacy, privacy, choosenLanguage}) => {
  const [photoLimit, setPhotoLimit] = useState('');

  const handleAlbumNameChange = (event) => {
    setAlbumName(event.target.value);
  };

  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value)
    console.log(event.target.value)
  };

  const handlePhotoLimitChange = (event) => {
    setPhotoLimit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    console.log('Album Name:', albumName);
    console.log('Photo Limit:', photoLimit);
  };

  return (
    <div className="settings-panel" style={{width: '500px'}} >
      <div style={{fontFamily: 'Roboto', fontSize: '50px', marginTop: '20px', color: 'rgb(240, 240, 240)'}}>{choosenLanguage === 'EN' ? (`Album information`) : (`Dane albumu`)}</div>
      {
        errorMessage !== '' && (
          <div style={{alignContent: 'center' , backgroundColor: 'pink', border: '1px solid red', height: '40px'}}>
            <Typography style={{fontFamily: 'Roboto'}}>{errorMessage}</Typography>
          </div>
        ) 
      }

      <form onSubmit={handleSubmit} style={{ marginTop: '20px', padding: '20px', borderRadius: '8px' }}>
        <div className="form-group">
        <TextField
            label={choosenLanguage === 'EN' ? ('Album title') : ('Nazwa albumu')}
            variant="outlined"
            fullWidth
            value={albumName}
            onChange={handleAlbumNameChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Biała ramka
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Biała ramka przy najechaniu
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Biała ramka, gdy pole jest w fokusu
                },
              },
              color: 'white', // Kolor tekstu
              '& .MuiInputLabel-root': {
                color: 'white', // Kolor etykiety
              },
              '& .MuiOutlinedInput-input': {
                color: 'white', // Kolor tekstu wewnątrz pola
              },
            }}
          />
        </div>
        <div className="form-group" style={{ marginTop: '20px' }}>
          <FormControl component="fieldset" style={{ color: 'white' }}>
            <FormLabel component="legend" style={{ color: 'white' }}>
              {choosenLanguage === 'EN' ? ('Privacy') : ('Stan prywatności')}
            </FormLabel>
            <RadioGroup
              aria-label="privacy"
              name="privacy"
              value={privacy}
              onChange={handlePrivacyChange}
              style={{ display: 'flex', flexDirection: 'row', color: 'white' }}
            >
              <FormControlLabel
                value="public"
                control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />}
                label={choosenLanguage === 'EN' ? ('Public') : ('Publiczny')}
                sx={{
                  color: 'white', // Kolor etykiety
                }}
              />
              <FormControlLabel
                value="private"
                control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />}
                label={choosenLanguage === 'EN' ? ('Private') : ('Prywatny')}
                sx={{
                  color: 'white', // Kolor etykiety
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="form-group" style={{ marginTop: '20px' }}>
        <FormControl fullWidth required>
            <InputLabel style={{ color: 'white' }}>{choosenLanguage === 'EN' ? ('Photo limit') : ('Limit zdjęć')}</InputLabel>
            <Select
              value={10}
              onChange={handlePhotoLimitChange}
              label="Photo Limit"
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff' // Kolor granicy
                },
                '.MuiSelect-icon': {
                  color: '#fff' // Kolor ikony
                },
                '.MuiInputLabel-root': {
                  color: '#fff' // Kolor etykiety
                },'.MuiSelect-select': {
                  color: '#fff' // Kolor tekstu w polu wyboru
                },
                '&:hover': { // Styl dla hover
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fff' // Zmiana koloru granicy przy hover
                  },
                  '.MuiSelect-icon': {
                    color: '#000' // Zmiana koloru ikony przy hover (np. na czarny)
                  }
                }
              }}
            >
              <MenuItem value={10}>{choosenLanguage === 'EN' ? ('Standard under 200 (free)') : ('Standard poniżej 200 (darmo)')}</MenuItem>
              <MenuItem value={20}>{choosenLanguage === 'EN' ? ('Under 500') : ('Poniżej 500')}</MenuItem>
              <MenuItem value={30}>{choosenLanguage === 'EN' ? ('Under 750') : ('Poniżej 750')}</MenuItem>
              <MenuItem value={50}>{choosenLanguage === 'EN' ? ('Under 1000') : ('Poniżej 1000')}</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>

    </div>
  );
};

export default SettingsPanel;
