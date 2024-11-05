import { GoogleLogout } from 'react-google-login'

const clientID = '886640315071-6465nnkplthi38gq0ca8o6j1fgdie9d1.apps.googleusercontent.com'

function Logout(){
    
    const onSuccess = () => {
        console.log("Log out succesfull!")
    }

    return(
        <div id='signOutButton'>
            <GoogleLogout
                clientId={clientID}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />

        </div>
    )
}

export default Logout;