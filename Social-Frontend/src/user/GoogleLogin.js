import React,{useEffect,useState} from 'react';
import jwtDecode from 'jwt-decode';
import { authenticate, socialLogin } from '../auth';
import { Redirect } from 'react-router-dom';

const GoogleLogin = () => {
   const [redirectToReferer,setState] = useState(false);
     function handleCallbackResponse(response){
        //console.log("Encountered response",response );
        var userObject = jwtDecode(response.credential);
        //console.log("Decoded response",userObject )
        const {aud,name,email,picture}  = userObject;
        const user = {
         password : aud,
         name: name,
         email: email,
         picture: picture 
        }
        console.log(user.picture);
        socialLogin(user).then(data =>{
         //console.log(data)
         if(data.error){
            console.log('Signin Error'+ data.error);
         }
         else{
            authenticate( data, () =>{
               setState(true)

            })
         }
        })

    }
    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
           client_id: "1031050820650-sombse69hqjhdk764ru91ahml6ppr2bl.apps.googleusercontent.com",
           callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
           document.getElementById("signIn"),
           {theme:"outline",size:"large"}
        )
         
      }, [])
      if(redirectToReferer){
         return <Redirect to={'/'}/>
      }
    return (
            <div className="container">
               <div id="signIn">Sign In with Google</div>
            </div>
        
    );
}

export default GoogleLogin;
