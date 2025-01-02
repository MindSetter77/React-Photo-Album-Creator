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

  const [comments, setComments] = useState([]);

  // Pobieranie komentarzy po załadowaniu komponentu
  useEffect(() => {
    if (album_id) {
      fetchComments();
    }
  }, [album_id]);

  const handleCommentChange = (inputText) => {
    if(inputText.length < 201){
      setComment(inputText)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getComments?album_id=${album_id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);  // Ustawienie komentarzy w stanie
      } else {
        const errorMessage = await response.text();
        console.error('Błąd pobierania komentarzy:', errorMessage);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania komentarzy:', error);
    }
  };

  const sendBtnClick = async () => {
    
    // Sprawdzenie, czy comment nie jest pusty
    if (comment.length > 0) {
      // Sprawdzenie, czy album_id i user_id są zdefiniowane
      if (!album_id || !user.result || !user.result[0]?.id) {
        console.error("Brak wymaganych danych: album_id lub user_id");
        return;
      }
  
      const user_id = user.result[0].id;  // Pobranie user_id z odpowiedzi
      const nickname = user.result[0].nickname
      
      try {
        // Wysyłanie żądania do backendu
        const response = await fetch('http://localhost:3001/addComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id, album_id, comment, nickname }),  // Wysłanie danych w ciele żądania
        });
  
        if (response.ok) {
          console.log("Komentarz został dodany!");
          setComment('')
          fetchComments()
          
        } else {
          // Jeśli odpowiedź jest błędna, wypisz błąd
          const errorMessage = await response.text();  // Odczytanie komunikatu błędu
          console.error('Błąd dodawania komentarza:', errorMessage);
        }
      } catch (error) {
        // Obsługa błędów w przypadku problemów z zapytaniem
        console.error('Błąd podczas dodawania komentarza:', error);
      }
    } else {
      console.error("Komentarz jest pusty.");
    }
  };

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
            <div onClick={() => sendBtnClick()} style={{width: '90%', height: '30px', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', backgroundColor: 'black', borderRadius: '10px', alignContent: 'center', cursor: 'pointer'}} ><Typography style={{color: 'white'}}>Send</Typography></div>

            <div style={{ marginTop: '10px', padding: '10px', maxHeight: '600px', overflowY: 'auto' }}>
              {comments.length > 0 ? (
                comments.slice().reverse().map((comment, index) => (
                  <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    <Typography><strong>{comment.nickname}:</strong></Typography>
                    <Typography>{comment.comment}</Typography>
                    <Typography style={{ fontSize: '12px', color: 'gray' }}>{comment.comment_date.slice(0, 10)}</Typography>
                  </div>
                ))
              ) : (
                <Typography>Brak komentarzy do wyświetlenia.</Typography>
              )}
            </div>
        </div>
    </div>
    )
};

export default Comments;