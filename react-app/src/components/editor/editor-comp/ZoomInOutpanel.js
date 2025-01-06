import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const ZoomInOutpanel = ({zoomOut, zoom, zoomIn, setRealPageNumber, pageNumber, allPageNumber, choosenLanguage  }) => {
  return (
  
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',borderRadius: '15px', border: '2px dotted black', backgroundColor: 'rgba(255, 255, 255, 0.5)', position: 'absolute', marginLeft: 'auto', marginRight: 'auto', bottom: '10px', height: '60px', width: '400px'}}>
        <Button onClick={() => { zoomOut() }}><ZoomOutIcon/></Button>
        <Typography style={{marginLeft: '10px', marginRight: '10px'}}>{`${zoom}%`}</Typography>
        <Button onClick={() => { zoomIn() }}><ZoomInIcon/></Button>
        <Button style={{width: '10px'}} onClick={() => {setRealPageNumber(pageNumber, -1)}}>◀</Button>
        {choosenLanguage == 'EN' ? (`Page: ${pageNumber}/${allPageNumber}`) : (`Strona: ${pageNumber}/${allPageNumber}`)}
        <Typography>{}</Typography>
        <Button style={{width: '10px'}} onClick={() => {setRealPageNumber(pageNumber, 1)}}>▶</Button>
    </div>
    )
};

export default ZoomInOutpanel;