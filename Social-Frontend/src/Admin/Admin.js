import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Posts from '../post/Posts';
import User from '../user/User';

class Admin extends Component {
    state = {
        redirectToHome: false
    }
    componentDidMount(){
        if(isAuthenticated().user.role != 'admin')
        {
            this.setState({
                redirectToHome:true
            })
        }
    }

    render() {
        if(this.state.redirectToHome){
            return <Redirect to={'/'}/>
        }
        return (

            <div>
                <div className="jumbotron">
                    <p className="lead">Welcome Admin!</p>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Posts</h2>
                            <Posts/>
                            <hr/>
                        </div>
                        <div className="col-md-6">
                            <h2>Users</h2>
                            <User/>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;