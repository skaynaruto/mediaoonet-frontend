import React, { Component } from 'react';
import { resetPassword} from '../auth/index'

class ResetPassword extends Component {
    constructor(props){
        super(props)
    this.state = {
        newPassword: '',
        error: '',
        message: ''
    }
}

    resetpassword = (e) => {
        e.preventDefault();
        this.setState({
            error:'',
            message:''
        })
        resetPassword({
           newPassword: this.state.newPassword,
           resetPasswordLink: this.props.match.params.resetPasswordToken
        }).then(data => {
            if (data.error) {
                console.log(data.error)
                this.setState({ error: data.error });
            }
            else {
                //console.log(data.message)
                this.setState({
                    message: data.message,
                    newPassowrd:""

                })
            }
        })
    }
    render() {
        return (
            <div className='container'>
                 <h2 className="mt-5 mb-5">Reset Your Password</h2>

                  {this.state.message && (
                      <h4 className="bg-success">{this.state.message}</h4>
                  )}
                  {this.state.error && (
                      <h4 className="bg-warning">{this.state.error}</h4>
                   )}
                <form >
                    <div className="form-group mt-5">
                        <input  type="password" className='form-control' placeholder='Enter new password' value={this.state.newPassword} name="newPassword" onChange={ e =>{
                            this.setState({
                                newPassword: e.target.value,
                                error:"",
                                message:""
                            })
                            
                        }}/>
                        <button className="btn btn-raised btn-primary mt-2" onClick={this.resetpassword}>Update Passowrd</button>
                        </div>
                </form>
                </div >
          
        );
    }
}

export default ResetPassword;