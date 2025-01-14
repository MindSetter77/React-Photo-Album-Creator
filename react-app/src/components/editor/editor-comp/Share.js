import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const Share = ({shareAlbumData, getSharedData, album_id, user, choosenLanguage}) => {
    useEffect(() => {
        getAllUsersList()
        getAllowedUsers(album_id)
    }, [])

    const [allUsers, setAllUsers] = useState([])
    const [allowedUsers, setAllowedUsers] = useState([])
    const [priv, setPriv] = useState('')

    const getAllUsersList = async() => {
        try{
            const response = await fetch(`http://localhost:3001/getAllusers`);
      
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            let list = data
            setAllUsers(list)
      
          } catch (error) {
            console.error(`Error getting privacy: ${error}`)
          }
    }

    const getAllowedUsers = async(album_id) => {
        try{
          const response = await fetch(`http://localhost:3001/getAllowedUsers/${album_id}`);
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          let usersStr = data[0].allowedUsers
          setAllowedUsers(usersStr.split(',').map(id => parseInt(id, 10))) // Zmieniamy na liczby
          setPriv(data[0].privacy)

        } catch (error) {
          console.error(`Error getting privacy: ${error}`)
        }
    }

    const updateAllowedUsersInDb = async(newAllowedUsers) => {
        const stringResult = newAllowedUsers.join(',');
        console.log(`STRING RESULT: ${stringResult}`)
        console.log(album_id)

        try {
            const response = await fetch('http://localhost:3001/updateAllowedUsers', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                album_id: album_id,
                allowedUsers: stringResult,
              }),
            });
        
            if (!response.ok) {
              throw new Error('Failed to update allowed users');
            }
        
            const data = await response.json();
            console.log('Update successful:', data.message);
          } catch (error) {
            console.error('Error updating allowed users:', error);
          }
    }

    const addOrDeleteUser = (id) => {
        
        if(user.result[0].id === id){return}

        if(allowedUsers.includes(id)){
            const updatedAllowedUsers = allowedUsers.filter(userId => userId !== id);
            updateAllowedUsersInDb(updatedAllowedUsers)
            setAllowedUsers(updatedAllowedUsers);
        } else {
            const updatedAllowedUsers = [...allowedUsers, id];
            updateAllowedUsersInDb(updatedAllowedUsers)
            setAllowedUsers(updatedAllowedUsers);
        }

    }

  return (
    <div>
        <div style={{  width: '95%', backgroundColor: 'white', border: '2px solid black', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', borderRadius: '12px', zIndex: 3, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden'}}>
            <div style={{ width: '100%', height: '30px', backgroundColor: 'black', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: 'white' }}>
                <div style={{ display: 'flex', color: 'white' }}>
                    <Typography style={{ marginTop: '3px', marginLeft: '5px' }}>{choosenLanguage == 'EN' ? (`Share`) : (`Udostępnij`)}</Typography>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '10px' }}>
                <div>
                    <TextField style={{display: 'flex', width: '95%', marginTop: '5px', marginLeft: 'auto', marginRight: 'auto'}} value={`localhost:3000/viewer/${album_id}`} disabled></TextField>
                    <div style={{marginTop: '10px'}}>
                        <Button style={{backgroundColor: 'white', marginRight: '10px', border: '2px solid black', borderRadius: '15px'}} onClick={() => shareAlbumData()}><Typography style={{fontWeight: 'bold'}}>{choosenLanguage == 'EN' ? (`Save changes`) : (`Zapisz zmiany`)}</Typography></Button>
                        <Button style={{backgroundColor: 'black', color: 'white', borderRadius: '15px'}} onClick={() => getSharedData(album_id)}><Typography style={{fontWeight: 'bold'}}>{choosenLanguage == 'EN' ? (`Fetch data`) : (`Przywróć zmiany`)}</Typography></Button>
                    </div>
                
                </div>
            </div>
        </div>

        {priv === 'public' ? (null) : (

        <div style={{  width: '95%', backgroundColor: 'white', border: '2px solid black', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', borderRadius: '12px', zIndex: 3, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden'}}>
            <div style={{ width: '100%', height: '30px', backgroundColor: 'black', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: 'white' }}>
                <div style={{ display: 'flex', color: 'white' }}>
                    <Typography style={{ marginTop: '3px', marginLeft: '5px' }}>{choosenLanguage == 'EN' ? (`Allowed users`) : (`Dozwoleni użytkownicy`)}</Typography>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '10px', overflowY: 'auto', height: '400px' }}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'left'}}>
                {allUsers.map((user) => (
                    <div key={user.id} style={{display: 'flex', background: allowedUsers.includes(user.id) ? 'green' : 'transparent'}}>
                        <p style={{marginLeft: '10px'}}>{user.id}. {user.firstName} {user.lastName}</p>
                        <p style={{cursor: 'pointer', marginLeft: 'auto', marginRight: '10px'}} onClick={() => addOrDeleteUser(user.id)} >{allowedUsers.includes(user.id) ? 'Remove' : 'Add'}</p>
                    </div>
                ))}
                
                </div>
            </div>
        </div>
        )}
    </div>
    )
};

export default Share;