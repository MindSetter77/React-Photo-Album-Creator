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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState({});

  

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home currentUser={user} setCurrentPage={setCurrentPage}/>;
      case 'albums':
        return <Albums/>
      case 'login':
        return <SignIn setCurrentPage={setCurrentPage} setUser={setUser} />;
      case 'signup':
        return <SignUp setCurrentPage={setCurrentPage}/>;
      case 'profile':
        return <UserProfile currentUser={user} setCurrentPage={setCurrentPage}/>
      case 'creator':
        return <Creator user={user} setCurrentPage={setCurrentPage}/>
      case 'editor':
        return <Editor user={user} />
      default:
        return <div>Home Page Content</div>;
    }
  };

  

  return (
    <div className="App">
      {(currentPage !== 'creator' && currentPage !== 'editor') && <Navbar setCurrentPage={setCurrentPage} currentUser={user} />}

      {renderPage()}
    </div>
  );
}

export default App;
