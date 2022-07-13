import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../assets/userAvater.png'
import FindPeople from './FindPeople'
import DefaultPost from "../assets/DefaultPost.jpg"

class FollowTabs extends Component {
    render() {
        const { following, followers, postByUsers } = this.props;
        return (
            <div>
                <div>
                    <h3 className='text-primary'>Suggested User</h3>
                    <FindPeople />
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary">Followers</h3>
                        <hr />
                        {followers.map((person, i) =>
                        (
                            <div key={i}>
                                <Link to={`/user/${person._id}`}>
                                    <img className='float-left mr-2'
                                        style={{ borderRadius: "50%", border: "1px solid black" }}
                                        height={"30px"}
                                        width={"30px"}
                                        onError={i => (i.target.src = `${DefaultProfile}`)} src={`${process.env.REACT_APP_API_URL}user/photo/${person._id}`} alt={person.name} />
                                    <div>
                                        <p className='lead'>{person.name}</p>
                                    </div>
                                </Link>
                                <p style={{ clear: "both" }}>
                                    {person.about}
                                </p>
                            </div>
                        )
                        )}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Following</h3>
                        <hr />
                        {following.map((person, i) =>
                        (
                            <div key={i}>
                                <Link to={`/user/${person._id}`}>
                                    <img className='float-left mr-2'
                                        style={{ borderRadius: "50%", border: "1px solid black" }}
                                        height={"30px"}
                                        width={"30px"}
                                        onError={i => (i.target.src = `${DefaultProfile}`)} src={`${process.env.REACT_APP_API_URL}user/photo/${person._id}`} alt={person.name} />
                                    <div>
                                        <p className='lead'>{person.name}</p>
                                    </div>
                                </Link>
                            </div>
                        )

                        )}
                    </div>
                    <div className="col-md-4" >
                        <h3 className="text-primary">Posts</h3>
                        <hr />
                        {postByUsers.map((post, i) =>
                        (
                                <div key={i} className="row" style={{display:"flex",flexDirection:"row"}}>
                                    <Link to={`/singlepost/${post._id}`}>
                                        <img className='float-left mr-2'
                                            style={{}}
                                            height={"100px"}
                                            width={"100px"}
                                            onError={i => (i.target.src = `${DefaultPost}`)} src={`${process.env.REACT_APP_API_URL}post/photo/${post._id}`} alt={post.title} />
                                        <div>
                                            <p className='lead' >{post.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            
                        )

                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default FollowTabs;
