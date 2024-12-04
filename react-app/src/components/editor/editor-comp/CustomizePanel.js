import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import { ChromePicker } from 'react-color';


const CustomizePanel = ({pageSize, changePageSize, allPageNumber, setAllPageNumber, changeBackground, handleChangeBackground, setChangeBackground, setBackgroundColor, colorPickerColor}) => {

  return (
    
    <div style={{
        minHeight: '300px', 
        width: '95%', 
        backgroundColor: 'white', 
        border: '2px solid black',  
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: '10px', 
        borderRadius: '12px', 
        zIndex: 3, // Zapewnia, że ten kontener będzie nad innymi elementami
        position: 'relative', // Umożliwia działanie z-index
        display: 'flex', 
        flexDirection: 'column', // Układ kolumnowy dla elastyczności
        justifyContent: 'flex-start', // Układ elementów od góry
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Możesz dodać cień do tego kontenera, jeśli chcesz
      }}>
        <div style={{
          width: '100%', 
          height: '30px', 
          backgroundColor: 'black', 
          borderTopLeftRadius: '10px', 
          borderTopRightRadius: '10px'
        }}>
          <div style={{ display: 'flex', color: 'white' }}>
            <Typography style={{ marginTop: '3px', marginLeft: '5px' }}>Album customization</Typography>
          </div>
        </div>
      
        <div style={{
          display: 'flex', 
          flexDirection: 'column', // Układa elementy w kolumnie
          padding: '20px', 
          fontFamily: 'Roboto', 
          flexGrow: 1, // Zapewnia, że ten element rozciąga się w miarę potrzeby
          overflow: 'auto' // Pozwoli na przewijanie w razie potrzeby
        }}>
          <div>
            <Typography style={{ padding: '10px' }}>Customize</Typography>
            <FormControl fullWidth style={{ marginBottom: '10px' }}>
              <InputLabel id="photo-limit-label">Page width and height</InputLabel>
              <Select
                labelId="photo-limit-label"
                value={pageSize}
                label="Page Size"
                onChange={changePageSize}
              >
                <MenuItem value="43">4:3 - 1600px x 1200px</MenuItem>
                <MenuItem value="A4">A4 - 1754px x 1240px</MenuItem>
                <MenuItem value="A5">A5 - 1240px x 874px</MenuItem>
              </Select>
            </FormControl>
          </div>
      
          <div style={{ display: 'flex' }}>
            <Typography style={{ fontSize: '20px' }}>{`Page number: ${allPageNumber}`}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
              <Button style={{ height: '5px', width: '0px' }} onClick={() => { setAllPageNumber(allPageNumber + 1) }}>▲</Button>
              <Button style={{ height: '5px', width: '0px' }} onClick={() => { setAllPageNumber(allPageNumber - 1) }}>▼</Button>
            </div>
          </div>

          <div style={{width: '25px', height: '25px', backgroundColor: 'red'}}></div>
      
          <FormControlLabel
            control={<Checkbox checked={changeBackground} onChange={handleChangeBackground} />}
            label="Use pattern"
          />
          {changeBackground && (
            <div style={{ marginLeft: '20%' }}>
              <div style={{
                width: '70%', 
                border: '1px solid black', 
                borderTopLeftRadius: '13px', 
                borderTopRightRadius: '13px', 
                overflow: 'hidden'
              }}>
                <div onClick={() => setChangeBackground(false)} style={{ height: '100%', width: '100%', cursor: 'pointer' }}>close</div>
                <ChromePicker
                  color={colorPickerColor}
                  onChangeComplete={(color) => setBackgroundColor(color.hex)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      




                
            
    
    )
};

export default CustomizePanel;