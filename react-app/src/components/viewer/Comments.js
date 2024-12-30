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

const Comments = ({user, album_id}) => {

    //COMMENT

  const [comment, setComment] = useState('')

  const handleCommentChange = (inputText) => {
    if(inputText.length < 201){
      setComment(inputText)
    }
  }

  const sendBtnClick = async() => {
    console.log(user)

    
  }

  return (
  
    <div>
        <div style={{border: '2px solid black', height: 'calc(100vh - 100px)', borderRadius: '15px', overflow: 'hidden'}}>
                <Typography style={{backgroundColor: 'black', color: 'white'}}>Comments </Typography>
                <TextField
                    label={`${comment.length}/200`}
                    variant="outlined"
                    multiline
                    onChange={(event) => handleCommentChange(event.target.value)}
                    value={comment}
                    rows={4} // Liczba wierszy w pionie
                    fullWidth
                    InputProps={{ style: { whiteSpace: 'nowrap', overflowX: 'auto' } }}
                    style={{width: '90%', marginTop: '15px'}}
                />
            <div onClick={() => sendBtnClick()} style={{width: '90%', height: '30px', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', backgroundColor: 'black', borderRadius: '10px', alignContent: 'center', cursor: 'pointer'}} ><Typography style={{color: 'white'}}>Send</Typography></div>
        </div>
    </div>
    )
};

export default Comments;