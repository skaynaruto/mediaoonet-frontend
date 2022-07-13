import React from "react";
import {signup} from "../auth/index"
import { Link } from "react-router-dom";
class signUp extends React.Component{
    constructor(){
        super();
        this.state= {
            name:"",
            email:"",
            password:"",
            error:"",
            about:"",
            sucess:false
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
        const {name,email,password,about} = this.state;
        const user = {
            name,email,password,about
        }
        // console.log(user);
        signup(user).then((data=>{
            if(data.error)this.setState({error: data.error})
            else 
            this.setState({
                error:"",
                name:"",
                email:"",
                password:"",
                about:"",
                sucess:true
            })
        }))
    }
    signupForm = (name,email,password,about)=>(
        <form>
                   <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={this.handleChange("name")} type="text" className="form-control"  value={name}/>
                   </div>
                   <div className="form-group">
                    <label className="text-muted">E-mail</label>
                    <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />

                   </div>
                   <div className="form-group">
                    <label className="text-muted">About</label>
                    <textarea onChange={this.handleChange("about")} type="text" className="form-control"  value={about}/>
                   </div>
                   <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                   </div>
                <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
    )
    render(){
        const {name,email,password,error,sucess,about} = this.state;
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{display:error?"":"none"}}>{error}</div>
                <div className="alert alert-info" style={{display:sucess?"":"none"}}>Account Created Sucessfully...Please<Link to='/signin'>Login</Link></div>
                {this.signupForm(name,email,password,about)}
            </div>
            

        );
    }
}
export default signUp;