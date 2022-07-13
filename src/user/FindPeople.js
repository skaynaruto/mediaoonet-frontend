import React from "react";
import { Link } from "react-router-dom";
import { findPeople, follow} from "./apiUser";
import DefaultProfile from "../assets/userAvater.png"
import { isAuthenticated } from "../auth";

class FindPeople extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            error:"",
            open:false
        }
    }
    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        findPeople(userId,token)
            .then(data => {
                //console.log(data)
                this.setState({
                    users: data
                })
            })
    }
    clickFollow = (user,i) =>{
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        follow(userId,token,user._id).then((data)=>{
            if(data.error){
                this.setState({error:data.error})
            }
            else{
               let toFollow = this.state.users;
               toFollow.splice(i,1);
               this.setState({
                   users:toFollow,
                   open:true,
                   followMessage:`Following ${user.name}`
               })
            }

        })

    }
    renderUser = (users) => (
        <div className="row">
            {users.map((user,i) =>(
        <div key={i} className="card" style={{marginRight:"10px"}}>
                <div className="bg-image hover-overlay ripple " data-mdb-ripple-color="light" style={{display:"flex",justifyContent:"center"}}>
                <img
                  style={{ borderRadius:"50%",border:"1px solid black", height: "200px", width: "200px" }}
                  className="img-thumbnail"
                  src={`${process.env.REACT_APP_API_URL
                  }/user/photo/${user._id}`}
                  onError={i => (i.target.src =`${DefaultProfile}` )}
                  alt={user.name}
        />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <Link  style={{marginLeft:"10px"}} className="btn btn-raised btn-info float-right btn-sm" to={`/user/${user._id}`}>View Profile</Link>
                    <button className="btn btn-raised btn-info float-left btn-sm"   onClick={() => this.clickFollow(user, i)}>Follow</button>
                </div>
        </div>
        ))}
        </div>
    )
    render() {
        const { users,open,followMessage } = this.state;
        return (
            <div className="container">
                <h5 className="text-primary">People you can follow</h5>
                
                {open && (
                    <div className="alert alert-success">{followMessage}</div>
                )}
                {this.renderUser(users)}
            </div>
        );
    }
}
export default FindPeople;
