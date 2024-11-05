import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const FileDropzone = ({setImages, setUploadedFileCount, album_id}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (files) => {
    const jpgFiles = files.filter(file => file.type === 'image/jpeg');

    jpgFiles.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('album_id', album_id);
      // Wyświetlanie zawartości FormData
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded:', data);
        setImages(prevImages => [...prevImages, { name: file.name, url: URL.createObjectURL(file) }]);
        setUploadedFileCount(prevCount => prevCount + 1);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
    });
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      sx={{
        border: '2px dashed grey',
        padding: '20px',
        textAlign: 'center',
        width: '400px',
        borderRadius: '4px',
        backgroundColor: isDragOver ? '#e0f7fa' : '#f5f5f5',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <Typography variant="h6">
        {isDragOver ? 'Drop the files here ...' : 'Drag n drop some .jpg files here, or click to select files'}
      </Typography>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default FileDropzone;
