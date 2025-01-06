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

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const PageView = ({layoutOnPage, setLayoutOnPage, colorPickerColor, pageWidth, pageHeight, layerTable, pageNumber, xTable, zoom, yTable, widthTable, textColor, onlyPhotosTable, onlyTextTable, rotateTable, borderTable, shadowTable, setRealPageNumber, allPageNumber, setPageNumber, zoom100}) => {
  
  const generatePDF = async () => {

    const element = document.getElementById(layoutOnPage[1]);
    const rect = element.getBoundingClientRect();
    const width = rect.width; // Szerokość elementu w px
    const height = rect.height; // Wysokość elementu w px

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [width, height], // Możesz dostosować rozmiar strony do swoich potrzeb
    });

    
  
    try {

      setPageNumber(1)
      //zoom100()
      
      for(let i = 1; i <= allPageNumber; i++){
        if(i == 1){
          setTimeout(async () => {
            await addPageToPdf(pdf, layoutOnPage[i]);
            setPageNumber(2)
          }, i*1000);
        } else if(i == allPageNumber){
          setTimeout(async () => {
            pdf.addPage();
            await addPageToPdf(pdf, layoutOnPage[i]);
            pdf.save('album.pdf')
          }, i*1000);
        } else {
          setTimeout(async () => {
            pdf.addPage();
            await addPageToPdf(pdf, layoutOnPage[i]);
            setPageNumber(i+1)
          }, i*1000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const addPageToPdf = (pdf, elementId) => {
    const element = document.getElementById(elementId);
  
    return new Promise((resolve, reject) => {
      html2canvas(element, { scale: 2, useCORS: true })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
  
          pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
          resolve(); // Strona została dodana do PDF
          setRealPageNumber(pageNumber, +1);
        })
        .catch((error) => {
          reject(`Error generating page for ${elementId}: ${error}`);
        });
        
    });
    
  };
  
  
  

  const convertImageToBase64 = async (url) => {
    const response = await fetch(url, { mode: 'cors' });
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
  };

  const loadImagesAsBase64 = async () => {
      for (let i = 0; i < layerTable[pageNumber].length; i++) {
          const item = layerTable[pageNumber][i];
          if (item.slice(0, 10) !== 'TYPOGRAPHY') {
              layerTable[pageNumber][i] = await convertImageToBase64(item);
          }
      }
  };

  const handleDownload = async () => {

    await loadImagesAsBase64();
    generatePDF();

  };

  return (
    <>
    {layoutOnPage[pageNumber] === '11' ? (
        <Card id="11" style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)' // Dodanie cienia
          }}>
            {layerTable[pageNumber].slice().reverse().map((item, index) => {
              const reversedIndex = layerTable[pageNumber].length - 1 - index;

              return item.slice(0, 10) !== 'TYPOGRAPHY' ? (
                <img key={index} src={item} style={{position: 'absolute', left: `${-(xTable[pageNumber][reversedIndex]*(zoom/100))}px`, top: `0px`, height: '100%'}} />
            ):(
              <div style={{color: `${textColor[pageNumber][reversedIndex]}` , position: 'absolute', left: `${xTable[pageNumber][reversedIndex]*(zoom/100)}px`, top: `${yTable[pageNumber][reversedIndex]*(zoom/100)}px`, fontWeight: item.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: item.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: item.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${item.split(".")[4]*(zoom/100)}px`, fontFamily: `${item.split(".")[6]}`}}>{`${item.split(".")[5]}`}</div>
              
            )})}

            
            
        </Card>
    ) : layoutOnPage[pageNumber] === '12' ? (

        <Card id="12" style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
          }}>

            {layerTable[pageNumber].slice().reverse().map((item, index) => {
              const reversedIndex = layerTable[pageNumber].length - 1 - index;

              return item.slice(0, 10) !== 'TYPOGRAPHY' ? (
                <div key={index} style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <img src={item} style={{position: 'absolute', width: '90%', border: borderTable[pageNumber][reversedIndex], boxShadow: `${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 2}px ${shadowTable[pageNumber][reversedIndex] * 0.5}px rgba(0, 0, 0, 0.5)`}} />
                </div>
            ):(
              <div key={index} style={{color: `${textColor[pageNumber][reversedIndex]}` , position: 'absolute', left: `${xTable[pageNumber][reversedIndex]*(zoom/100)}px`, top: `${yTable[pageNumber][reversedIndex]*(zoom/100)}px`, fontWeight: item.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: item.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: item.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${item.split(".")[4]*(zoom/100)}px`, fontFamily: `${item.split(".")[6]}`}}>{`${item.split(".")[5]}`}</div>
              
            )})}
            
            
        </Card>
    ) : layoutOnPage[pageNumber] === '21' ? (

        <Card id="21" style={{
          
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
          }}>

            {layerTable[pageNumber].slice().reverse().map((item, index) => {
              const reversedIndex = layerTable[pageNumber].length - 1 - index;

              return item.slice(0, 10) !== 'TYPOGRAPHY' ? (
                <div key={index} style={{display: 'flex', width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>
                  <img src={item} style={{position: 'absolute', width: '90%', boxShadow: `${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 2}px ${shadowTable[pageNumber][reversedIndex] * 0.5}px rgba(0, 0, 0, 0.5)`, border: borderTable[pageNumber][reversedIndex]}} />
                </div>
            ):(
              <div key={index} style={{color: `${textColor[pageNumber][reversedIndex]}` , position: 'absolute', left: `${xTable[pageNumber][reversedIndex]*(zoom/100)}px`, top: `${yTable[pageNumber][reversedIndex]*(zoom/100)}px`, fontWeight: item.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: item.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: item.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${item.split(".")[4]*(zoom/100)}px`, fontFamily: `${item.split(".")[6]}`}}>{`${item.split(".")[5]}`}</div>
              
            )})}

            
        </Card>

    ) : layoutOnPage[pageNumber] === '22' ? (

      <Card id="22" style={{
          backgroundColor: colorPickerColor,
          width: pageWidth,
          height: pageHeight,
          objectFit: 'contain',
          position: 'relative',
          boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
        }}>

          {layerTable[pageNumber].slice().reverse().map((item, index) => {
            const reversedIndex = layerTable[pageNumber].length - 1 - index;

            return item.slice(0, 10) !== 'TYPOGRAPHY' ? (
              <div key={index} style={{display: 'flex', width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>
                <img src={item} style={{position: 'absolute', width: '90%', boxShadow: `${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 2}px ${shadowTable[pageNumber][reversedIndex] * 0.5}px rgba(0, 0, 0, 0.5)`, border: borderTable[pageNumber][reversedIndex]}} />
              </div>
          ):(
            <div key={index} style={{color: `${textColor[pageNumber][reversedIndex]}` , position: 'absolute', left: `${xTable[pageNumber][reversedIndex]*(zoom/100)}px`, top: `${yTable[pageNumber][reversedIndex]*(zoom/100)}px`, fontWeight: item.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: item.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: item.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${item.split(".")[4]*(zoom/100)}px`, fontFamily: `${item.split(".")[6]}`}}>{`${item.split(".")[5]}`}</div>
            
          )})}

          
      </Card>
    ) : layoutOnPage[pageNumber] === '31' ? (

        <Card id="31" style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
          }}>
            {layerTable[pageNumber].slice().reverse().map((item, index) => {
              const reversedIndex = layerTable[pageNumber].length - 1 - index;

              return item.slice(0, 10) !== 'TYPOGRAPHY' ? (
                <div key={index} style={{position: 'relative',display: 'flex', width: '100%', height: '34%', justifyContent: 'center', alignItems: 'center'}}>
                  <img src={item} style={{position: 'absolute',objectFit: 'contain', height: '100%'}} />
                </div>
            ):(
              <div key={index} style={{color: `${textColor[pageNumber][reversedIndex]}` , position: 'absolute', left: `${xTable[pageNumber][reversedIndex]*(zoom/100)}px`, top: `${yTable[pageNumber][reversedIndex]*(zoom/100)}px`, fontWeight: item.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: item.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: item.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${item.split(".")[4]*(zoom/100)}px`, fontFamily: `${item.split(".")[6]}`}}>{`${item.split(".")[5]}`}</div>
              
            )})}
            
        </Card>

    ) : layoutOnPage[pageNumber] === '32' ? (

        <Card id="32" style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
        }}>
          
            {layerTable[pageNumber].slice().reverse().map((item, index) => {
              const reversedIndex = layerTable[pageNumber].length - 1 - index;

              const isFirstImage = layerTable[pageNumber]
              .slice()
              .reverse()
              .findIndex(element => element.slice(0, 10) !== 'TYPOGRAPHY') === index;


              return item.slice(0, 10) !== 'TYPOGRAPHY' ? (
                <div key={index} style={{position: 'relative',display: 'flex', width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center', marginBottom: '3%', marginTop: isFirstImage === true ? '4%' : '0px'}}>
                  <img src={item} style={{position: 'absolute', width: '90%', height: '100%', border: borderTable[pageNumber][reversedIndex], boxShadow: `${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 2}px ${shadowTable[pageNumber][reversedIndex] * 0.5}px rgba(0, 0, 0, 0.5)`}} />
                </div>
            ):(
              <div key={index} style={{color: `${textColor[pageNumber][reversedIndex]}` , position: 'absolute', left: `${xTable[pageNumber][reversedIndex]*(zoom/100)}px`, top: `${yTable[pageNumber][reversedIndex]*(zoom/100)}px`, fontWeight: item.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: item.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: item.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${item.split(".")[4]*(zoom/100)}px`, fontFamily: `${item.split(".")[6]}`}}>{`${item.split(".")[5]}`}</div>
              
            )})}
            
            
            
        </Card>

    ) : layoutOnPage[pageNumber] === '33' ? (

        <Card id="33" style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia   
            display: 'flex'         
        }}>
            <div style={{width: '100%', height: '100%'}}>
              <div style={{display: 'flex',width: '100%', height: '50%' }}>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                  <img src={onlyPhotosTable[pageNumber][0]} style={{width: '95%', objectFit: 'contain'}} />
                </div>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                  <img src={onlyPhotosTable[pageNumber][1]} style={{width: '95%', objectFit: 'contain'}} />
                </div>
              </div>
              <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center'}}>
                <img src={onlyPhotosTable[pageNumber][2]} style={{width: '95%', objectFit: 'contain', marginBottom: '20px'}} />
              </div>
              {layerTable[pageNumber].filter(item => item.startsWith("TYPOGRAPHY")).map((itemm, index) => {
                let idx = layerTable[pageNumber].findIndex(item =>  item === itemm)
                
                return (
                <div style={{position: 'absolute', left: `${xTable[pageNumber][idx]*(zoom / 100)}px`, top: `${yTable[pageNumber][idx]*(zoom / 100)}px`, fontWeight: itemm.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: itemm.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: itemm.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${itemm.split(".")[4] * (zoom / 100)}px`, fontFamily: `${itemm.split(".")[6]}`
              
              }}>{`${itemm.split(".")[5]}`}</div>
              )})}
            </div>
            
        </Card>

    ) : layoutOnPage[pageNumber] === '34' ? (

        <Card id="34" style={{
            backgroundColor: colorPickerColor,
            width: pageWidth,
            height: pageHeight,
            objectFit: 'contain',
            position: 'relative',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)', // Dodanie cienia            
        }}>
            <div style={{width: '100%', height: '100%'}}>
              
              <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center'}}>
                <img src={onlyPhotosTable[pageNumber][2]} style={{width: '95%', objectFit: 'contain'}} />
              </div>

              <div style={{display: 'flex',width: '100%', height: '50%' }}>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                  <img src={onlyPhotosTable[pageNumber][0]} style={{width: '95%', objectFit: 'contain'}} />
                </div>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                  <img src={onlyPhotosTable[pageNumber][1]} style={{width: '95%', objectFit: 'contain'}} />
                </div>
              </div>
              {layerTable[pageNumber].filter(item => item.startsWith("TYPOGRAPHY")).map((itemm, index) => {
                let idx = layerTable[pageNumber].findIndex(item =>  item === itemm)
                
                return (
                <div style={{position: 'absolute', left: `${xTable[pageNumber][idx]*(zoom / 100)}px`, top: `${yTable[pageNumber][idx]*(zoom / 100)}px`, fontWeight: itemm.split(".")[1] === 'true' ? 'bold' : 'normal', fontStyle: itemm.split(".")[2] === "true" ? 'italic' : 'normal', textDecoration: itemm.split(".")[3] === "true" ? 'underline' : 'none', fontSize: `${itemm.split(".")[4] * (zoom / 100)}px`, fontFamily: `${itemm.split(".")[6]}`
              
              }}>{`${itemm.split(".")[5]}`}</div>
              )})}
            </div>
            
        </Card>


    ) : (
      <div style={{display: 'flex'}}>
      <Card id="None" style={{
        
        backgroundColor: colorPickerColor,
        width: pageWidth,
        height: pageHeight,
        objectFit: 'contain',
        position: 'relative',
        boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)' // Dodanie cienia
      }}>
        {layerTable[pageNumber].slice().reverse().map((item, index) => {
          const reversedIndex = layerTable[pageNumber].length - 1 - index; // Obliczenie odwróconego indeksu

          return item.slice(0, 10) !== 'TYPOGRAPHY' ? (
            <img 
              key={index} 
              src={item} 
              style={{
                position: 'absolute', 
                left: `${xTable[pageNumber][reversedIndex] * (zoom / 100)}px`, 
                top: `${yTable[pageNumber][reversedIndex] * (zoom / 100)}px`, 
                transform: `rotate(${rotateTable[pageNumber][reversedIndex]}deg)`,
                width: `${widthTable[pageNumber][reversedIndex]}%`,
                border: `${borderTable[pageNumber][reversedIndex]}`,
                boxShadow: `${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 1.2}px ${shadowTable[pageNumber][reversedIndex] * 2}px ${shadowTable[pageNumber][reversedIndex] * 0.5}px rgba(0, 0, 0, 0.5)`
              }} 
            />
          ) : (
            <div
              key={index}
              style={{
                color: `${textColor[pageNumber][reversedIndex]}`, 
                position: 'absolute', 
                left: `${xTable[pageNumber][reversedIndex] * (zoom / 100)}px`, 
                top: `${yTable[pageNumber][reversedIndex] * (zoom / 100)}px`,
                fontWeight: item.split(".")[1] === 'true' ? 'bold' : 'normal', 
                fontStyle: item.split(".")[2] === "true" ? 'italic' : 'normal', 
                textDecoration: item.split(".")[3] === "true" ? 'underline' : 'none', 
                fontSize: `${item.split(".")[4] * (zoom / 100)}px`, 
                fontFamily: `${item.split(".")[6]}`
              }}
            >
              {`${item.split(".")[5]}`}
            </div>
          );
        })}
    </Card>
    
    </div>

    )}
    </>
    )
};

export default PageView;