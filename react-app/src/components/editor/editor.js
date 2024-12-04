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
import LayoutPanel from './editor-comp/LayoutPanel';
import ZoomInOutpanel from './editor-comp/ZoomInOutpanel';
import PageView from './editor-comp/PageView';
import Layers from './editor-comp/Layers';

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

    printTables()
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

      setLayoutOnPage("None")
    }
  }

  const typographyChooseClick = () => {

    let obj = "TYPOGRAPHY.false.false.false.40.napis.Roboto, sans-serif"

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
    shadowTableCpy[pageNumber].unshift(5)
    setShadowTable(shadowTableCpy)
  }

  const rmPhotoClick = (index) => {

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
      setLayoutOnPage("None")
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

    let indexInOnlyPhotos = onlyPhotosTable[pageNumber].indexOf(photoUrl)
    console.log(indexInOnlyPhotos)
    console.log(onlyPhotosTable[pageNumber].length)

    if(indexInOnlyPhotos !== -1){
      let onlyPhotosTableCpy = [...onlyPhotosTable]
      onlyPhotosTableCpy[pageNumber].splice(indexInOnlyPhotos, 1)
      setOnlyPhotosTable(onlyPhotosTableCpy)
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

    console.log(`onlyPhotosTable: ${onlyPhotosTable}`)


    console.log("rotate table:")
    console.log(rotateTable)

    console.log(`border table:`)
    console.log(borderTable)


    
    console.log("Shadow Table")
    console.log(shadowTable)
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
        zoom: zoom,
        onlyPhotos: onlyPhotosTable,
        onlyText: onlyTextTable
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
      console.log(data.onlyText)
      setOnlyTextTable(data.onlyText)

      
    } catch (error) {
      console.error('Error fetching shared data:', error);
    }
  };

  const setBackgroundColor = (color) => {
    console.log(color)
    setColorPickerColor(color)
  }


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
              <div style={{marginLeft: '20%'}}>
              <div style={{width: '70%', border: '1px solid black', borderTopLeftRadius: '13px', borderTopRightRadius: '13px', overflow: 'hidden'}}><div onClick={() => setChangeBackground(false)} style={{height: '100%', width: '100%', cursor: 'pointer'}}>close</div>
                <ChromePicker
                  color={colorPickerColor}
                  onChangeComplete={(color) => setBackgroundColor(color.hex)}
                />
              </div> 
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
            <Typography style={{padding: '5px', fontSize: '15px'}}>{`Layout: ${layoutOnPage[pageNumber]}`}</Typography>
            <div style={{ width: '95%', borderRadius: '15px', border: '2px solid white', overflow: 'hidden',  marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ height: '25px', width: '100%', backgroundColor: 'white', zIndex: 10, display: 'flex' }}>
                <Typography style={{ marginLeft: '5px', width: '100%' }}>Choose photo</Typography>
              </div>
              <div style={{ flexDirection: 'column', display: 'flex', overflowX: 'auto', overflowY: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                
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
            <Typography style={{padding: '5px'}}>{layoutOnPage[pageNumber]==="o" ? 'Layers' : `Layers (layout: ${layoutOnPage[pageNumber]})`}</Typography>
            
            
            <Layers layerTable = {layerTable} pageNumber = {pageNumber} lessMoreTable = {lessMoreTable} rmPhotoClick = {rmPhotoClick} lessMoreClick = {lessMoreClick} makeLayerUP = {makeLayerUP} makeLayerDown = {makeLayerDown} handleWidthSliderChange = {handleWidthSliderChange} xTable = {xTable} originalPageWidth = {originalPageWidth} handleXSliderChange = {handleXSliderChange} yTable = {yTable} originalPageHeight = {originalPageHeight} handleYSliderChange = {handleYSliderChange} alignWidth = {alignWidth} getLayerTitle = {getLayerTitle} editText = {editText} fonts = {fonts} handleColorPickerVisibility = {handleColorPickerVisibility} textColor = {textColor} showLayerPicker = {showLayerPicker} ChromePicker = {ChromePicker} setSingleColorText = {setSingleColorText} rotateTable={rotateTable} setRotateTable={setRotateTable} borderTable={borderTable} setBorderTable={setBorderTable} shadowTable={shadowTable} setShadowTable={setShadowTable}/>
            
            
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

      <div style={{ background: `linear-gradient(120deg, #caf0f8, #caf0f8)`, padding: '10px', width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'auto', overflowY: 'auto' }}>
          <PageView layoutOnPage={layoutOnPage} setLayoutOnPage={setLayoutOnPage} colorPickerColor={colorPickerColor} pageWidth={pageWidth} pageHeight={pageHeight} layerTable={layerTable} pageNumber={pageNumber} xTable={xTable} zoom={zoom} yTable={yTable} widthTable={widthTable} textColor={textColor} onlyPhotosTable={onlyPhotosTable} onlyTextTable={onlyTextTable} rotateTable={rotateTable} borderTable={borderTable} shadowTable={shadowTable}/>

          

          <ZoomInOutpanel zoomOut={zoomOut} zoom={zoom} zoomIn={zoomIn} setRealPageNumber={setRealPageNumber} pageNumber={pageNumber} allPageNumber={allPageNumber} />
      </div>
      <LayoutPanel layoutOnPage={layoutOnPage} setLayoutOnPage={setLayoutOnPage} layerTable={layerTable} pageNumber={pageNumber} originalPageWidth={originalPageWidth} originalPageHeight={originalPageHeight} onlyPhotosTable={onlyPhotosTable} setWidthTable={setWidthTable} widthTable={widthTable}/>
      
    </div>
  );
};

export default Editor;