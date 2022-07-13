import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
};
const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                        <Link className="nav-link" to={'/post/createpost'} style={isActive(history, "/post/createpost")}>create new post</Link>
                    </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/user')} to="/user">
                    Users
                </Link>
            </li>
            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                            Log in
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                            Signup
                        </Link>
                    </li>
                </>
            )}
            {isAuthenticated() &&(
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/findpeople'} style={isActive(history, "/findpeople")}>FindPeople</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)}>{`${isAuthenticated().user.name} profile`}</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={{ cursor: 'pointer' }}
                            onClick={() => signout(() => history.push('/'))}>
                            Sign out
                        </a>
                    </li>
                </>)}
                {isAuthenticated()&&isAuthenticated().user.role == 'admin' && (
                    <li className="nav=item">
                        <Link to={'/admin'} style = {isActive(history,`/admin`)} className = 'nav-link'>Admin</Link>
                    </li>
                )}
        </ul>
    </div>

);
export default withRouter(Menu);