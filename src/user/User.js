import React from "react";
import { Link } from "react-router-dom";
import { readAlluser } from "./apiUser";
import DefaultProfile from "../assets/userAvater.png"


class User extends React.Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        readAlluser()
            .then(data => {
                this.setState({
                    users: data.user
                })
            })
    }
    renderUser = (users) => (
        <div className="row">
            {users.map((user,i) =>(
        <div key={i} className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img
                  style={{ borderRadius:"50%",border:"1px solid black", height: "200px", width: "200px" }}
                  className="img-thumbnail"
                  src={`${process.env.REACT_APP_API_URL}user/photo/${
                    user._id
                }`}
                  onError={i => (i.target.src =`${DefaultProfile}` )}
                  alt={user.name}
        />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-title">{user.email}</p>
                    <Link className="btn  btn-raised btn-primary" to={`/user/${user._id}`}>View Profile</Link>
                </div>
        </div>
        ))}
        </div>
    )
    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUser(users)}
            </div>
        );
    }
}
export default User;
