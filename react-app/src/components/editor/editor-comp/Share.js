import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const Share = ({shareAlbumData, getSharedData, album_id}) => {
    
    

  return (
  
    <div style={{  width: '95%', backgroundColor: 'white', border: '2px solid black', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', borderRadius: '12px', zIndex: 3, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden'}}>
        <div style={{ width: '100%', height: '30px', backgroundColor: 'black', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: 'white' }}>
            <div style={{ display: 'flex', color: 'white' }}>
                <Typography style={{ marginTop: '3px', marginLeft: '5px' }}>Share</Typography>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '10px' }}>
            <div>
                <TextField style={{display: 'flex', width: '95%', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} value={`localhost:3000/view/${album_id}`} disabled></TextField>
                <div style={{marginTop: '10px'}}>
                    <Button style={{backgroundColor: 'white', marginRight: '10px', border: '2px solid black', borderRadius: '15px'}} onClick={() => shareAlbumData()}><Typography style={{fontWeight: 'bold'}}>Share</Typography></Button>
                    <Button style={{backgroundColor: 'black', color: 'white', borderRadius: '15px'}} onClick={() => getSharedData(album_id)}><Typography style={{fontWeight: 'bold'}}>Fetch data</Typography></Button>
                </div>
            
            </div>
        </div>
    </div>
    )
};

export default Share;