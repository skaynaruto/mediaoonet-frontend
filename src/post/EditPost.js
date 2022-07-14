import React, { Component } from 'react';
import { editPost } from './apiPosts';
import { isAuthenticated } from "../auth";
import { fetchSinglePost } from './apiPosts';
import { Link } from 'react-router-dom';
import DefaultPost from "../assets/DefaultPost.jpg"

class EditPost extends Component {
    constructor (){
        super()
        this.state = {
            id:'',
            body:"",
            title:'',
            redirectToPost:false,
            error:"",
            sucess:false,
            loading:false,
            fileSize:0

        }

    }
    handleChange = (field) => (event) => {
        this.setState({ error: "",sucess:false })
        const value = field === "photo" ? event.target.files[0] : event.target.value;
        const fileSize = field === "photo" ? event.target.files[0].size : 0;
        this.postData.set(field, value);
        this.setState({
            [field]: value,
            fileSize: fileSize
        });
    }

    handleSubmit = event => {
        this.setState({
            loading: true
        })
        event.preventDefault();
        if (this.isValid()) {
            const postId = this.props.match.params.postId;
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            console.log(this.postData)
            editPost(postId,userId,token, this.postData).then((data => {
                //console.log(data)
                if (data.error) this.setState({ error: data.error,loading:false })
                else
                {
                    this.setState({
                    body:"",
                    title:"",
                    error:"",
                    posimagetId:'',
                    loading:false,
                    redirectToPost:true,
                    sucess:true,
                   
                   
                    })
                }

            }))

        }

    }
    init = postId => {
        fetchSinglePost(postId)
            .then(data => {
                console.log(data);
                if (data.error) {
                    this.setState({
                        redirectToPost: true
                    })
                }
                else{
                this.setState({
                    id: data.postedBy._id,
                    posimagetId:data._id,
                    body: data.body,
                    title: data.title,
                    error:"",
                })
            }
            })
    }
    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId)
    }
    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 500000000) {
            //console.log(fileSize)
            this.setState({
                error: "File size is should less than 5mb",
                loading: false
            })
            return false
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({
                error: "All Fields are required",
                loading: false
            })
            return false
        }
        return true

    }
    editPostForm = (title,body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Edit Photo</label>
                <label className="custom-file-upload">
                    <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control" />
                    <i className="fa fa-cloud-upload" /> Attach
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={this.handleChange("title")} type="text" className="form-control" value={title} />

            </div>
            <div className="form-group">
                <label className="text-muted">Caption</label>
                <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={body} />
            </div>
            <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Update Post</button>
        </form>
    )
    render() {
        const { 
            id,
            title,
            posimagetId,
            body,
            error,
            loading,
            sucess } = this.state;
            const postUrl = id
            ? `${
                process.env.REACT_APP_API_URL
              }post/photo/${posimagetId}?${new Date().getTime()}`
            : DefaultPost
        // if (redirectToProfile) {
        //     return <Redirect to={`/user/${user.id}`} />
        // }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Post</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>{error}</div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : ""}
                <div className="alert alert-info" style={{ display: sucess ? "" : "none" }}>Post Updated sucessfully.<Link to={`/singlepost/${id}`}>Click here to see post</Link></div>
                 <img
                  style={{width:"auto", height:"300px"}}
                  className="img-thumbnail"
                  src={postUrl}
                  onError={i => (i.target.src =`${DefaultPost}` )}
                  alt={title}        />            
                  {(isAuthenticated().user._id === id) && this.editPostForm(title, body) }
                   {(isAuthenticated().user.role === 'admin') && this.editPostForm(title, body) }
            </div>
        );
    }
}

export default EditPost;
