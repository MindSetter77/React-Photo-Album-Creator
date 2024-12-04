import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';

import FileDropzone from '../../create-album/FileDropzone';

const PhotosPanel = ({photosOfPanel, getPhotoName, deletePhoto}) => {

  return (
    <div style={{ height: 'calc(100vh - 200px)', width: '95%', backgroundColor: 'white', border: '2px solid black', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', borderRadius: '12px', zIndex: 3, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden'}}>
    <div style={{ width: '100%', height: '30px', backgroundColor: 'black', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: 'white' }}>
        <div style={{ display: 'flex', color: 'white' }}>
            <Typography style={{ marginTop: '3px', marginLeft: '5px' }}>Photos</Typography>
        </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '100%', padding: '10px' }}>
        {photosOfPanel.length > 0 ? (
            photosOfPanel.filter(photoUrl => !photoUrl.includes('data.json')).map((photoUrl, index) => (
                <div key={photoUrl} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={photoUrl} alt={`Photo ${index + 1}`} style={{ width: '100px', height: 'auto', maxHeight: '65px', margin: '5px' }} />
                    <Typography>{getPhotoName(photoUrl)}</Typography>
                    <div onClick={() => deletePhoto(photoUrl)} style={{ marginRight: '10px', marginLeft: 'auto', cursor: 'pointer' }}>delete</div>
                </div>
            ))
        ) : (
            <p>No photos available</p>
        )}
    </div>
</div>



    )
};

export default PhotosPanel;