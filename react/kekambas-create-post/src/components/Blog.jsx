import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogPosts from './BlogPosts';
import CreateBlogPost from "./CreateBlogPost";


export default function Blog(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/posts")
        .then(response => response.json()
        .then(data => {
            setPosts(data);
        }));
    }, []);

    return (
        <>
            {
                props.loggedIn ? 
                    <CreateBlogPost 
                        loggedIn={props.loggedIn} 
                        posts={posts} 
                        setPosts={setPosts} 
                        onNewPost={post => setPosts(currentPosts => [post, ...currentPosts])}
                        /> 
                : 
                    <div className='border p-4 m-3 bg-light'>
                        <div className="jumbotron">
                            <h1 className="display-4">Create your account today!</h1>
                            <p className="lead">After creating an account, you will be able to create, edit, and share your blog posts with the rest of the community.</p>
                            <Link className="btn btn-primary btn-lg" to="/register">Register</Link>
                            <hr className="my-4" />
                            <p className="fw-light fst-italics">Already have an account?</p>
                            <p className="lead">
                                <Link className="btn btn-primary btn-lg" to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
            }

            <BlogPosts 
                posts={posts} 
                />
        </>
    )
}
