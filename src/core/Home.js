import React from "react";
import Posts from "../post/Posts";
const Home = () => (
    <div>
        <div className="jumbotran">
            <h2>Home</h2>
            <p className="lead">Welcome to React front END</p>

        </div>
            <div className="container">
                <Posts />
            </div>
    </div>
);
export default Home;