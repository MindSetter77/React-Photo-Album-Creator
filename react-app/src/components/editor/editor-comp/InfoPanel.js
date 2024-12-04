import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';



const InfoPanel = () => {

  return (
    <div style={{height: '300px', width: '95%', backgroundColor: 'white', border: '2px solid black',  marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', borderRadius: '12px', position: 'relative', zIndex: 3}}>
          <div style={{width: '100%', height: '30px', backgroundColor: 'black', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
            <div style={{display: 'flex', color: 'white'}}><Typography style={{marginTop: '3px', marginLeft: '5px'}}>Album information</Typography></div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', fontFamily: 'Roboto' }}>
              <TextField
                disabled
                id="outlined-disabled"
                label="Title"
                defaultValue="Album title"
                style={{ marginBottom: '20px' }}
              />
              <TextField
                id="outlined-required"
                label="Description"
                defaultValue="Album description"
                multiline
                minRows={4}
                maxRows={4}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        
        </div>
    )
};

export default InfoPanel;