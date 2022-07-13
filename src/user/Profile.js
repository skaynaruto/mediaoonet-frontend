import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read } from "./apiUser";
import userAvater from "../assets/userAvater.png"
import Deleteuser from "./Deleteuser";
import FollowProfileButton from "./FollowProfileButton";
import FollowTabs from "./FollowTabs";
import { postByuser } from "../post/apiPosts";

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: "",
            posts: []
        }
    }
    checkFollow = user => {
        const jwt = isAuthenticated();
        // console.log(jwt)
        // console.log(user.followers)
        const match = user.followers.find(follower => {
            // one id has many other ids (followers) and vice versa
            //console.log(jwt.user._id)
            return follower._id === jwt.user._id;
        });
        return match;
    };
    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId, token, this.state.user._id)
            .then(data => {
                //console.log(data)
                if (data.error) {
                    this.setState({ error: data.error })
                }
                else {
                    this.setState({
                        user: data,
                        following: !this.state.following
                    })
                }
            })
    }
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToSignin: true

                    })
                }
                else {
                    let following = this.checkFollow(data);
                    this.setState({ user: data, following });
                    this.loadPosts(data._id);

                }
            })
    }
    loadPosts = userId => {
        const token = isAuthenticated().token;
        postByuser(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    this.setState({
                        posts: data
                    })
                }
            })
    }
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId)
    }
    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId)
    }
    render() {
        const { created, _id, name, email, about, following, followers } = this.state.user;
        const { redirectToSignin, posts } = this.state;

        if (redirectToSignin) {
            return <Redirect to="/signin" />
        }
        const photoUrl = _id
            ? `${process.env.REACT_APP_API_URL
            }/user/photo/${_id}?${new Date().getTime()}`
            : userAvater;
        return (
            <div className="container">
                <h2 className="mt5 mb-5">Profile</h2>
                <div className="row">
                    <div className="mr-5">
                        <img src={photoUrl} className="img-thumbnail" alt="Profile" style={{
                            borderRadius: "50%", border: "1px solid black", width: "200px", height: "200px"
                        }} />
                    </div>
                    <div className="col-md-6">
                        <div className="lead">
                            <p>{name}</p>
                            <p>{email}</p>
                            <p>Joined: {new Date(created).toDateString()}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id === _id ? (
                            <div className="d-inline-block">
                                <Link
                                    className="btn btn-raised btn-info mr-5"
                                    to={`/post/createpost`}
                                >
                                    Create Post
                                </Link>
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/${_id}/update`}>Edit profile</Link>
                                <Deleteuser userId={_id} />
                            </div>
                        ) : (<FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton} />)}
                        <div>
                            {isAuthenticated() && isAuthenticated().user.role == 'admin' && (
                            <div className="card mt-5">
                                <div className="card-body">
                            <h5 className="card-title">Admin</h5>
                            <p className="mb-2 text-danger">Edit/Delete As Admin</p>
                            <Link to={`/user/${_id}/update`} className = 'btn btn-raised btn-success mr-5'>Edit user Profile</Link>
                            <Deleteuser userId = {_id}/>
                            </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col md-6 mt-5">
                        <hr />
                        <p className="lead">{about}</p>
                        <hr />
                    </div>
                </div>
                <FollowTabs
                    following={following}
                    followers={followers}
                    postByUsers={posts}
                />
            </div>
        )
    }
}
export default Profile;
