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

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Comments = ({user, album_id, layoutOnPage, setPageNumber, allPageNumber, setRealPageNumber, pageNumber, layerTable, choosenLanguage }) => {

    //COMMENT

  const [isDownloading, setIsDownloading] = useState(false);

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

  //DOWNLOAD PDF

  const generatePDF = async () => {

    const element = document.getElementById(layoutOnPage[1]);
    const rect = element.getBoundingClientRect();
    const width = rect.width; // Szerokość elementu w px
    const height = rect.height; // Wysokość elementu w px

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [width, height], // Możesz dostosować rozmiar strony do swoich potrzeb
    });

    
  
    try {

      setPageNumber(1)
      //zoom100()

      const getArgument = (argument) =>{
              
        if(argument !== null && argument !== undefined){
          return argument
        } else { return 'None' }
      }
      
      for(let i = 1; i <= allPageNumber; i++){
        if(i == 1){
          setTimeout(async () => {

            await addPageToPdf(pdf, getArgument(layoutOnPage[i]));
            setPageNumber(2)

          }, i*1000);
        } else if(i == allPageNumber){
          setTimeout(async () => {
            
            pdf.addPage();
            await addPageToPdf(pdf, getArgument(layoutOnPage[i]));
            pdf.save('album.pdf')

          }, i*1000);
        } else {
          setTimeout(async () => {
            pdf.addPage();
            
            await addPageToPdf(pdf, getArgument(layoutOnPage[i]));
            setPageNumber(i+1)
          }, i*1000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const addPageToPdf = (pdf, elementId) => {
    const element = document.getElementById(elementId);

    if (!element) {
    console.error("Element not found:", elementId);  // Logowanie błędu, jeśli element nie istnieje
    return Promise.reject(`Element with id ${elementId} not found`);
  }
  
    return new Promise((resolve, reject) => {
      html2canvas(element, { scale: 2, useCORS: true })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
  
          pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
          resolve(); // Strona została dodana do PDF

        })
        .catch((error) => {
          reject(`Error generating page for ${elementId}: ${error}`);
        });
        
    });
    
  };
  
  
  

  const convertImageToBase64 = async (url) => {
    const response = await fetch(url, { mode: 'cors' });
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
  };

  const loadImagesAsBase64 = async () => {
      for (let i = 0; i < layerTable[pageNumber].length; i++) {
          const item = layerTable[pageNumber][i];
          if (item.slice(0, 10) !== 'TYPOGRAPHY') {
              layerTable[pageNumber][i] = await convertImageToBase64(item);
          }
      }
  };

  const handleDownload = async () => {

    if (isDownloading) return; // Zablokuj ponowne kliknięcie
  
    setIsDownloading(true); // Ustaw stan pobierania na true
    try {
      await loadImagesAsBase64();
      console.log('started');
      await generatePDF();
    } catch (error) {
      console.error('Błąd podczas pobierania:', error);
    } finally {
      setIsDownloading(false); // Przywróć stan przycisku
    }
  };



  return (
  
    <div>
      <div onClick={() => handleDownload()} style={{display: 'flex', alignItems: 'center', width: '98%', height: '30px', border: '2px solid black', borderRadius: '12px', marginBottom: '10px', marginTop: '5px', cursor: 'pointer', color: 'white'}}><Typography style={{marginLeft: 'auto', marginRight: 'auto', fontSize: '20px', color: 'black'}}>{choosenLanguage == 'EN' ? (`Download`) : (`Pobierz`)}</Typography></div>
        <div style={{border: '2px solid black', height: 'calc(100vh - 150px)', borderRadius: '15px', overflow: 'hidden', backgroundColor: 'rgb(163, 163, 163, 0.2)'}}>
                
                {user?.result?.[0]?.id !== undefined ? (
                  <div>
                    <Typography style={{backgroundColor: 'black', color: 'white'}}>{choosenLanguage == 'EN' ? (`Comments`) : (`Komentarze`)}</Typography>
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
                    <div onClick={() => sendBtnClick()} style={{width: '90%', height: '30px', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', backgroundColor: 'black', borderRadius: '10px', alignContent: 'center', cursor: 'pointer'}} ><Typography style={{color: 'white'}}>{choosenLanguage == 'EN' ? (`Send`) : (`Wyślij`)}</Typography></div>
                  </div>
                ):(
                  <div>
                    <Typography style={{backgroundColor: 'black', color: 'white'}}>{choosenLanguage == 'EN' ? (`Login to add comment!`) : (`Zaloguj aby dodać komentarz!`)}</Typography>
                  </div>
                )}

            <div style={{ marginTop: '10px', padding: '10px', maxHeight: '600px', overflowY: 'auto' }}>
              {comments.length > 0 ? (
                comments.slice().reverse().map((comment, index) => (
                  <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '5px' }}>
                    <Typography><strong>{comment.nickname}:</strong></Typography>
                    <Typography>{comment.comment}</Typography>
                    <Typography style={{ fontSize: '12px', color: 'gray' }}>{comment.comment_date.slice(0, 10)}</Typography>
                  </div>
                ))
              ) : (
                <Typography>{choosenLanguage == 'EN' ? (`No comments added.`) : (`Brak komentarzy do wyświetlenia.`)}</Typography>
              )}
            </div>
        </div>
    </div>
    )
};

export default Comments;