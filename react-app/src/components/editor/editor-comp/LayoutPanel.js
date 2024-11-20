import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';



const LayoutPanel = ({layerTable, pageNumber, originalPageWidth, originalPageHeight, onlyPhotosTable, setWidthTable, widthTable}) => {
    
    

    const layoutChoosen = (pageNumber, photoAmount, layoutNumber) => {
        
        if(photoAmount === 1){
            
            if(layoutNumber === 1){
                const img = new Image()
                img.src = onlyPhotosTable[pageNumber][0]
                console.log(onlyPhotosTable[pageNumber][0])
                
            
                img.onload = () => {

                    
                    
                    console.log(`img height: ${img.height}`)
                    console.log(`img width: ${img.width}`)

                    console.log(`original page heiggt: ${originalPageHeight}`)



                    
                };
            } else if(layoutNumber === 2){

            }
            
            
            
            
            
            
            console.log('1')
        } else if (photoAmount === 2){
            console.log("2")
        } else {
            console.log('else')
        }
        
        
        
        
        
        
        
        
        
        
    
        
    }

  return (
  
    <div style={{width: '400px', height: 'calc(100vh - 64px)', backgroundColor: 'lightblue'}}>
        <Typography>{`Choose layout for page ${pageNumber}!`}</Typography>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5px', width: '200px', height: '95%', marginLeft: 'auto', marginRight: 'auto', borderRadius: '15px', border: '2px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)', overflowY: 'scroll' }}>

          {layerTable[pageNumber].filter(item => typeof item === 'string' && item.startsWith('http')).length === 1 ? (
            <div style={{display: 'flex', marginTop: '5px', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{display: 'flex', marginBottom: '5px', width: '100%', height: '280px', justifyContent: 'center', alignItems: 'center'}}>
                <div onClick={() => {layoutChoosen(pageNumber, 1, 1)}} style={{width: `${originalPageWidth/8}px`, height: `${originalPageHeight/7}px`, backgroundColor: 'white', overflow: 'hidden'}}>
                  <img src={onlyPhotosTable[pageNumber][0]} style={{height: '100%', objectFit: 'contain'}}/>
                </div>
              </div>

              <div style={{display: 'flex', width: '100%', height: '280px', justifyContent: 'center', alignItems: 'center'}}>
                  <div onClick={() => {layoutChoosen(pageNumber, 1, 2)}} style={{display: 'flex', width: `${originalPageWidth/8}px`, height: `${originalPageHeight/7}px`, backgroundColor: 'white', overflow: 'hidden'}}>
                    <img src={onlyPhotosTable[pageNumber][0]} style={{width: '90%', objectFit: 'contain', marginLeft: 'auto', marginRight: 'auto'}}/>
                  </div>
                </div>
              </div>

            ) : layerTable[pageNumber].filter(item => typeof item === 'string' && item.startsWith('http')).length === 2 ? (
              <div style={{display: 'flex', marginTop: '5px', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', marginBottom: '5px', width: '100%', height: '280px', justifyContent: 'center', alignItems: 'center'}}>
                  <div onClick={() => {layoutChoosen(pageNumber, 2, 1)}} style={{width: `${originalPageWidth/8}px`, height: `${originalPageHeight/7}px`, backgroundColor: 'white', overflow: 'hidden'}}>
                    <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center'}}>
                      <img src={onlyPhotosTable[pageNumber][0]} style={{width: '90%', objectFit: 'contain'}}/>
                    </div>
                    <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center'}}>
                    <img  src={onlyPhotosTable[pageNumber][1]} style={{width: '90%', objectFit: 'contain'}}/>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', width: '100%', height: '280px'}}>
                <div onClick={() => {layoutChoosen(pageNumber, 2, 2)}} style={{ display: 'flex', width: `${originalPageWidth / 8}px`, height: `${originalPageHeight / 7}px`, backgroundColor: 'white', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={onlyPhotosTable[pageNumber][0]} 
                    style={{ width: '90%', objectFit: 'contain', position: 'absolute', top: '50px', left: '0', margin: 'auto', right: '0', zIndex: 1 }} 
                  />
                  <img 
                    src={onlyPhotosTable[pageNumber][1]} 
                    style={{ width: '80%', objectFit: 'contain', position: 'absolute', top: '100px', left: '20px', margin: 'auto', right: '0', bottom: '0', zIndex: 2, transform: 'rotate(-15deg)' }} 
                  />
                </div>
                </div>
              </div>
            ) : layerTable[pageNumber].filter(item => typeof item === 'string' && item.startsWith('http')).length === 3 ? (
              <div style={{display: 'flex', marginTop: '5px', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', marginBottom: '20px', width: '100%', height: '280px', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)'}}>
                  <div onClick={() => {layoutChoosen(pageNumber, 3, 1)}} style={{width: `${originalPageWidth/8}px`, height: `${originalPageHeight/7}px`, backgroundColor: 'white', overflow: 'hidden'}}>
                    <div style={{width: '100%', height: '33%', display: 'flex', justifyContent: 'center'}}>
                      <img src={onlyPhotosTable[pageNumber][0]} style={{width: '90%', objectFit: 'contain'}}/>
                    </div>
                    <div style={{width: '100%', height: '33%', display: 'flex', justifyContent: 'center'}}>
                      <img src={onlyPhotosTable[pageNumber][1]} style={{width: '90%', objectFit: 'contain'}}/>
                    </div>
                    <div style={{width: '100%', height: '33%', display: 'flex', justifyContent: 'center'}}>
                      <img src={onlyPhotosTable[pageNumber][2]} style={{width: '90%', objectFit: 'contain'}}/>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', marginBottom: '20px', width: '100%', height: '280px', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)'}}>
                  <div onClick={() => {layoutChoosen(pageNumber, 3, 2)}} style={{width: `${originalPageWidth/8}px`, height: `${originalPageHeight/7}px`, backgroundColor: 'white', overflow: 'hidden'}}>
                    <div style={{height: '100%', alignContent: 'center'}}>
                      <div style={{width: '100%', height: '30%', marginBottom: '5px', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][0]} style={{width: '90%', objectFit: 'cover'}}/>
                      </div>
                      <div style={{width: '100%', height: '30%', marginBottom: '5px', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][1]} style={{width: '90%', objectFit: 'cover'}}/>
                      </div>
                      <div style={{width: '100%', height: '30%', display: 'flex', justifyContent: 'center'}}>
                        <img src={onlyPhotosTable[pageNumber][2]} style={{width: '90%', objectFit: 'cover'}}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', marginBottom: '20px', width: '100%', height: '280px', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)'}}>
                  <div onClick={() => {layoutChoosen(pageNumber, 3, 3)}} style={{width: `${originalPageWidth/8}px`, height: `${originalPageHeight/7}px`, backgroundColor: 'white', overflow: 'hidden'}}>
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
                  </div>
                </div>

                <div style={{display: 'flex', marginBottom: '20px', width: '100%', height: '280px', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)'}}>
                  <div onClick={() => {layoutChoosen(pageNumber, 3, 4)}} style={{width: `${originalPageWidth/8}px`, height: `${originalPageHeight/7}px`, backgroundColor: 'white', overflow: 'hidden'}}>
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
                    
                  </div>
                </div>
              </div>
            ) : (<div>more</div>)}
        </div>
      </div>
    )
};

export default LayoutPanel;