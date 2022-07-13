import React, { Component } from 'react';
import { comment, uncomment } from "./apiPosts";
import DefaultProfile from "../assets/userAvater.png"
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
class Comment extends Component {
    state ={
        text:"",
        error:""
    }
    handleChange = (event)=>{
        this.setState({
            text:event.target.value
        })

    }
    isValid = ()=>{
        if(!this.state.text >0 || this.state.text > 150)
        {
            this.setState({
                error:"Comment should not be empty and more than 150 character long "
            })
            return false
        }
        return true
    }
    deleteComment = (comment) => {
        const postId = this.props.postId;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        uncomment(userId,postId,token,comment)
        .then((data)=>{
            if(data.error) console.log(data.error)
            else{
                this.props.updateComments(data.comments);
                window.alert("Comment Deleted succesfully! ")
            }

        })

    }
    deleteConfirmed = (comment) => {
        let answer = window.confirm('Are you sure you want to delete your comment?');
        if (answer) {
            this.deleteComment(comment);
        }
    };
    addComment = e =>{
        e.preventDefault();
        if(!isAuthenticated()){
            this.setState({
                error:"Please signin to leave a comment"
            })
            return false
        }
        if(this.isValid()){
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;
            comment(userId, postId, token, { text: this.state.text }).then(
                data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        this.setState({ text: "", error:""});
                        // dispatch fresh list of coments to parent (SinglePost)
                        this.props.updateComments(data.comments);
                    }
    })
        }
}
    render() {
        const {comments} = this.props;

        return (
            <div>
                <h3 className="mt-5">Leave a Comment</h3>
                <form onSubmit={this.addComment}>
                    <div className="form-group">
                    <input type="text" onChange={this.handleChange} className="form-control" value={this.state.text} placeholder="Leave a comment"></input>
                    <button className="button btn btn-raised btn-success mt-2">Post</button>
                    </div>
                </form>
                <div className="alert alert-danger" style={{ display: this.state.error ? "" : "none" }}>{this.state.error}</div>
             
                <hr/>
                <div className="col-md-4">
                        <h3 className="text-primary">{comments.length}{" "}Comments</h3>
                        <hr />
                        {comments.map((comment, i) =>
                        (
                            <div key={i}>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img className='float-left mr-2'
                                        style={{ borderRadius: "50%", border: "1px solid black" }}
                                        height={"30px"}
                                        width={"30px"}
                                        onError={i => (i.target.src = `${DefaultProfile}`)} src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`} alt={comment.postedBy.name} />
                                    <div>
                                        <p className='lead'>{comment.postedBy.name}</p>
                                    </div>
                                </Link>
                                <div className='post-comment'>
                                <p className='post-text'>{comment.text}</p>
                                <p className='font-italic mark'>{new Date(comment.created).toDateString()} {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id ? (
                                <span className="text-danger float-right mr-1" style={{cursor:"pointer"}} onClick={()=>this.deleteConfirmed(comment)}>Remove</span>
                           
                        ) :""}</p>
                                
                                </div>
                            </div>
                        )

                        )}
                    </div>
            </div>
        );
    }
}

export default Comment;