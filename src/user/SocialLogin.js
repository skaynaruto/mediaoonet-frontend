// import React, { Component } from "react";

// import {useeffect} from 'react'
 
// class SocialLogin extends Component {

//     handleCallbackResponse = (response) =>{
//         console.log("Encountered response",response )
//     }
//     render() {
//         useEffect(() => {
//             /* global google*/
//             google.accounts.id.initialize({
//                clientId: "1031050820650-sombse69hqjhdk764ru91ahml6ppr2bl.apps.googleusercontent.com",
//                callback:handleCallbackResponse
//             });
//             google.accounts.id.renderButton(
//                document.getElementById("signIn"),
//                {theme:"outline",size:"large"}
//             )
             
//           }, []);
//         return (
//             <div className="container">
//                <div className="signIn">Sign In with Google</div>
//             </div>
//         );
//     }
// }
 
// export default SocialLogin;