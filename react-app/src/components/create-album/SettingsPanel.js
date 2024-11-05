import './creator.css';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { Typography} from '@mui/material';

const SettingsPanel = ({albumName, setAlbumName, errorMessage, setPrivacy, privacy}) => {
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
    <div className="settings-panel" >
      <div style={{fontFamily: 'Roboto', fontSize: '50px', marginTop: '20px'}}>Album information</div>
      {
        errorMessage !== '' && (
          <div style={{alignContent: 'center' , backgroundColor: 'pink', border: '1px solid red', height: '40px'}}>
            <Typography style={{fontFamily: 'Roboto'}}>{errorMessage}</Typography>
          </div>
        ) 
      }

      <form onSubmit={handleSubmit} style={{marginTop: '20px'}}>
        <div className="form-group">
          <TextField
            label="Album Name"
            variant="outlined"
            fullWidth
            value={albumName}
            onChange={handleAlbumNameChange}
            required
          />
        </div>
        <div className="form-group" style={{marginTop: '20px'}}>
          <FormControl component="fieldset">
            <FormLabel component="legend" >Privacy</FormLabel>
            <RadioGroup
              aria-label="privacy"
              name="privacy"
              value={privacy}
              onChange={handlePrivacyChange}
              style={{display: 'flex', flexDirection: 'row'}}
            >
              <FormControlLabel value="public" control={<Radio />} label="Public" />
              <FormControlLabel value="private" control={<Radio />} label="Private" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="form-group" style={{marginTop: '20px'}}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Photo Limit</InputLabel>
            <Select
              value={10}
              onChange={handlePhotoLimitChange}
              label="Photo Limit"
            >
              <MenuItem value={10}>Standard under 200 (free)</MenuItem>
              <MenuItem value={20}>Under 500</MenuItem>
              <MenuItem value={30}>Under 750</MenuItem>
              <MenuItem value={50}>Under 1000</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default SettingsPanel;
