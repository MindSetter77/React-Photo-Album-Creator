import React from 'react';
import { GoogleLogin } from 'react-google-login';


const clientID = '886640315071-6465nnkplthi38gq0ca8o6j1fgdie9d1.apps.googleusercontent.com';

function Login({ setUser, setCurrentPage }) {

  const onSuccess = async (res) => {
    console.log('Login success google:', res);
    const { givenName, familyName, email } = res.profileObj;
      try {
          const response = await fetch('http://localhost:3001/google-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ givenName, familyName, email }),
          });
    
          if (response.ok) {
            const newUser = await response.json();
            console.log('User logged in front-end', newUser);
            setUser(newUser);
            setCurrentPage('home');
          } else {
            console.error('Error adding user to database:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding user to database:', error);
        }
  };

  const onFailure = (res) => {
    console.log('Login failed:', res);
  };

  return (
    <div id='signInButton'>
      <GoogleLogin
        clientId={clientID}
        buttonText='Login with Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;