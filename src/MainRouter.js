import React from "react";
import { Route,Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import signin from "./user/signin";
import signUp from "./user/signUp";
import Updateprofile from "./user/Updateprofile";
import FindPeople from "./user/FindPeople";
import User from "./user/User";
import SinglePost from "./post/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";
import EditPost from "./post/EditPost";
import NewPost from "./post/NewPost";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from "./Admin/Admin";
import Deleteuser from "./user/Deleteuser";
const MainRouter = ()=>(
    <div>
        <Menu/>
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/admin' component={Admin}></Route>
            <Route exact path='/forgot-password' component={ForgotPassword}></Route>
            <Route exact path='/reset-password/:resetPasswordToken' component={ResetPassword}></Route>
            <PrivateRoute exact path='/post/createpost' component={NewPost}></PrivateRoute>
            <Route exact path='/singlepost/:postId' component={SinglePost}></Route>
            <PrivateRoute exact path='/post/edit/:postId' component={EditPost}></PrivateRoute>
            <Route exact path='/user' component={User}></Route>
            <Route exact path='/signup' component={signUp}></Route>
            <Route exact path='/signin' component={signin}></Route>
            <PrivateRoute exact path='/user/:userId' component={Profile}></PrivateRoute>
            <PrivateRoute exact path='/findpeople' component={FindPeople}></PrivateRoute>
            <PrivateRoute exact path='/user/:userId/update' component={Updateprofile}></PrivateRoute>
        </Switch>
    </div>
);
export default MainRouter;