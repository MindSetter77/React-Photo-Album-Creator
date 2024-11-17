import React, { useEffect, useState, useRef } from 'react';
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

const Editor = ({ user, album_id }) => {

  useEffect(() => {
    fetchAlbumPhotos(album_id)
    getSharedData(album_id)
  }, [])

  console.log(album_id)

  const leftColor = "#845ec2"; // koralowy
  const middleColor = "#d65db1"; // brzoskwiniowy
  const rightBackgroundColor = "#ffe5d9"; // delikatny różowy
  const borderColor = '#48cae4'; // ciemna malina
  const buttonColor = "white"; // bordowy



  const fonts = [
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lora', value: 'Lora, serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Arial', value: 'Arial, sans-serif' },
  ];

  const [leftPanel, setLeftPanel] = useState('info');
  const [pageSize, setPageSize] = useState('A4');
  
  const [originalPageWidth, setOriginalPageWidth] = useState(1240)
  const [originalPageHeight, setOriginalPageHeight] = useState(1754)

  const [pageHeight, setPageHeight] = useState(1754); // A4 height in pixels
  const [pageWidth, setPageWidth] = useState(1240); // A4 width in pixels
  const [zoom, setZoom] = useState(100);

  const [changeBackground, setChangeBackground] = useState(false);
  const [colorPickerColor, setColorPickerColor] = useState('#ffffff');

  const [photosOfPanel, setPhotosOfPanel] = useState([]);

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

  const [showLayerPicker, setShowLayerPicker] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => false) // Wypełnienie wartościami domyślnymi
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

  const [lessMoreTable, setLessMoreTable] = useState(() => {
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

  
  
  const changePageSize = (event) => {
    const newValue = event.target.value;
    if (newValue === 'A4') {
      setPageSize('A4');
      setPageHeight(1754); //842
      setPageWidth(1240); //569
      setOriginalPageHeight(1754)
      setOriginalPageWidth(1240)
      setZoom(100)
    }else if(newValue === "A5"){
      setPageSize('A5')
      setPageHeight(1240)
      setPageWidth(874)
      setOriginalPageHeight(1240)
      setOriginalPageWidth(874)
      setZoom(100)
    }else if (newValue === "43"){
      setPageSize('43');
      setPageHeight(1600);
      setPageWidth(1200);
      setOriginalPageHeight(1600)
      setOriginalPageWidth(1200)
      setZoom(100)
    } 
  };

  const handleChangeBackground = () => {
    setChangeBackground(!changeBackground);
    if (changeBackground) {
      setColorPickerColor('#ffffff');
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

  const setPhotosPanel = () => {
    setLeftPanel('photos')
  }

  const photoChooseClick = (url) => {
    const copyOfItems = [...layerTable];
    copyOfItems[pageNumber].push(url)
    setlayerTable(copyOfItems)

    const cpyW = [...widthTable]
    cpyW[pageNumber].push(100)
    setWidthTable(cpyW)

    const cpyX = [...xTable]
    cpyX[pageNumber].push(0)
    setXTable(cpyX)

    const cpyY = [...yTable]
    cpyY[pageNumber].push(0)
    setYTable(cpyY)

    const lessMoreTableCpy = [...lessMoreTable]
    lessMoreTable[pageNumber].push('More')
    setLessMoreTable(lessMoreTableCpy)

  }

  const typographyChooseClick = () => {
    let obj = "TYPOGRAPHY.false.false.false.40.napis.Roboto, sans-serif"

    const copyOfItems = [...layerTable];
    let index = copyOfItems[pageNumber].length
    copyOfItems[pageNumber].push(obj)
    setlayerTable(copyOfItems)

    const cpyW = [...widthTable]
    cpyW[pageNumber].push(100)
    setWidthTable(cpyW)

    const cpyX = [...xTable]
    cpyX[pageNumber].push(0)
    setXTable(cpyX)

    const cpyY = [...yTable]
    cpyY[pageNumber].push(0)
    setYTable(cpyY)


    let cpySLP = [...showLayerPicker]
    cpySLP[pageNumber][index] = false
    setShowLayerPicker(cpySLP)

    let asd = [...textColor]
    asd[pageNumber][index] = "#000000"
    setTextColor(asd)

    let lessMoreTableCpy = [...lessMoreTable]
    lessMoreTableCpy[pageNumber][index] = 'More'
    setLessMoreTable(lessMoreTableCpy)
  }

  const rmPhotoClick = (index) => {
    const copyOfItemsPhoto = [...layerTable];
    copyOfItemsPhoto[pageNumber].splice(index, 1)
    setlayerTable(copyOfItemsPhoto)

    const copyOfWidthTable = [...widthTable]
    copyOfWidthTable[pageNumber].splice(index, 1)
    setWidthTable(copyOfWidthTable) 

    const copyOfXTable = [...xTable]
    copyOfXTable[pageNumber].splice(index, 1)
    setXTable(copyOfXTable)

    const copyOfYTable = [...yTable]
    copyOfYTable[pageNumber].splice(index, 1)
    setYTable(copyOfYTable)

    const copyOfColor = [...textColor]
    copyOfColor[pageNumber].splice(index, 1)
    setTextColor(copyOfColor)

    let lessMoreTableCpy = [...lessMoreTable]
    lessMoreTableCpy[pageNumber].splice(index, 1)
    setLessMoreTable(lessMoreTableCpy)
  }

  const handleWidthSliderChange = (pageNumber, index, value) => {
    const copyOfItems = [...widthTable];
    copyOfItems[pageNumber][index] = value
    setWidthTable(copyOfItems)
  }

  const handleXSliderChange = (pageNumber, index, value) => {
    const copyOfItems = [...xTable]
    copyOfItems[pageNumber][index] = value
    setXTable(copyOfItems)
  }

  const handleYSliderChange = (pageNumber, index, value) => {
    const copyOfItems = [...yTable]
    copyOfItems[pageNumber][index] = value
    setYTable(copyOfItems)
  }

  const editText = (value, item, pageNumber, index, textIdx) => {
    let copyOfItems = [...layerTable]
    let text = copyOfItems[pageNumber][index]
    text = text.split(".")
    text[textIdx] = value
    let valueToSave = `${text[0]}.${text[1]}.${text[2]}.${text[3]}.${text[4]}.${text[5]}.${text[6]}`
    copyOfItems[pageNumber][index] = valueToSave
    setlayerTable(copyOfItems)
  }

  const makeLayerDown = (index) => {
    if(index > 0){
      let copyOfItems = [...layerTable]
      let movedLayer = copyOfItems[pageNumber][index]
      let downLayer = copyOfItems[pageNumber][index-1]
      copyOfItems[pageNumber][index-1] = movedLayer
      copyOfItems[pageNumber][index] = downLayer
      setlayerTable(copyOfItems)

      let widthCopy = [...widthTable]
      let widthMoved = widthCopy[pageNumber][index]
      let downWidth = widthCopy[pageNumber][index-1]
      widthCopy[pageNumber][index] = downWidth
      widthCopy[pageNumber][index-1] = widthMoved 
      setWidthTable(widthCopy)

      let copyOfX = [...xTable]
      let movedX = copyOfX[pageNumber][index]
      let downX = copyOfX[pageNumber][index-1]
      copyOfX[pageNumber][index-1] = movedX
      copyOfX[pageNumber][index] = downX
      setXTable(copyOfX)

      let copyOfY = [...yTable]
      let movedY = copyOfY[pageNumber][index]
      let downY = copyOfY[pageNumber][index-1]
      copyOfY[pageNumber][index-1] = movedY
      copyOfY[pageNumber][index] = downY
      setYTable(copyOfY)

      let copyOfColor = [...textColor]
      let movedC = copyOfColor[pageNumber][index]
      let downC = copyOfColor[pageNumber][index-1]
      copyOfColor[pageNumber][index-1] = movedC
      copyOfColor[pageNumber][index] = downC
      setTextColor(copyOfColor)

      let lessMoreTableCpy = [...lessMoreTable]
      let movedLM = lessMoreTableCpy[pageNumber][index]
      let downLM = lessMoreTableCpy[pageNumber][index-1]
      lessMoreTableCpy[pageNumber][index-1] = movedLM
      lessMoreTableCpy[pageNumber][index] = downLM
      setLessMoreTable(lessMoreTableCpy)
    }
  }

  const makeLayerUP = (index) => {

    let asd = layerTable[pageNumber].length-1
    if(asd !== index){
      let copyOfItems = [...layerTable]
      let movedLayer = copyOfItems[pageNumber][index]
      let downLayer = copyOfItems[pageNumber][index+1]
      copyOfItems[pageNumber][index+1] = movedLayer
      copyOfItems[pageNumber][index] = downLayer
      setlayerTable(copyOfItems)

      let widthCopy = [...widthTable]
      let widthMoved = widthCopy[pageNumber][index]
      let downWidth = widthCopy[pageNumber][index+1]
      widthCopy[pageNumber][index] = downWidth
      widthCopy[pageNumber][index+1] = widthMoved 
      setWidthTable(widthCopy)

      let copyOfX = [...xTable]
      let movedX = copyOfX[pageNumber][index]
      let downX = copyOfX[pageNumber][index+1]
      copyOfX[pageNumber][index+1] = movedX
      copyOfX[pageNumber][index] = downX
      setXTable(copyOfX)

      let copyOfY = [...yTable]
      let movedY = copyOfY[pageNumber][index]
      let downY = copyOfY[pageNumber][index+1]
      copyOfY[pageNumber][index+1] = movedY
      copyOfY[pageNumber][index] = downY
      setYTable(copyOfY)

      let copyOfColor = [...textColor]
      let movedC = copyOfColor[pageNumber][index]
      let downC = copyOfColor[pageNumber][index+1]
      copyOfColor[pageNumber][index+1] = movedC
      copyOfColor[pageNumber][index] = downC
      setTextColor(copyOfColor)

      let lessMoreTableCpy = [...lessMoreTable]
      let movedLM = lessMoreTableCpy[pageNumber][index]
      let downLM = lessMoreTableCpy[pageNumber][index+1]
      lessMoreTableCpy[pageNumber][index+1] = movedLM
      lessMoreTableCpy[pageNumber][index] = downLM
      setLessMoreTable(lessMoreTableCpy)
    }
  }

  
  const deletePhoto = (photoUrl) => {
    setPhotosOfPanel((prevPhotos) => prevPhotos.filter((photo) => photo !== photoUrl));


    let num = layerTable[pageNumber].indexOf(photoUrl)
    
    
    if(num !== -1){
      let copyL = [...layerTable]
      copyL[pageNumber].splice(num , 1)
      setlayerTable(copyL)

      let copyW = [...widthTable]
      copyW[pageNumber].splice(num, 1)
      setWidthTable(copyW)

      let copyX = [...xTable]
      copyX[pageNumber].splice(num, 1)
      setXTable(copyX)

      let copyY = [...yTable]
      copyY[pageNumber].splice(num, 1)
      setYTable(copyY)
    }
  };


  const printTables = () => {
    console.log(`Layer table: ${layerTable[pageNumber].length}`)
    console.log(layerTable[pageNumber])
    console.log(`Width table: ${widthTable[pageNumber].length}`)
    console.log(widthTable[pageNumber])
    console.log(`x table: ${xTable[pageNumber].length}`)
    console.log(xTable[pageNumber])
    console.log(`y table: ${yTable[pageNumber].length}`)
    console.log(yTable[pageNumber])
    console.log(`text color table: ${textColor[pageNumber].length}`)
    console.log(textColor[pageNumber])

    console.log(`lessMoreTable table: ${lessMoreTable[pageNumber].length}`)
    console.log(lessMoreTable[pageNumber])
  }

  const clickWithPhotoImport = () => {
    setLeftPanel('info')
    
  }

  const alignWidth = (index) => {
    let width = widthTable[pageNumber][index] 
    let mnoznik = width / 100
    let wielkoscZdjeciaOriginal = originalPageWidth * mnoznik

    if(wielkoscZdjeciaOriginal < originalPageWidth){
      let roznica = Math.round((originalPageWidth - wielkoscZdjeciaOriginal) / 2)

      let copyX = [...xTable]
      copyX[pageNumber][index] = roznica
      setXTable(copyX)
    }
  }

  const setSingleColorText = (color, index) => {
    let tablecpy = [...textColor]
    tablecpy[pageNumber][index] = color
    setTextColor(tablecpy)
  }

  const handleColorPickerVisibility = (index) => {
    let tablicaCpy = [...showLayerPicker]

    if(tablicaCpy[pageNumber][index] === false){
      tablicaCpy[pageNumber][index] = true
    } else {
      tablicaCpy[pageNumber][index] = false
    }
    setShowLayerPicker(tablicaCpy)
  }

  const lessMoreClick = (index) => {
    let lessMoreTableCpy = [...lessMoreTable]
    if(lessMoreTableCpy[pageNumber][index] === 'More'){
      lessMoreTableCpy[pageNumber][index] = 'Less'
    } else {
      lessMoreTableCpy[pageNumber][index] = 'More'
    }
    setLessMoreTable(lessMoreTableCpy)
  }

  const getLayerTitle = (layer) =>{
    let divided = layer.split('.')
    let num = divided[5].length
    
    let show = divided[5]

    if(num === 0){
      show = "Text Layer"
    }
    if(num > 20){
      let asd = divided[5].substring(0, 20)
      show = asd + '...'
    }

    return show
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

  const getPhotoName = (photoUrl) => {
    const tablica = photoUrl.split("/")
    let name = tablica[5]

    if(name.length>9){
      const ex = name.slice(-4)
      let val = name.substring(0, 9) + ".." + ex

      return val
    } else {
      return name
    }
  }

  const shareAlbumData = () => {
    console.log(lessMoreTable)
      const jsonData = {
        album_id: album_id,
        leftPanel: leftPanel,
        pageSize: pageSize,
        originalPageWidth: originalPageWidth,
        originalPageHeight: originalPageHeight,
        pageHeight: pageHeight,
        pageWidth: pageWidth,
        changeBackground: changeBackground,
        colorPickerColor: colorPickerColor,
        allPageNumber: allPageNumber,
        layerTable: layerTable,
        widthTable: widthTable,
        textColor: textColor,
        xTable: xTable,
        yTable: yTable,
        lessMoreTable: lessMoreTable,
        zoom: zoom
    };
    const jsonString = JSON.stringify(jsonData, null, 2); // `null, 2` dodaje wcięcia dla czytelności
    console.log(jsonString);

    fetch('http://localhost:3001/getSharedData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const getSharedData = async (albumId) => {
    try {
      const response = await fetch(`http://localhost:3001/getSharedData/${albumId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      setPageSize(data.pageSize)
      setLeftPanel(data.leftPanel)
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
      setLessMoreTable(data.lessMoreTable)
      setZoom(data.zoom)
      
    } catch (error) {
      console.error('Error fetching shared data:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      <div style={{display: 'flex', flexDirection: 'column', width: '250px', height: '100%', background: `linear-gradient(180deg, #023e8a, #0077b6)`, borderRight: `2px solid #023e8a`, boxShadow: '10px 0 15px 0 rgba(0, 0, 0, 0.2)', zIndex: 2 }}>
        <Button onClick={() => {clickWithPhotoImport()}} style={{justifyContent: 'flex-start', color: `${buttonColor}`, backgroundColor: leftPanel === 'info' ? '#62b6cb' : 'transparent' }} sx={{ ':hover': { backgroundColor: '#62b6cb' } }}>
          <ImportContactsIcon style={{ fontSize: '20px', marginRight: '5px' }} />Book info
        </Button>
        <Button onClick={() => setLeftPanel('customize')} style={{justifyContent: 'flex-start', color: `${buttonColor}`,  backgroundColor: leftPanel === 'customize' ? '#62b6cb' : 'transparent'}} sx={{ ':hover': { backgroundColor: '#62b6cb' } }}>
          <TuneIcon style={{ fontSize: '20px', marginRight: '5px' }} />Customize
        </Button>
        <Button onClick={() => setPhotosPanel()  } style={{justifyContent: 'flex-start', color: `${buttonColor}`, backgroundColor: leftPanel === 'photos' ? '#62b6cb' : 'transparent' }} sx={{ ':hover': { backgroundColor: '#62b6cb' } }}>
          <InsertPhotoIcon style={{ fontSize: '20px', marginRight: '5px' }} />Photos
        </Button>
        <Button onClick={() => setLeftPanel('settings')} style={{justifyContent: 'flex-start', color: `${buttonColor}`, backgroundColor: leftPanel === 'settings' ? '#62b6cb' : 'transparent' }} sx={{ ':hover': { backgroundColor: '#62b6cb' } }}><SettingsIcon/> Page settings</Button>
        <Button onClick={() => setLeftPanel('share')} style={{marginTop: 'auto', justifyContent: 'flex-start', color: `${buttonColor}`, backgroundColor: leftPanel === 'share' ? '#62b6cb' : 'transparent' }} sx={{ ':hover': { backgroundColor: '#62b6cb' } }}>
          <ShareIcon style={{ fontSize: '20px', marginRight: '5px' }} />Share
        </Button>
      </div>
      <div style={{ width: 'calc(100% - 300px)', height: '100%', maxWidth: '400px', background: `linear-gradient(120deg, #48cae4, #ade8f4)`, boxShadow: '10px 0 15px 0 rgba(0, 0, 0, 0.2)', borderRight: `2px solid ${borderColor}`, zIndex: 1}}>
        {leftPanel === 'info' ? (
          <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', fontFamily: 'Roboto' }}>
            <Typography style={{ fontSize: '18px', marginBottom: '10px' }}>{album_id}</Typography>
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
        ) : leftPanel === 'customize' ? (
          <div>
            <div>
                <Typography style={{padding: '10px'}}>Customize</Typography>
                <FormControl fullWidth style={{marginBottom: '10px'}}>
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
            <div style={{display: 'flex'}}>
              <Typography style={{fontSize: '20px'}}>{`Page number: ${allPageNumber}`}</Typography>
              <div style={{display: 'flex', flexDirection: 'column', width: '100px'}}>
                <Button style={{height: '5px', width: '0px'}} onClick={() => {setAllPageNumber(allPageNumber+1)}}>▲</Button>
                <Button style={{height: '5px', width: '0px'}} onClick={() => {setAllPageNumber(allPageNumber-1)}}>▼</Button>
              </div>
            </div>
            
            <FormControlLabel
              control={<Checkbox checked={changeBackground} onChange={handleChangeBackground} />}
              label="Custom background color"
            />
            {changeBackground && (
              <div>
                <div style={{ display: 'flex' }}>
                  <Typography>Background Color: </Typography>
                  <div style={{ width: '21px', height: '21px', marginLeft: '5px', backgroundColor: colorPickerColor }}></div>
                </div>
                <ChromePicker
                  color={colorPickerColor}
                  onChangeComplete={(color) => setSingleColorText(color.hex)}
                />
              </div>
            )}
          </div>
        ) : leftPanel === 'photos' ? (
          <div style={{display: 'flex', flexDirection: 'column', overflowY: 'auto', height: "100%"}}>
            <FileDropzone/>
            <Typography>Photos</Typography>
            
            {photosOfPanel.length > 0 ? (
              photosOfPanel.filter(photoUrl => !photoUrl.includes('data.json')).map((photoUrl, index) => (
                
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img key={photoUrl} src={photoUrl} alt={`Photo ${index + 1}`} style={{ width: '100px', height: 'auto', maxHeight: '65px', margin: '5px' }} />
                  <Typography>{getPhotoName(photoUrl)}</Typography>
                  <div onClick={() => deletePhoto(photoUrl)} style={{marginRight: '10px', marginLeft: 'auto', cursor: 'pointer'}}>delete</div>
                </div>
              ))
            ) : (
              <p>No photos available.</p>
            )}
          </div>
        ) : leftPanel === 'settings' ? (
          <div>
            <Typography style={{padding: '5px', fontSize: '20px'}}>{`Settings of page: ${pageNumber}`}</Typography>
            <div style={{ width: '95%', borderRadius: '15px', border: '2px solid white', overflow: 'hidden',  marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ height: '25px', width: '100%', backgroundColor: 'white', zIndex: 10, display: 'flex' }}>
                <Typography style={{ marginLeft: '5px', width: '100%' }}>Choose photos</Typography>
              </div>
              <div style={{ flexDirection: 'column', display: 'flex', overflowX: 'auto', overflowY: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '15px' }}>
                
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  {photosOfPanel.length > 0 ? (
                    photosOfPanel.filter(photoUrl => !photoUrl.includes('data.json')).map((photoUrl, index) => (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                        <img
                          onClick={() => { photoChooseClick(photoUrl); }}
                          key={index}
                          src={photoUrl}
                          alt={`Photo ${index + 1}`}
                          style={{ borderRadius: '10px', border: '1px solid white', maxHeight: '60px', boxShadow: '0 5px 30px rgba(0, 0, 0, 0.3), 0 -5px 30px rgba(0, 0, 0, 0.3), 5px 0 30px rgba(0, 0, 0, 0.3), -5px 0 30px rgba(0, 0, 0, 0.3)', width: '100px', height: 'auto', margin: '5px' }}
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
            <Button onClick={() => typographyChooseClick()} style={{border: '2px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '15px', width: '95%', margin: '10px', marginBottom: '5px'}}><Typography style={{fontSize: '16px'}}>Add text</Typography></Button>
            <Typography style={{padding: '5px'}}>Layers</Typography>
            
            <div>
              <div style={{flex: '1', minHeight: '500px', maxHeight: '500px', width: '95%', overflowY: 'scroll', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '15px', border: '2px solid white'}}>
              {layerTable[pageNumber].reverse().map((item, index) => (
                item.startsWith("http")?(
                
                <div style={{marginTop: '5px', marginBottom: '5px', marginLeft: '5px', display: 'flex', flexDirection: 'column', width: '96%', border: '2px solid white', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                  {lessMoreTable[pageNumber][index] === 'Less' ? (
                    <div>
                      <div style={{display: 'flex'}}>
                        <img onClick={() => rmPhotoClick(index)}  key={index} src={item} alt={`Photo ${index + 1}`} style={{ width: '100px', height: 'auto', margin: '5px' }} />
                        <div style={{ width: '100%', padding: '5px'}}>
                          <div style={{display: 'flex'}}>
                            <Typography >{`Photo ${index+1}`}</Typography>
                            <div onClick={() => lessMoreClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '45px', height: '20px', border: '2px solid black', marginLeft: 'auto'}}>{`${lessMoreTable[pageNumber][index]}`}</div>
                            <div onClick={() => makeLayerUP(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black', marginLeft: '5px'}}>u</div>
                            <div onClick={() => makeLayerDown(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black',  marginRight: '5px', marginLeft: '5px'}}>d</div>
                            <div onClick={() => rmPhotoClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black'}}>×</div>
                          </div>
                          <div style={{display: 'flex'}}> 
                            <Typography>Width: </Typography>
                            <Slider defaultValue={100} aria-label="Default" valueLabelDisplay="auto" min={1} max={200} onChange={(event, value) => handleWidthSliderChange(pageNumber, index, value)}/>
                          </div>
                        </div>
                      </div>
                      <div style={{display: 'flex'}}>
                        <div style={{width: '90%'}}>
                          <Typography>Position:</Typography>
                          <div style={{display: 'flex', margin: '5px'}}>
                            <Typography style={{margin: '5px', marginRight: '10px'}}>X</Typography>
                            <Slider value={xTable[pageNumber][index] || 0} onChange={(event, value) => handleXSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={originalPageWidth}/>
                          </div>
                          <div style={{display: 'flex', margin: '5px'}}>
                            <Typography style={{margin: '5px', marginRight: '10px'}}>Y</Typography>
                            <Slider value={yTable[pageNumber][index] || 0} onChange={(event, value) => handleYSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={originalPageHeight}/>
                          </div>
                        </div >
                        <div >
                          <div onClick={() => alignWidth(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', width: '30px', height: '30px', border: '2px solid black', marginLeft: '6px', marginRight: '6px', marginTop: '5px'}}> w </div>
                        </div>
                    </div>
                    </div>
                  ):(
                    <div>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <img onClick={() => rmPhotoClick(index)}  key={index} src={item} alt={`Photo ${index + 1}`} style={{ width: '50px', height: 'auto', margin: '5px' }} />
                        <div style={{ width: '100%', padding: '5px'}}>
                          <div style={{display: 'flex'}}>
                            <Typography >{`Photo ${index+1}`}</Typography>
                            <div onClick={() => lessMoreClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '45px', height: '20px', border: '2px solid black', marginLeft: 'auto'}}>{`${lessMoreTable[pageNumber][index]}`}</div>
                            <div onClick={() => makeLayerUP(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black', marginLeft: '5px'}}>↑</div>
                            <div onClick={() => makeLayerDown(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black',  marginRight: '5px', marginLeft: '5px'}}>↓</div>
                            <div onClick={() => rmPhotoClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black'}}>×</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  
                </div>): item.startsWith("TYPOGRAPHY")?(
                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <div style={{marginTop: '5px', marginBottom: '5px', display: 'flex', flexDirection: 'column', width: '96%', border: '2px solid white', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                      <div style={{display: 'flex', marginTop: '10px', marginBottom: '10px'}}>

                        <Typography style={{marginLeft: '10px'}}>{getLayerTitle(layerTable[pageNumber][index])}</Typography>
                        <div onClick={() => lessMoreClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '45px', height: '20px', border: '2px solid black', marginLeft: 'auto'}}>{`${lessMoreTable[pageNumber][index]}`}</div>
                        <div onClick={() => makeLayerUP(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black', marginLeft: '5px'}}>↑</div>
                        <div onClick={() => makeLayerDown(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black',  marginRight: '5px', marginLeft: '5px'}}>↓</div>
                        <div onClick={() => rmPhotoClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black',  marginRight: '5px'}}>×</div>
                      
                      </div>
                      {lessMoreTable[pageNumber][index] !== 'Less' ? null : (
                        <div>
                        <div style={{display: 'flex'}}>
                          <TextField
                            id="outlined-required"
                            label="text"
                            defaultValue={item.split(".")[5]}
                            multiline
                            minRows={3}
                            maxRows={3}
                            style={{margin: '5px', marginRight: '10px', width: '90%'}}
                            onChange={(event) => editText(event.target.value, item, pageNumber, index, 5)}
                          />
                          <div style={{marginTop: '5px', marginRight: '5px'}}>
                            <div onClick={() => {item.split(".")[1] === "false" ? editText('true', item, pageNumber, index, 1) : editText('false', item, pageNumber, index, 1)}}  style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9px', width: '25px', height: '25px', border: '2px solid black', fontWeight: 'bold', userSelect: 'none'}}>B</div>
                            <div onClick={() => {item.split(".")[2] === "false" ? editText('true', item, pageNumber, index, 2) : editText('false', item, pageNumber, index, 2)}} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9px', width: '25px', height: '25px', border: '2px solid black', marginTop: '5px', fontStyle: 'italic', userSelect: 'none'}}>I</div>
                            <div onClick={() => {item.split(".")[3] === "false" ? editText('true', item, pageNumber, index, 3) : editText('false', item, pageNumber, index, 3)} } style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9px', width: '25px', height: '25px', border: '2px solid black', marginTop: '5px', textDecoration: 'underline', userSelect: 'none'}}>U</div>
                          </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', width: '100%',margin: '5px'}}>
                          <Typography>Font:</Typography>
                          <FormControl style={{width: '40%'}}>
                          <Select
                            labelId="font-select-label"
                            value={`${item.split(".")[6]}`}
                            onChange={(event) => {editText(event.target.value, item, pageNumber, index, 6)}}
                            style={{height: '30px', width: '150px'}}
                          >
                            {fonts.map((font) => (
                              <MenuItem key={font.name} value={font.value}>
                                {font.name}
                              </MenuItem>
                            ))}
                            </Select>
                          </FormControl>
                          <div style={{display: 'flex', alignItems: 'center', marginLeft: '25px'}}>
                            <Typography style={{marginLeft: '10px'}}>size:</Typography>
                            <div style={{display: 'flex',alignItems: 'center', width: '95px'}}>
                              <div onClick={() => {editText(parseInt(item.split(".")[4])-1, item, pageNumber, index, 4)}} style={{marginLeft: 'auto', cursor: 'pointer', userSelect: 'none', width: '25px', height: '25px', border: '2px solid black', borderRadius: '10px'}} >←</div>
                              <Typography style={{fontSize: '18px', marginTop: '3px', marginRight: '5px', marginLeft: '5px'}}>{`${item.split(".")[4]}`}</Typography>
                              <div onClick={() => {editText(parseInt(item.split(".")[4])+1, item, pageNumber, index, 4)}} style={{cursor: 'pointer', userSelect: 'none', width: '25px', height: '25px', border: '2px solid black', borderRadius: '10px'}} >→</div>
                            </div>
                          </div>
                        
                        </div>
                        <div>
                          <div style={{display: 'flex'}}>
                            <Typography style={{marginRight: '5px', marginLeft: '5px', marginTop: '3px'}}>X</Typography>
                            <Slider style={{width: '200px', marginLeft: '10px'}} value={xTable[pageNumber][index] || 0} onChange={(event, value) => handleXSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={originalPageWidth}/>
                            <Typography style={{marginTop: '3px'}} >{`${xTable[pageNumber][index]}`}</Typography>
                          </div>
                          <div style={{display: 'flex', marginLeft: '5px'}}>
                            <Typography style={{marginRight: '5px'}}>Y</Typography>
                            <Slider style={{width: '200px', marginLeft: '10px'}} value={yTable[pageNumber][index] || 0} onChange={(event, value) => handleYSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={originalPageHeight}/>
                            <Typography style={{marginTop: '3px'}}>{`${yTable[pageNumber][index]}`}</Typography>
                          </div>
                        <div style={{display: 'flex'}}>
                          <Typography style={{marginLeft: '5px', marginBottom: '5px'}}>Color: </Typography>
                          <div onClick={() => handleColorPickerVisibility(index)} style={{width: '15px', height: '15px', backgroundColor: `${textColor[pageNumber][index]}`, marginTop: '5px', marginLeft: '5px'}}></div>
                          {showLayerPicker[pageNumber][index] === true ? (
                            <ChromePicker
                            color={textColor[pageNumber][index]}
                            onChangeComplete={(color) => setSingleColorText(color.hex, index)}
                          />
                          ) : (<div></div>)}
                          </div>
                        </div>
                        
                      </div>
                      )}
                      
                      
                  </div>
                    
                </div>
                  
                ) : (<div></div>)
                
              ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => shareAlbumData()}
            >Share</Button>
            <Button
              onClick={() => getSharedData(album_id)}
            >get shared data</Button>
          </div>
        )}
      </div>

      <div style={{ background: `linear-gradient(120deg, #caf0f8, #caf0f8)`, padding: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'auto', overflowY: 'auto' }}>
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray', position: 'absolute', left: '60%', bottom: '0', height: '60px', width: '400px'}}>
            <Button onClick={() => { zoomOut() }}><ZoomOutIcon/></Button>
            <Typography style={{marginLeft: '10px', marginRight: '10px'}}>{`${zoom}%`}</Typography>
            <Button onClick={() => { zoomIn() }}><ZoomInIcon/></Button>
            <Button style={{width: '10px'}} onClick={() => {setRealPageNumber(pageNumber, -1)}}>◀</Button>
            <Typography>{`Page: ${pageNumber}/${allPageNumber}`}</Typography>
            <Button style={{width: '10px'}} onClick={() => {setRealPageNumber(pageNumber, 1)}}>▶</Button>
          </div>
      </div>
    </div>
  );
};

export default Editor;