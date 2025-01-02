import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import Home from './components/Home/Home';
import Creator from './components/create-album/Creator'
import Editor from './components/editor/editor';
import Albums from './components/Albums';
import { createTheme } from '@mui/material/styles';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Viewer from './components/viewer/Viewer';
import Tester from './components/viewer/Tester';

function App() {
  const [user, setUser] = useState({});
  const [choosenAlbum, setChoosenAlbum] = useState("asd")
  const [dataOnline, setDataOnline] = useState(true)

  //<Route path="/viewer:album_id" element={<Viewer user={user} album_id={choosenAlbum}/>} />
  

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={user} dataOnline={dataOnline} setDataOnline={setDataOnline}/>

        <Routes>
          <Route path="/" element={<Home currentUser={user} setUser={setUser} />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/login" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile currentUser={user} setChoosenAlbum={setChoosenAlbum} />} />
          <Route path="/creator" element={<Creator user={user} />} />
          <Route path="/create-album" element={<Creator user={user}/>} />
          <Route path="/editor" element={<Editor user={user} album_id={choosenAlbum} setDataOnline={setDataOnline}/>} />
          <Route path="/viewer/:album_id" element={<Viewer user={user}/>} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
