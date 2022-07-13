import React from "react";
import {follow,unFollow} from "./apiUser"
class FollowProfileButton extends React.Component{
    followClick = ()=>{
        this.props.onButtonClick(follow)
    }
    unfollowClick = ()=>{
        this.props.onButtonClick(unFollow)
    }
    render(){
        return(
            <div className="d-inlinne-block" style={{display:"flex"}}>
                {!this.props.following?(<button className="btn btn-success btn-raised mr-5" onClick = {this.followClick}>follow</button>): (<button onClick = {this.unfollowClick} className="btn btn-warning btn-raised" style={{backgroundColor:"blue"}}>unfollow</button>)}
            </div>
        )
    }
}
export default FollowProfileButton;