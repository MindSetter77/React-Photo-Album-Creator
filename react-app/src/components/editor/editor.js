import React, { useEffect, useState, useRef } from 'react';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TuneIcon from '@mui/icons-material/Tune';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ChromePicker } from 'react-color';
import { Button, Typography, TextField,Box,  Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox, backdropClasses } from '@mui/material';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import FileDropzone from '../create-album/FileDropzone';
import LayoutPanel from './editor-comp/LayoutPanel';
import ZoomInOutpanel from './editor-comp/ZoomInOutpanel';
import PageView from './editor-comp/PageView';
import Layers from './editor-comp/Layers';
import InfoPanel from './editor-comp/InfoPanel';
import CustomizePanel from './editor-comp/CustomizePanel';
import PhotosPanel from './editor-comp/PhotosPanel';
import LayersPanel from './editor-comp/LayersPanel';
import Share from './editor-comp/Share';

import { useNavigate } from 'react-router-dom';

const Editor = ({ user, album_id, setDataOnline, choosenLanguage, setUser }) => {

  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbumPhotos(album_id)
    getSharedData(album_id)
    getUserFromCookie()
  }, [])

  const getUserFromCookie = async () => {
    try {
      // Pobranie todos
      const todosResponse = await fetch('http://localhost:3001/todos', {
        method: 'GET',
        credentials: 'include', // Ważne, aby wysłać ciasteczka
      });
      
      if (!todosResponse.ok) {
        console.log("NOT OK")
        throw new Error('Failed to fetch todos');
      }
      const todosData = await todosResponse.json();
      setUser(todosData)
    } catch (err) {
      navigate('/')
    }
  };

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

  const [pageHeight, setPageHeight] = useState((1754 / 10)*4); // A4 height in pixels
  const [pageWidth, setPageWidth] = useState((1240 / 10)*4); // A4 width in pixels
  const [zoom, setZoom] = useState(40);

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


  const [onlyPhotosTable, setOnlyPhotosTable] = useState(() => {
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

  const [rotateTable, setRotateTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });

  const [borderTable, setBorderTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });

  const [layoutOnPage, setLayoutOnPage] = useState([])

  const [onlyTextTable, setOnlyTextTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });

  const [panelShown, setPanelShown] = useState(true)

  const [shadowTable, setShadowTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });


  

  const fetchAlbumPhotos = async (albumId) => {
    try {
      const response = await fetch('http://localhost:3001/image-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ album_id: albumId }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();

      let new_data_table = []

      for(let i = 0; i < data.length; i++){
        new_data_table.push(data[i].url)
      }

      console.log(new_data_table)
      

      setPhotosOfPanel(new_data_table);
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

    setDataOnline(false)
  }; 

  const zoomOut = () => {
    const stepH = originalPageHeight / 10
    const stepW = originalPageWidth / 10
    setPageHeight(pageHeight - stepH)
    setPageWidth(pageWidth - stepW)
    setZoom(zoom - 10)

    printTables()
  }

  const zoomIn = () => {
    const stepH = originalPageHeight / 10
    const stepW = originalPageWidth / 10
    setPageHeight(pageHeight + stepH)
    setPageWidth(pageWidth + stepW)
    setZoom(zoom + 10)
  }

  

  const photoChooseClick = (url) => {

    if(!layerTable[pageNumber].includes(url)){
      const copyOfItems = [...layerTable];
      copyOfItems[pageNumber].unshift(url)
      setlayerTable(copyOfItems)

      const cpyW = [...widthTable]
      cpyW[pageNumber].unshift(100)
      setWidthTable(cpyW)

      const cpyX = [...xTable]
      cpyX[pageNumber].unshift(0)
      setXTable(cpyX)

      const cpyY = [...yTable]
      cpyY[pageNumber].unshift(0)
      setYTable(cpyY)

      const lessMoreTableCpy = [...lessMoreTable]
      lessMoreTable[pageNumber].unshift('More')
      setLessMoreTable(lessMoreTableCpy)

      const cpyOnlyPhotosTable = [...onlyPhotosTable]
      cpyOnlyPhotosTable[pageNumber].unshift(url)
      setOnlyPhotosTable(cpyOnlyPhotosTable)

      const cpyRotateTable = [...rotateTable]
      cpyRotateTable[pageNumber].unshift(0)
      setRotateTable(cpyRotateTable)
      
      const borderTableCpy = [...borderTable]
      borderTableCpy[pageNumber].unshift("None")
      setBorderTable(borderTableCpy)

      let shadowTableCpy = [...shadowTable]
      shadowTableCpy[pageNumber].unshift(0)
      setShadowTable(shadowTableCpy)

      let layoutOnPageCpy = [...layoutOnPage]
      layoutOnPageCpy[pageNumber] = "None"
      setLayoutOnPage(layoutOnPageCpy)

      setDataOnline(false)
    }
  }

  const typographyChooseClick = ( str) => {

    if(str===""){
      str="Text"
    }

    let obj = `TYPOGRAPHY.false.false.false.40.${str}.Roboto, sans-serif`

    const copyOfItems = [...layerTable];
    let index = copyOfItems[pageNumber].length
    copyOfItems[pageNumber].unshift(obj)
    setlayerTable(copyOfItems)

    const cpyW = [...widthTable]
    cpyW[pageNumber].unshift(100)
    setWidthTable(cpyW)

    const cpyX = [...xTable]
    cpyX[pageNumber].unshift(0)
    setXTable(cpyX)

    const cpyY = [...yTable]
    cpyY[pageNumber].unshift(0)
    setYTable(cpyY)


    let cpySLP = [...showLayerPicker]; // Kopia tablicy
    cpySLP[pageNumber].unshift(false); // Przykładowa wartość `false`
    setShowLayerPicker(cpySLP); // Aktualizacja stanu

    let textColorCpy = [...textColor]
    textColorCpy[pageNumber].unshift("#000000")
    setTextColor(textColorCpy)

    let lessMoreTableCpy = [...lessMoreTable]
    lessMoreTableCpy[pageNumber].unshift('More')
    setLessMoreTable(lessMoreTableCpy)

    let onlyTextTableCpy = [...onlyTextTable]
    onlyTextTableCpy[pageNumber].unshift(obj)
    setOnlyTextTable(onlyTextTableCpy)

    const cpyRotateTable = [...rotateTable]
    cpyRotateTable[pageNumber].unshift(0)
    setRotateTable(cpyRotateTable)
      
    const borderTableCpy = [...borderTable]
    borderTableCpy[pageNumber].unshift("None")
    setBorderTable(borderTableCpy)

    let shadowTableCpy = [...shadowTable]
    shadowTableCpy[pageNumber].unshift(0)
    setShadowTable(shadowTableCpy)

    setDataOnline(false)
  }

  const rmPhotoClick = (index) => {

    setDataOnline(false)

    const itemAtIndex = layerTable[pageNumber][index]

    if(itemAtIndex.startsWith("TYPOGRAPHY")){
      const indexInOTT = onlyTextTable[pageNumber].indexOf(itemAtIndex)
      let onlyTextTableCpy = [...onlyTextTable]
      onlyTextTableCpy[pageNumber].splice(indexInOTT, 1)
      setOnlyTextTable(onlyTextTableCpy)
    }

    if(itemAtIndex.startsWith('http')){
      let onlyPhotosTableCpy = [...onlyPhotosTable]
      let num = onlyPhotosTableCpy[pageNumber].indexOf(itemAtIndex)
      onlyPhotosTableCpy[pageNumber].splice(num, 1)
      
      
      let layoutOnPageCpy = [...layoutOnPage]
      layoutOnPageCpy[pageNumber] = 'None'
      setLayoutOnPage(layoutOnPageCpy)


      setOnlyPhotosTable(onlyPhotosTableCpy)
    }

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

    let rotateCpy = [...rotateTable]
    rotateCpy[pageNumber].splice(index, 1)
    setRotateTable(rotateCpy)
      
    const borderTableCpy = [...borderTable]
    borderTableCpy[pageNumber].splice(index, 1)
    setBorderTable(borderTableCpy)

    let shadowTableCpy = [...shadowTable]
    shadowTableCpy[pageNumber].splice(index, 1)
    setShadowTable(shadowTableCpy)
  }

  const handleWidthSliderChange = (pageNumber, index, value) => {
    const copyOfItems = [...widthTable];
    copyOfItems[pageNumber][index] = value
    setWidthTable(copyOfItems)

    setDataOnline(false)
  }

  const handleXSliderChange = (pageNumber, index, value) => {
    const copyOfItems = [...xTable]
    copyOfItems[pageNumber][index] = value
    setXTable(copyOfItems)

    setDataOnline(false)
  }

  const handleYSliderChange = (pageNumber, index, value) => {
    const copyOfItems = [...yTable]
    copyOfItems[pageNumber][index] = value
    setYTable(copyOfItems)

    setDataOnline(false)
  }

  const editText = (value, item, pageNumber, index, textIdx) => {
    let copyOfItems = [...layerTable]
    let text = copyOfItems[pageNumber][index]
    text = text.split(".")
    text[textIdx] = value
    let valueToSave = `${text[0]}.${text[1]}.${text[2]}.${text[3]}.${text[4]}.${text[5]}.${text[6]}`
    copyOfItems[pageNumber][index] = valueToSave
    setlayerTable(copyOfItems)

    setDataOnline(false)
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

      let rotCpy = [...rotateTable]
      let movedR = rotCpy[pageNumber][index]
      let movedD = rotCpy[pageNumber][index-1]
      rotCpy[pageNumber][index-1] = movedR
      rotCpy[pageNumber][index] = movedD
      setRotateTable(rotCpy)

      let borderTableCpy = [...borderTable]
      let movedB = borderTableCpy[pageNumber][index]
      let downB = borderTableCpy[pageNumber][index-1]
      borderTableCpy[pageNumber][index-1] = movedB
      borderTableCpy[pageNumber][index] = downB
      setBorderTable(borderTableCpy)




      let shadowTableCpy = [...shadowTable]
      let movedS = shadowTableCpy[pageNumber][index]
      let downS = shadowTableCpy[pageNumber][index-1]
      shadowTableCpy[pageNumber][index-1] = movedS
      shadowTableCpy[pageNumber][index] = downS
      setShadowTable(shadowTableCpy)

      //Sprawdzenie czy oba badane elementy to zdjęcia 
      if(movedLayer.startsWith('http') && downLayer.startsWith('http')){
        //Inicjalizacja tablicy
        let onlyPhotosTableCpy = [...onlyPhotosTable] 

        //pobranie indexu w tablicy

        const idxFirst = onlyPhotosTableCpy[pageNumber].indexOf(movedLayer) 
        const idxLast = onlyPhotosTableCpy[pageNumber].indexOf(downLayer)
        console.log(idxFirst)
        console.log(idxLast)

        //zamiana miejsc
        onlyPhotosTableCpy[pageNumber][idxFirst] = downLayer
        onlyPhotosTableCpy[pageNumber][idxLast] = movedLayer

        //zapis zmian
        setOnlyPhotosTable(onlyPhotosTableCpy)
      }
      setDataOnline(false)
      
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

      let rotCpy = [...rotateTable]
      let movedR = rotCpy[pageNumber][index]
      let movedD = rotCpy[pageNumber][index+1]
      rotCpy[pageNumber][index+1] = movedR
      rotCpy[pageNumber][index] = movedD
      setRotateTable(rotCpy)

      let borderTableCpy = [...borderTable]
      let movedB = borderTableCpy[pageNumber][index]
      let downB = borderTableCpy[pageNumber][index+1]
      borderTableCpy[pageNumber][index+1] = movedB
      borderTableCpy[pageNumber][index] = downB
      setBorderTable(borderTableCpy)




      let shadowTableCpy = [...shadowTable]
      let movedS = shadowTableCpy[pageNumber][index]
      let downS = shadowTableCpy[pageNumber][index+1]
      shadowTableCpy[pageNumber][index+1] = movedS
      shadowTableCpy[pageNumber][index] = downS
      setShadowTable(shadowTableCpy)
      
      //Sprawdzenie czy oba badane elementy to zdjęcia 
      if(movedLayer.startsWith('http') && downLayer.startsWith('http')){
        //Inicjalizacja tablicy
        let onlyPhotosTableCpy = [...onlyPhotosTable] 

        //pobranie indexu w tablicy

        const idxFirst = onlyPhotosTableCpy[pageNumber].indexOf(movedLayer) 
        const idxLast = onlyPhotosTableCpy[pageNumber].indexOf(downLayer)
        console.log(idxFirst)
        console.log(idxLast)

        //zamiana miejsc
        onlyPhotosTableCpy[pageNumber][idxFirst] = downLayer
        onlyPhotosTableCpy[pageNumber][idxLast] = movedLayer

        //zapis zmian
        setOnlyPhotosTable(onlyPhotosTableCpy)
      }
      setDataOnline(false)
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
    setDataOnline(false)

    let indexInOnlyPhotos = onlyPhotosTable[pageNumber].indexOf(photoUrl)

    if(indexInOnlyPhotos !== -1){
      let onlyPhotosTableCpy = [...onlyPhotosTable]
      onlyPhotosTableCpy[pageNumber].splice(indexInOnlyPhotos, 1)
      setOnlyPhotosTable(onlyPhotosTableCpy)
    }
  };


  const printTables = () => {
    console.log('Print table start============================')
    console.log(`Layer table:`)
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

    console.log(`onlyPhotosTable: ${onlyPhotosTable}`)


    console.log("rotate table:")
    console.log(rotateTable)

    console.log(`border table:`)
    console.log(borderTable)


    
    console.log("Shadow Table")
    console.log(shadowTable)

    console.log('============================Print table finish')
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

      setDataOnline(false)
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

    setDataOnline(false)
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

  const setRealPageNumber = (officialPageNumber, value) => {
    

    if(value === 1){
      if(officialPageNumber<allPageNumber){
        officialPageNumber++
      }
    } else {
      if(officialPageNumber!==1){
        officialPageNumber--
      }
    }
    setPageNumber(officialPageNumber)

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
        zoom: zoom,
        onlyPhotos: onlyPhotosTable,
        onlyText: onlyTextTable,
        layoutOnPage: layoutOnPage,
        shadowTable: shadowTable,
        borderTable: borderTable,
        rotateTable: rotateTable
    };
    const jsonString = JSON.stringify(jsonData, null, 2); // `null, 2` dodaje wcięcia dla czytelności

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
      setOnlyPhotosTable(data.onlyPhotos)
      
      setOnlyTextTable(data.onlyText)

      setLayoutOnPage(data.layoutOnPage)
      setShadowTable(data.shadowTable)
      setBorderTable(data.borderTable)
      setRotateTable(rotateTable)

      
    } catch (error) {
      console.error('Error fetching shared data:', error);
    }
  };

  const setBackgroundColor = (color) => {
    console.log(color)
    setColorPickerColor(color)
  }

  const getPanelName = () => {

    let return_text = ''

    switch (leftPanel) {
      case 'info':
        if(choosenLanguage === 'EN'){
          return_text = 'Information'
        } else {
          return_text = 'Informacje'
        }
        break;

        case 'customize':
          if(choosenLanguage === 'EN'){
            return_text = 'Customisation'
          } else {
            return_text = 'Informacje'
          }
          break;
        case 'photos':
          if(choosenLanguage === 'EN'){
            return_text = 'Photos'
          } else {
            return_text = 'Zdjęcia'
          }
          break;

        case 'settings':
          if(choosenLanguage === 'EN'){
            return_text = 'Layers'
          } else {
            return_text = 'Warstwy'
          }
          break;

        case 'share':
          if(choosenLanguage === 'EN'){
            return_text = 'Share'
          } else {
            return_text = 'Udostępnij'
          }
          break;


        
    }

    return return_text
  }


  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      <div style={{display: 'flex', flexDirection: 'column', minWidth: '100px', maxWidth: '100px', height: '100%', backgroundColor: '#0d1520', boxShadow: '10px 0 15px 0 rgba(0, 0, 0, 0.2)', zIndex: 2 }}>

        <Box onClick={() => { setPanelShown(true); setLeftPanel('info'); }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', backgroundColor: leftPanel === 'info' ? '#2c3745' : 'transparent', borderRadius: '10px', cursor: 'pointer', margin: '10px auto', ':hover': {   backgroundColor: '#506278', }, }}>
          <ImportContactsIcon sx={{ fontSize: '40px', color: 'white' }} />
        </Box>

        <Box onClick={() => {setPanelShown(true); setLeftPanel('customize')}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', backgroundColor: leftPanel === 'customize' ? '#2c3745' : 'transparent', borderRadius: '10px', cursor: 'pointer', margin: '10px auto', ':hover': {   backgroundColor: '#506278', }, }}>
          <TuneIcon sx={{ fontSize: '40px', color: 'white' }} />
        </Box>

        <Box onClick={() => {setPanelShown(true); setLeftPanel('photos')}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', backgroundColor: leftPanel === 'photos' ? '#2c3745' : 'transparent', borderRadius: '10px', cursor: 'pointer', margin: '10px auto', ':hover': {   backgroundColor: '#506278', }, }}>
          <InsertPhotoIcon sx={{ fontSize: '40px', color: 'white' }} />
        </Box>

        <Box onClick={() => {setPanelShown(true);setLeftPanel('settings')}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', backgroundColor: leftPanel === 'settings' ? '#2c3745' : 'transparent', borderRadius: '10px', cursor: 'pointer', margin: '10px auto', ':hover': {   backgroundColor: '#506278', }, }}>
          <SettingsIcon sx={{ fontSize: '40px', color: 'white' }} />
        </Box>

        <Box onClick={() =>{setPanelShown(true); setLeftPanel('share')}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', backgroundColor: leftPanel === 'share' ? '#2c3745' : 'transparent', borderRadius: '10px', cursor: 'pointer', margin: '10px auto', ':hover': {   backgroundColor: '#506278', }, }}>
          <ShareIcon sx={{ fontSize: '40px', color: 'white' }} />
        </Box>
        
      </div>
      {panelShown === true ? (
        <div style={{ width: 'calc(100% - 300px)', height: '100%', maxWidth: '400px',  borderRight: '2px solid black', boxShadow: '10px 0px 15px rgba(0, 0, 0, 0.3)'}}>
        <div style={{display: 'flex', height: '80px', width: '100%', borderBottom: '2px solid gray', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', zIndex: 7, position: 'relative'}}>
          <div>
            <Box onClick={() => {setPanelShown(false); setLeftPanel('None')}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', backgroundColor: '#f5f5f5' , borderRadius: '10px', cursor: 'pointer', margin: '10px 10px', ':hover': {   backgroundColor: '#d5d2d2', }, }}>
              <ArrowBackIcon sx={{ fontSize: '40px' }} />
            </Box>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'left', flexDirection: 'column', marginLeft: '5px', marginTop: '10px' }}>
              <Typography style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'left'}}>{getPanelName()}</Typography>
              <Typography style={{ fontSize: '18px', color: 'gray' }}>{album_id}</Typography>
            </div>
          </div>
          
        </div>

        
        {leftPanel === 'info' ? (
          <InfoPanel/>
        ) : leftPanel === 'customize' ? (
          <CustomizePanel pageSize={pageSize} changePageSize={changePageSize} allPageNumber={allPageNumber} setAllPageNumber={setAllPageNumber} changeBackground={changeBackground} handleChangeBackground={handleChangeBackground} setChangeBackground={setChangeBackground} setBackgroundColor={setBackgroundColor} colorPickerColor={colorPickerColor} choosenLanguage={choosenLanguage} />
        ) : leftPanel === 'photos' ? (
          <PhotosPanel photosOfPanel={photosOfPanel} getPhotoName={getPhotoName} deletePhoto={deletePhoto} choosenLanguage={choosenLanguage} />

        ) : leftPanel === 'settings' ? (
          <LayersPanel setDataOnline={setDataOnline} pageNumber={pageNumber} layoutOnPage={layoutOnPage} photosOfPanel={photosOfPanel} photoChooseClick={photoChooseClick} getPhotoName={getPhotoName} typographyChooseClick={typographyChooseClick} layerTable={layerTable} lessMoreTable={lessMoreTable} lessMoreClick={lessMoreClick} makeLayerUP={makeLayerUP} makeLayerDown={makeLayerDown} handleWidthSliderChange={handleWidthSliderChange} rmPhotoClick={rmPhotoClick} xTable={xTable} originalPageWidth={originalPageWidth} handleXSliderChange={handleXSliderChange} yTable={yTable} originalPageHeight={originalPageHeight} handleYSliderChange={handleYSliderChange} alignWidth={alignWidth} getLayerTitle={getLayerTitle} editText={editText} fonts={fonts} handleColorPickerVisibility={handleColorPickerVisibility} textColor={textColor} showLayerPicker={showLayerPicker} setSingleColorText={setSingleColorText} rotateTable={rotateTable} setRotateTable={setRotateTable} borderTable={borderTable} setBorderTable={setBorderTable} shadowTable={shadowTable} setShadowTable={setShadowTable} choosenLanguage={choosenLanguage} />
        ) : (
          <div>
            <Share shareAlbumData={shareAlbumData} getSharedData={getSharedData} album_id={album_id} user={user} choosenLanguage={choosenLanguage} />
            
          </div>
        )}
      </div>
      ): null}
      

      <div style={{ background: `linear-gradient(90deg, #FFFFFF, #eae5e5)`, padding: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'auto', overflowY: 'auto' }}>
          <PageView layoutOnPage={layoutOnPage} setLayoutOnPage={setLayoutOnPage} colorPickerColor={colorPickerColor} pageWidth={pageWidth} pageHeight={pageHeight} layerTable={layerTable} pageNumber={pageNumber} xTable={xTable} zoom={zoom} yTable={yTable} widthTable={widthTable} textColor={textColor} onlyPhotosTable={onlyPhotosTable} onlyTextTable={onlyTextTable} rotateTable={rotateTable} borderTable={borderTable} shadowTable={shadowTable}/>

          

          <ZoomInOutpanel zoomOut={zoomOut} zoom={zoom} zoomIn={zoomIn} setRealPageNumber={setRealPageNumber} pageNumber={pageNumber} allPageNumber={allPageNumber} choosenLanguage={choosenLanguage} />
      </div>
      {layerTable[pageNumber].filter(item => typeof item === 'string' && item.startsWith('http')).length >= 1 ? (<LayoutPanel setDataOnline={setDataOnline} layoutOnPage={layoutOnPage} setLayoutOnPage={setLayoutOnPage} layerTable={layerTable} pageNumber={pageNumber} originalPageWidth={originalPageWidth} originalPageHeight={originalPageHeight} onlyPhotosTable={onlyPhotosTable} setWidthTable={setWidthTable} widthTable={widthTable} choosenLanguage={choosenLanguage} />) : (<div></div>) }
      
      
    </div>
  );
};

export default Editor;