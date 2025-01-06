import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import { ChromePicker } from 'react-color';
import Layers from './Layers';

const LayersPanel = ({ setDataOnline, pageNumber, layoutOnPage, photosOfPanel, photoChooseClick, getPhotoName, typographyChooseClick, layerTable, lessMoreTable, lessMoreClick, makeLayerUP, makeLayerDown, handleWidthSliderChange, rmPhotoClick, xTable, originalPageWidth, handleXSliderChange, yTable, originalPageHeight, handleYSliderChange, alignWidth, getLayerTitle, editText, fonts, handleColorPickerVisibility, textColor, showLayerPicker, setSingleColorText, rotateTable, setRotateTable, borderTable, setBorderTable, shadowTable, setShadowTable, choosenLanguage }) => {

  const [textFieldVal, setTextFieldVal] = useState("")

  const addTextButtonHandle = (str) => {
    typographyChooseClick(str)
    setTextFieldVal("")
    setDataOnline(false)
  }

  return (
    <div>

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
        boxShadow: '0 0 6px 2px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          width: '100%', 
          height: '30px', 
          backgroundColor: 'black', 
          borderTopLeftRadius: '10px', 
          borderTopRightRadius: '10px'
        }}>
          <div style={{ display: 'flex', color: 'white' }}>
            <Typography style={{ marginTop: '3px', marginLeft: '5px' }}>{choosenLanguage === 'EN' ? (`Layer settings (Page: ${pageNumber}, Layout: ${layoutOnPage[pageNumber]})`) : (`Ustawienia warstw (Strona: ${pageNumber}, Układ: ${layoutOnPage[pageNumber]})`)}</Typography>
          </div>
        </div>
      
        <div style={{
          display: 'flex', 
          flexDirection: 'column',
          fontFamily: 'Roboto', 
          flexGrow: 1,
          overflow: 'auto'
        }}>
        <div style={{marginBottom: '10px'}}>
            
            
            
            
            <div style={{ width: '95%', borderRadius: '15px', border: '2px solid black', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginTop: '5px' }}>
              <div style={{ height: '25px', width: '100%', backgroundColor: 'black', zIndex: 10, display: 'flex' }}>
                  <div style={{marginLeft: '5px'}}>
                    <Typography style={{ width: '100%', color: 'white'}}>{choosenLanguage == 'EN' ? (`Insert photo`) : (`Dodaj zdjęcie`)}</Typography>
                  </div>
              </div>
              <div style={{ flexDirection: 'column', display: 'flex', overflowX: 'auto', overflowY: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  {photosOfPanel.length > 0 ? (
                    photosOfPanel.filter(photoUrl => !photoUrl.includes('data.json')).map((photoUrl, index) => (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                        <img
                          onClick={() => { photoChooseClick(photoUrl); }}
                          key={index}
                          src={photoUrl}
                          alt={`Photo ${index + 1}`}
                          style={{ borderRadius: '10px', border: '2px solid black', maxHeight: '60px', width: '100px', height: 'auto', margin: '5px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2), 0 -2px 10px rgba(0, 0, 0, 0.2), 2px 0 10px rgba(0, 0, 0, 0.2), -2px 0 10px rgba(0, 0, 0, 0.2)'}}
                        />
                        <Typography style={{ marginTop: '5px' }}>{getPhotoName(photoUrl)}</Typography>
                      </div>
                    ))
                  ) : (
                    <p>No photos available.</p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ width: '95%', backgroundColor: 'white', border: '2px solid black', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', borderRadius: '12px', zIndex: 3, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', height: '50%' }}>
              <div style={{ width: '100%', height: '30px', backgroundColor: 'black', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: 'white' }}>
                  <div style={{ display: 'flex', color: 'white' }}>
                      <Typography style={{ marginTop: '3px', marginLeft: '5px' }}>{choosenLanguage == 'EN' ? (`Insert text`) : (`Dodaj tekst`)}</Typography>
                  </div>
              </div>
              <div style={{marginLeft: 'auto', marginRight: 'auto', width: '95%', marginTop: '10px', marginBottom: '10px'}}>
                <TextField
                    id="outlined-required"
                    label="text"
                    value={textFieldVal}
                    multiline
                    minRows={1}
                    maxRows={1}
                    style={{width: '100%', height: '55px'}}
                    inputProps={{ maxLength: 32 }}
                    onChange={(event) => {setTextFieldVal(event.target.value)}}  
                />
                </div>
              <Button onClick={() => addTextButtonHandle(textFieldVal)} style={{border: '2px solid black', backgroundColor: 'black', borderRadius: '15px', width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '10px'}}><Typography style={{fontSize: '14px', fontWeight:'bold', color: 'white'}}>{choosenLanguage == 'EN' ? (`add text`) : (`dodaj tekst`)}</Typography></Button>
          </div>
            
            
            
          </div>
        </div>
        
    </div>
    <Layers layoutOnPage={layoutOnPage} layerTable = {layerTable} pageNumber = {pageNumber} lessMoreTable = {lessMoreTable} rmPhotoClick = {rmPhotoClick} lessMoreClick = {lessMoreClick} makeLayerUP = {makeLayerUP} makeLayerDown = {makeLayerDown} handleWidthSliderChange = {handleWidthSliderChange} xTable = {xTable} originalPageWidth = {originalPageWidth} handleXSliderChange = {handleXSliderChange} yTable = {yTable} originalPageHeight = {originalPageHeight} handleYSliderChange = {handleYSliderChange} alignWidth = {alignWidth} getLayerTitle = {getLayerTitle} editText = {editText} fonts = {fonts} handleColorPickerVisibility = {handleColorPickerVisibility} textColor = {textColor} showLayerPicker = {showLayerPicker} ChromePicker = {ChromePicker} setSingleColorText = {setSingleColorText} rotateTable={rotateTable} setRotateTable={setRotateTable} borderTable={borderTable} setBorderTable={setBorderTable} shadowTable={shadowTable} setShadowTable={setShadowTable} choosenLanguage={choosenLanguage} />
    </div>
    )
};

export default LayersPanel;