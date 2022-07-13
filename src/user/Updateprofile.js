import React from "react";
import { read, update, updateUser } from "./apiUser"
import { isAuthenticated } from "../auth/index"
import { Redirect } from "react-router-dom";
import DefaultProfile from "../assets/userAvater.png"
require("../assets/style.css")
class Updateprofile extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            error: "",
            about:"",
            loading:false,
            sucess: false,
            fileSize: 0,
            redirectToProfile: false
        };
    }
    handleChange = (field) => (event) => {
        this.setState({error:""})
        const value = field === "photo" ? event.target.files[0] :event.target.value;
        const fileSize =  field === "photo" ? event.target.files[0].size : 0 ;
        this.userData.set(field,value);
        this.setState({
            [field]: value,
            fileSize : fileSize
        });
    }

    handleSubmit = event => {
        this.setState({
            loading:true
        })
        event.preventDefault();
        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            //console.log(this.userData)
            update(userId, token, this.userData).then((data => {
                if (data.error) this.setState({ error: data.error })
                else if (isAuthenticated().user.role == 'admin')
                {
                    this.setState({
                        redirectToProfile:true,
                        sucess:true
                    })
                }
                else
                updateUser(data,()=>{
                    this.setState({
                        redirectToProfile: true,
                        sucess: true
                    })
                })
                   
            }))

        }

    }
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                //console.log(JSON.stringify(data));
                if (data.error) {
                    this.setState({
                        redirectToProfile: true

                    })
                }
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error:"",
                    about:data.about

                })
                console.log(this.state)
            })
    }
    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId)
    }
    isValid = () => {
        const { name, email, password,fileSize } = this.state;
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (fileSize > 500000 ) {
            console.log(fileSize)
            this.setState({
                error: "File size is should less than 500kb",
                loading:false
            })
            return false
        }
        if (name.length === 0) {
            this.setState({
                error: "Name is required"
            })
            return false
        }
        if (!regex.test(email)) {
            this.setState({
                error: "Enter Valid Email"
            })
            return false
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Password must contain atleast 6 characters"
            })
            return false
        }
        return true

    }
    signupForm = (name, email, password,about) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <label className="custom-file-upload">
                <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control" />
          <i className="fa fa-cloud-upload" /> Attach
        </label>
               
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} type="text" className="form-control" value={name} />

            </div>
            <div className="form-group">
                <label className="text-muted">E-mail</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
             </div>
                   <div className="form-group">
                    <label className="text-muted">About</label>
                    <textarea onChange={this.handleChange("about")} type="text" className="form-control"  value={about}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
            </div>
            <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Save</button>
        </form>
    )
    render() {
        const { redirectToProfile, id, name, email, password, error, sucess,loading,about } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }
        const photoUrl = id
        ? `${
            process.env.REACT_APP_API_URL
          }/user/photo/${id}?${new Date().getTime()}`
        : DefaultProfile;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit profile</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>{error}</div>
                {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        <img src={photoUrl} className="img-thumbnail" alt="Profile" onError={i => (i.target.src = `${DefaultProfile}`)} style={{ borderRadius:"50%" ,border:"1px solid black", width: "200px", height: "200px"}} />
                <div className="alert alert-info" style={{ display: sucess ? "" : "none" }}>Profile Updated sucessfully</div>
                {isAuthenticated().user.role == 'admin' || (isAuthenticated().user._id == id && this.signupForm(name, email, password,about) )}
               
            </div>


        );
    }
}
export default Updateprofile;