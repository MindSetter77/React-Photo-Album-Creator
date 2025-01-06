import React, { useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TuneIcon from '@mui/icons-material/Tune';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { ChromePicker } from 'react-color';
import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import ZoomInOutpanel from '../editor/editor-comp/ZoomInOutpanel';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import FileDropzone from '../create-album/FileDropzone';
import PageView from '../editor/editor-comp/PageView';
import { use } from 'react';
import Comments from './Comments';

const Viewer = ({user, setUser, choosenLanguage}) => {

  const { album_id } = useParams();

  const isEmptyObject = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

  useEffect(() => {
    fetchAlbumPhotos(album_id)
    getSharedData(album_id)
    getAlbumPrivacyStatus(album_id)
    getAllowedUsers(album_id)
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
    }
  };

  

  const fonts = [
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lora', value: 'Lora, serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Arial', value: 'Arial, sans-serif' },
  ];

  const [privacyStatus, setPrivacyStatus] = useState('')
  const [allowedUsers, setAllowedUsers] = useState('')

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

  const [onlyPhotosTable, setOnlyPhotosTable] = useState(() => {
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

  const zoom100 = () => {

    setPageHeight(originalPageHeight)
    setPageWidth(originalPageWidth)
    setZoom(100)

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

  const getAlbumPrivacyStatus = async(album_id) => {
    try{
      const response = await fetch(`http://localhost:3001/getPrivacyStatus/${album_id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPrivacyStatus(data[0].privacy)

    } catch (error) {
      console.error(`Error getting privacy: ${error}`)
    }
  }

  const getAllowedUsers = async(album_id) => {
    try{
      const response = await fetch(`http://localhost:3001/getAllowedUsers/${album_id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      setAllowedUsers(data[0].allowedUsers)
    } catch (error) {
      console.error(`Error getting privacy: ${error}`)
    }
  }

  const getAllowedUsersFromList = () => {
    const user_id = user.result[0].id

    let usersAllowed = allowedUsers.split(',')

    if(usersAllowed.includes(user_id.toString())) {
      return true
    } else {
      return false
    }
    
  }

  

  return (
  
    <div style={{ background: `linear-gradient(180deg,rgb(136, 196, 255),rgb(118, 186, 255))`, height: 'calc(100vh - 64px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {privacyStatus === 'private' && isEmptyObject(user)? (
            <div><Typography style={{fontSize: '20px'}}>You need to login to view the private album!</Typography></div>
          
          ) : privacyStatus === 'private' && !isEmptyObject(user) && !getAllowedUsersFromList() ? (<div><Typography style={{fontSize: '20px'}}>You are not allowed to view the album by the creator!</Typography></div>)

          : (privacyStatus === 'public') || (privacyStatus === 'private' && !isEmptyObject(user) && getAllowedUsersFromList()) ?(
            <div style={{display: 'flex'}}>
              <PageView layoutOnPage={layoutOnPage} setLayoutOnPage={setLayoutOnPage} colorPickerColor={colorPickerColor} pageWidth={pageWidth} pageHeight={pageHeight} layerTable={layerTable} pageNumber={pageNumber} xTable={xTable} zoom={zoom} yTable={yTable} widthTable={widthTable} textColor={textColor} onlyPhotosTable={onlyPhotosTable} onlyTextTable={onlyTextTable} rotateTable={rotateTable} borderTable={borderTable} shadowTable={shadowTable} setRealPageNumber={setRealPageNumber} allPageNumber={allPageNumber} setPageNumber={setPageNumber} zoom100={zoom100}/>
              <div style={{width: '300px', height: 'calc(100vh - 100px)', marginRight: '5px', marginLeft: '100px', position: 'absolute', right: 0, top: 70}}>
                <Comments user={user} album_id={album_id} layoutOnPage={layoutOnPage} setPageNumber={setPageNumber} allPageNumber={allPageNumber} setRealPageNumber={setRealPageNumber} pageNumber={pageNumber} layerTable={layerTable} choosenLanguage={choosenLanguage} />
                
              </div>
              
            </div>
          ) : (<div>Something went wrong</div>)}
          
          {(privacyStatus === 'public') || (privacyStatus === 'private' && !isEmptyObject(user) && getAllowedUsersFromList()) ?
            (<ZoomInOutpanel zoomOut={zoomOut} zoom={zoom} zoomIn={zoomIn} setRealPageNumber={setRealPageNumber} pageNumber={pageNumber} allPageNumber={allPageNumber} choosenLanguage={choosenLanguage} />):(null)
          }
          
      </div>
    )
};

export default Viewer;