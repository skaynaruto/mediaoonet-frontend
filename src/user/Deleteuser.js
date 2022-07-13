import React from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import { remove } from "./apiUser";
class Deleteuser extends React.Component{
     state = {
         redirect:false
        }
    deleteProfile = ()=>{
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId,token)
        .then(data=>{
            if(data.error) console.log(data.error)
            else{
                signout(()=>{
                    alert("Profile deleted sucessfully!")
                })
                this.setState({
                    redirect:true
                })
                
            }
        })
    }
    conform = ()=>{
        let answer = window.confirm("Are sure you want to delete profile?")
        if(answer){
            this.deleteProfile()
        }

    }
    render(){
        if(this.state.redirect){
            return <Redirect to={'/'}/>
        }
        return(
            <button className="btn btn-raised btn-danger" onClick={this.conform}>Delete Profile</button>
        )
    }
}
export default Deleteuser;