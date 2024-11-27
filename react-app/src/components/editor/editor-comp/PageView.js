import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TuneIcon from '@mui/icons-material/Tune';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { ChromePicker } from 'react-color';
import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';



const PageView = ({layoutOnPage, setLayoutOnPage, colorPickerColor, pageWidth, pageHeight, layerTable, pageNumber, xTable, zoom, yTable, widthTable, textColor, onlyPhotosTable}) => {

    

  return (
    <>
    {layoutOnPage[pageNumber] === '11' ? (
        <Card style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)' // Dodanie cienia
          }}>
            <img src={onlyPhotosTable[pageNumber][0]} style={{height: '100%', position: 'absolute', left: `-${xTable[pageNumber][0] >= pageWidth ? pageWidth : xTable[pageNumber][0]}px`}} />
        </Card>
    ) : layoutOnPage[pageNumber] === '12' ? (

        <Card style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
          }}>
            <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src={onlyPhotosTable[pageNumber][0]} style={{width: '90%'}} />
            </div>
            
        </Card>
    ) : layoutOnPage[pageNumber] === '21' ? (

        <Card style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
          }}>
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{height: '50%', width: '100%', alignContent: 'center'}}>
                    <img src={onlyPhotosTable[pageNumber][0]} style={{width: '90%'}} />
                </div>
                <div style={{height: '50%', width: '100%', alignContent: 'center'}}>
                    <img src={onlyPhotosTable[pageNumber][1]} style={{width: '90%'}} />
                </div>
            </div>
            
        </Card>
    ) : layoutOnPage[pageNumber] === '31' ? (

        <Card style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
          }}>
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{height: '32%', width: '100%', alignContent: 'center'}}>
                    <img src={onlyPhotosTable[pageNumber][0]} style={{height: '100%'}} />
                </div>
                <div style={{height: '32%', width: '100%', alignContent: 'center', marginTop: '3px', marginBottom: '3px'}}>
                    <img src={onlyPhotosTable[pageNumber][1]} style={{height: '100%'}} />
                </div>
                <div style={{height: '32%', width: '100%', alignContent: 'center'}}>
                    <img src={onlyPhotosTable[pageNumber][2]} style={{height: '100%'}} />
                </div>
            </div>
            
        </Card>

    ) : layoutOnPage[pageNumber] === '32' ? (

        <Card style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
        }}>
            <div style={{height: '100%', alignContent: 'center'}}>
                      <div style={{width: '100%', height: '32%', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][0]} style={{width: '93%', height: '95%', objectFit: 'cover'}}/>
                      </div>
                      <div style={{width: '100%', height: '32%', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][1]} style={{width: '93%', height: '95%', objectFit: 'cover'}}/>
                      </div>
                      <div style={{width: '100%', height: '32%', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][2]} style={{width: '93%', height: '98%', objectFit: 'cover'}}/>
                      </div>
                    </div>
            
        </Card>

    ) : layoutOnPage[pageNumber] === '33' ? (

        <Card style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
        }}>
            <div style={{display: 'flex', width: '100%', height: '30%'}}>
                      <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][1]} style={{width: '90%', objectFit: 'contain'}}/>
                      </div>
                      <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][2]} style={{width: '90%', objectFit: 'contain'}}/>
                      </div>
                    </div>
                    <div style={{width: '100%', height: '70%', display: 'flex', justifyContent: 'center'}}>
                      <img src={onlyPhotosTable[pageNumber][0]} style={{width: '90%', objectFit: 'contain'}}/>
                    </div>
            
        </Card>

    ) : layoutOnPage[pageNumber] === '34' ? (

        <Card style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
        }}>
            <div style={{width: '100%', height: '70%', display: 'flex', justifyContent: 'center'}}>
                      <img src={onlyPhotosTable[pageNumber][0]} style={{width: '90%', objectFit: 'contain'}}/>
                    </div>
                    
                    <div style={{display: 'flex', width: '100%', height: '30%'}}>
                      <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][1]} style={{width: '90%', objectFit: 'contain'}}/>
                      </div>
                      <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][2]} style={{width: '90%', objectFit: 'contain'}}/>
                      </div>
                    </div>
            
        </Card>


    ) : (
        
    <Card style={{
        backgroundColor: colorPickerColor,
        width: pageWidth,
        height: pageHeight,
        objectFit: 'contain',
        position: 'relative',
        boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)' // Dodanie cienia
      }}>
        {layerTable[pageNumber].map((item, index) => (
          item.slice(0, 10) !== 'TYPOGRAPHY' ? (
          <img key={index} src={item} style={{position: 'absolute', left: `${xTable[pageNumber][index]*(zoom/100)}px`, top: `${yTable[pageNumber][index]*(zoom/100)}px`, width: `${widthTable[pageNumber][index]}%`}} />
        ):(
          <div style={{color: `${textColor[pageNumber][index]}` , position: 'absolute', left: `${xTable[pageNumber][index]*(zoom/100)}px`, top: `${yTable[pageNumber][index]*(zoom/100)}px`, fontWeight: item.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: item.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: item.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${item.split(".")[4]*(zoom/100)}px`, fontFamily: `${item.split(".")[6]}`}}>{`${item.split(".")[5]}`}</div>
          
        )))}
    </Card>
    )}
    </>
    )
};

export default PageView;