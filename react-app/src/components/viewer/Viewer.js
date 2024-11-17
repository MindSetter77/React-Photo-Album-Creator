import React, { useEffect, useState, useRef} from 'react';
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

import FileDropzone from '../create-album/FileDropzone';

const Viewer = ({ user}) => {

    const { album_id } = useParams();

  useEffect(() => {
    fetchAlbumPhotos(album_id)
    getSharedData(album_id)
  }, [])

  console.log(album_id)





  const fonts = [
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lora', value: 'Lora, serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Arial', value: 'Arial, sans-serif' },
  ];

  const [photosOfPanel, setPhotosOfPanel] = useState([]);
  const [pageSize, setPageSize] = useState('A4');
  const [changeBackground, setChangeBackground] = useState(false);

  const [originalPageWidth, setOriginalPageWidth] = useState(1240)
  const [originalPageHeight, setOriginalPageHeight] = useState(1754)

  const [pageHeight, setPageHeight] = useState(1754); // A4 height in pixels
  const [pageWidth, setPageWidth] = useState(1240); // A4 width in pixels
  const [zoom, setZoom] = useState(100);


  const [colorPickerColor, setColorPickerColor] = useState('#ffffff');

  const [pageNumber, setPageNumber] = useState(1);
  const [allPageNumber, setAllPageNumber] = useState(1);

  const [layerTable, setlayerTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });

  const [widthTable, setWidthTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 100) // Wypełnienie wartościami domyślnymi
    );
  });

  const [textColor, setTextColor] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });

  const [xTable, setXTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });

  const [yTable, setYTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });

  const fetchAlbumPhotos = async (albumId) => {
    try {
      const response = await fetch(`http://localhost:3001/albums/${albumId}/photos`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setPhotosOfPanel(data.images);
      console.log("fetched!")
    } catch (error) {
      console.error('Error fetching album photos:', error);
    }
  };


  const zoomOut = () => {
    const stepH = originalPageHeight / 10
    const stepW = originalPageWidth / 10
    setPageHeight(pageHeight - stepH)
    setPageWidth(pageWidth - stepW)
    setZoom(zoom - 10)

    //printTables()
  }

  const zoomIn = () => {
    const stepH = originalPageHeight / 10
    const stepW = originalPageWidth / 10
    setPageHeight(pageHeight + stepH)
    setPageWidth(pageWidth + stepW)
    setZoom(zoom + 10)
  }

  const setRealPageNumber = (pageNumber, value) => {
    console.log(pageNumber, value)

    if(value === 1){
      if(pageNumber<allPageNumber){
        pageNumber++
      }
    } else {
      if(pageNumber!==1){
        pageNumber--
      }
    }
    setPageNumber(pageNumber)

  }
  

  const getSharedData = async (albumId) => {
    try {
      const response = await fetch(`http://localhost:3001/getSharedData/${albumId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      setPageSize(data.pageSize)
      setOriginalPageWidth(data.originalPageWidth)
      setOriginalPageHeight(data.originalPageHeight)
      setPageHeight(data.pageHeight)
      setPageWidth(data.pageWidth)
      setChangeBackground(data.changeBackground)
      setColorPickerColor(data.colorPickerColor)
      fetchAlbumPhotos(data.album_id)
      setAllPageNumber(data.allPageNumber)
      setlayerTable(data.layerTable)
      setWidthTable(data.widthTable)
      setTextColor(data.textColor)
      setXTable(data.xTable)
      setYTable(data.yTable)

      setZoom(data.zoom)
      
    } catch (error) {
      console.error('Error fetching shared data:', error);
    }
  };

  return (
  
    <div style={{ background: `linear-gradient(120deg, #caf0f8, #caf0f8)`, height: 'calc(100vh - 64px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',borderRadius: '15px', border: '2px dotted black', backgroundColor: 'rgba(255, 255, 255, 0.5)', position: 'absolute', marginLeft: 'auto', marginRight: 'auto', bottom: '10px', height: '60px', width: '400px'}}>
            <Button onClick={() => { zoomOut() }}><ZoomOutIcon/></Button>
            <Typography style={{marginLeft: '10px', marginRight: '10px'}}>{`${zoom}%`}</Typography>
            <Button onClick={() => { zoomIn() }}><ZoomInIcon/></Button>
            <Button style={{width: '10px'}} onClick={() => {setRealPageNumber(pageNumber, -1)}}>◀</Button>
            <Typography>{`Page: ${pageNumber}/${allPageNumber}`}</Typography>
            <Button style={{width: '10px'}} onClick={() => {setRealPageNumber(pageNumber, 1)}}>▶</Button>
          </div>
      </div>
    )
};

export default Viewer;