import React, { Component } from 'react';
import { forgotPassword } from '../auth/index'

class ForgotPassword extends Component {
    state = {
        email: '',
        error: '',
        message: ''
    }
    forgotpassword = (e) => {
        e.preventDefault();
        this.setState({
            error:'',
            message:''
        })
        forgotPassword(this.state.email).then(data => {
            if (data.error) {
                console.log(data.error)
                this.setState({ error: data.error });
            }
            else {
                console.log(data.message)
                this.setState({
                    message: data.message

                })
            }
        })
    }
    render() {
        return (
            <div className='container'>
                 <h2 className="mt-5 mb-5">Ask for Password Reset</h2>

                  {this.state.message && (
                      <h4 className="bg-success">{this.state.message}</h4>
                  )}
                  {this.state.error && (
                      <h4 className="bg-warning">{this.state.error}</h4>
                   )}
                <form >
                    <div className="form-group mt-5">
                        <input className='form-control' type='email' placeholder='Enter your email address' name='email' value={this.state.email} onChange={e =>
                            this.setState({
                                email: e.target.value,
                                message: "",
                                error: ""
                            })}
                            autoFocus />
                        <button className="btn btn-raised btn-primary mt-2" onClick={this.forgotpassword}>send reset password link</button>
                        </div>
                </form>
                </div >
          
        );
    }
}

export default ForgotPassword;