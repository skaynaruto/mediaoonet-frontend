import React, { Component } from 'react';
import { fetchSinglePost, removePost,likes,unlike, comment } from './apiPosts';
import DefaultPost from "../assets/DefaultPost.jpg"
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Redirect } from 'react-router-dom';
import Comment from './Comment';

class SinglePost extends Component {
    state = {
        post: "",
        redirectToPost:false,
        like:false,
        likes:0,
        redirectToSignin:false,
        comments:[]
    }
    checkLike = (likes)=>{
        const userId = isAuthenticated() &&  isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match
    }
    componentDidMount = () => {
        const postId = this.props.match.params.postId
        fetchSinglePost(postId).then((data) => {
            //console.log(data)
            if (data.error)
                console.log(data.error)
            else {
                this.setState({
                    post: data,
                    likes:data.likes.length,
                    like:this.checkLike(data.likes),
                    comments:data.comments
                })
            }

        })
    }
    deletePost = () => {
        const postId = this.props.match.params.postId;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        removePost(userId,postId,token)
        .then((data)=>{
            if(data.error) console.log(data.error)
            else{
                this.setState({
                    redirectToPost:true
                    
                })
            }

        })

    }
    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if (answer) {
            this.deletePost();
        }
    };

    likesToggle = ()=>{
        if(!isAuthenticated())
        {
            this.setState({
                redirectToSignin:true
            })
        }
        const postId = this.state.post._id;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        let callApi = this.state.like ? unlike : likes;
        callApi(userId,postId,token).then(data =>{
            //console.log(data)
            if(data.error) console.log(data.error)
            else{
                this.setState({
                    like:!this.state.like,
                    likes:data.likes.length
                })
            }
        })


    }
    updatecomments = comments =>{
        this.setState({
            comments
        })
    }
    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : "unknown";
        const { like, likes } = this.state;
        return (
            <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img
                        style={{ width: "auto", height: "300px", objectFit:"cover"}}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}post/photo/${post._id}`}
                        onError={i => (i.target.src = `${DefaultPost}`)}
                        alt={post.title}
                    />
                </div>
                {like ? ( <h3 onClick={this.likesToggle}> <i className='fa fa-thumbs-up text-success' style={{padding:'10px'}}/>
                    {likes}Like</h3>):( <h3 onClick={this.likesToggle}><i className='fa fa-thumbs-up text-warning' style={{padding:'10px'}}/>{likes}{" "}Like</h3>)}
               
                <div className="card-body">
                    <p className="card-title">{post.body}</p>
                    <br />
                    <p className="font-italic mark">
                        Posted by{" "}
                        <Link to={`${posterId}`}>
                            {posterName}{" "}
                        </Link>
                        on {new Date(post.created).toDateString()}
                    </p>
                    <Link  className="btn btn-raised btn-primary mr-5" to={"/"}>Back to Post</Link>
                    {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id ? (
                            <div className="d-inline-block">
                                <Link
                                    className="btn btn-raised btn-success mr-5"
                                    to={`post/edit/${post._id}`} 
                                >
                                    Edit post
                                </Link>
                                <button className="btn btn-raised btn-danger mr-5" onClick={this.deleteConfirmed}>Delete post</button>
                            </div>
                        ) :""}
                        <div>
                            {isAuthenticated() && isAuthenticated().user.role == 'admin' && (
                            <div className="card mt-5">
                                <div className="card-body">
                            <h5 className="card-title">Admin</h5>
                            <p className="mb-2 text-danger">Edit/Delete As Admin</p>
                            <Link to={`/post/edit/${post._id}`} className = 'btn btn-raised btn-success mr-5'>Edit User Post</Link>
                           <button onClick={this.deleteConfirmed} className = 'btn btn-raised btn-danger'>Delete User Post</button>
                            </div>
                            </div>
                            )}
                        </div>
                </div>
            </div>
        )
    }
    render() {
        const { post,redirectToPost,redirectToSignin,comments } = this.state;
        if(redirectToPost){
            return <Redirect to={`/user/${post.postedBy._id}`}/>
        }
        if(redirectToSignin){

            return <Redirect to={'/signin'}/>
        }
        return (
            <div className='container' style={{display:"flex" ,justifyContent:"center",flexDirection:"column"}}>
                <h2 className='display-2 mt-2 mb-5'>{post.title}</h2>
                {!post ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
            this.renderPost(post)
        )}
        <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updatecomments}/>
                
            </div>
        );
    }
}

export default SinglePost;
