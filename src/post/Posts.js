import React from "react";
import { Link } from "react-router-dom";
import { fetchPost } from "./apiPosts";
import DefaultPost from "../assets/DefaultPost.jpg"

class Posts extends React.Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            page:1,
            loading:true
        }
    }
    loadPost = (page) =>{
        fetchPost(page)
        .then(data => {
            // console.log(data)
            this.setState({
                posts: data.posts,
                loading:false
            })
        })
    }
    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPost(this.state.page + number);
    };
 
    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPost(this.state.page - number);
    };
    componentDidMount() {
        this.loadPost(this.state.page)
    }
    renderPosts = (posts) => {
        return (

            <div className="column">
                {posts.map((post, i) => {
                    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                    const posterName = post.postedBy ? post.postedBy.name :"unknown";
                    
                    return (
                        <div key={i} className="card">
                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img
                  style={{width:"auto", height:"300px"}}
                  className="img-thumbnail"
                  src={`${ process.env.REACT_APP_API_URL}post/photo/${post._id}`}
                  onError={i => (i.target.src =`${DefaultPost}` )}
                  alt={post.title}
        />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-title">{post.body}</p>
                                <br/>
                                <p className="font-italic mark">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link className="" to={`/singlepost/${post._id}`}>View more....</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    render() {
        const { posts,page,loading } = this.state;
        return (
            <div className="container">
                {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          !posts.length ? (<h2>No more Posts</h2>):(<h2>Recent Posts</h2>))}
        
        {this.renderPosts(posts)}
        {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}
 
                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
        </div>
        );
    }
}
export default Posts;
