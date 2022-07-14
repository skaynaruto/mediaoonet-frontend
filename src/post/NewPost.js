import React from "react";
import { createPost } from "./apiPosts"
import { isAuthenticated } from "../auth/index"
import { Redirect } from "react-router-dom";
import DefaultProfile from "../assets/userAvater.png"
require("../assets/style.css")
class NewPost extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            sucess:false
        };
    }
    handleChange = (field) => (event) => {
        this.setState({ error: "" })
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
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            createPost(userId, token, this.postData).then((data => {
                if (data.error) this.setState({ error: data.error })
                else
                {
                    this.setState({
                        title:data.title,
                        loading:false,
                        body:"",
                        title:"",
                        sucess:true
                    })
                }

            }))

        }

    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({
            user: isAuthenticated().user
        })
    }
    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 500000000) {
            console.log(fileSize)
            this.setState({
                error: "File size is should less than 5mb",
                loading: false
            })
            return false
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({
                error: "All Fields are required is required",
                loading: false
            })
            return false
        }
        return true

    }
    newPostForm = (title,body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Upload image</label>
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
            <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Create Post</button>
        </form>
    )
    render() {
        const { title,
            body,
            photo,
            error,
            user, loading,sucess } = this.state;
        // if (redirectToProfile) {
        //     return <Redirect to={`/user/${user.id}`} />
        // }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a New Post</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>{error}</div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}
                {/* <img src={photoUrl} className="img-thumbnail" alt="Profile" onError={i => (i.target.src = `${DefaultProfile}`)} style={{ borderRadius:"50%" ,border:"1px solid black", width: "200px", height: "200px"}} /> */}
                <div className="alert alert-info" style={{ display: sucess ? "" : "none" }}>Post Created Sucessfully</div>
                {this.newPostForm(title, body)}
            </div>


        );
    }
}
export default NewPost;
