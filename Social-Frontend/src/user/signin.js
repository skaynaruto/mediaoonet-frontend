import React from "react";
import { Redirect } from "react-router-dom";
import Lottie from 'react-lottie';
import styled from 'styled-components';
import * as animationData from '../assets/loading.json'
import {signIn,authenticate} from "../auth/index"
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import GoogleLogin from "./GoogleLogin";
class signin extends React.Component{
    constructor(){
        super();
        this.state= {
            email:"",
            password:"",
            error:"",
            sucess:false,
            redirectToReferer:false,
            isStopped:false
        };
    }
    handleChange = (field) =>(event)=>{
        this.setState({
            error:"",
            sucess:false
        })
         this.setState({
             [field]:event.target.value
         });
    }
    handleSubmit = event =>{
        event.preventDefault();
        this.setState({
            isStopped:true
        })
        const {email,password} = this.state;
        const user = {
            email,password
        }
        // console.log(user);
        signIn(user).then((data=>{
            if(data.error)this.setState({error: data.error})
            else 
            authenticate(data,()=>{
                this.setState({redirectToReferer:true,sucess:true,isStopped:true})
            })
        }))
    }
    signinForm = (email,password,defaultOptions,isStopped)=>(
        <form>
                  
                   <div className="form-group">
                    <label className="text-muted">E-mail</label>
                    <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />

                   </div>
                   <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                   </div>
                <div style={{display:"flex",flexDirection:"row"}}>
                <button onClick={this.handleSubmit} className="btn btn-raised btn-primary" style={{width:"100px"}}>Submit</button>
                {isStopped ?(<Lottie options={defaultOptions} height={50} width={50}  marginRight={250} isStopped={isStopped}/>):""}
                </div>
                </form>
            
    )
    render(){
        const {email,password,error,sucess,redirectToReferer,isStopped} = this.state;
        if(redirectToReferer){
            return <Redirect to="/"/>
        }
        
       const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
       };
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>
                <hr/>
                <GoogleLogin/>
                <hr/>
                <div className="alert alert-danger" style={{display:error?"":"none"}}>{error}</div>
                <div className="alert alert-info" style={{display:sucess?"":"none"}}>Login Sucessful....</div>
                {this.signinForm(email,password,defaultOptions,isStopped)}
                <Link to='/forgot-password' className="btn btn-raised btn-danger">Forgot Password</Link>
            </div>
            
            
            );
}
}
export default signin;
