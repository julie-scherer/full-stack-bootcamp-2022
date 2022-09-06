import React, { useState, useEffect } from 'react';
import FeaturedBlog from '../components/blog/FeaturedBlog';
import BlogPosts from '../components/blog/BlogPosts';
import AddPost from '../components/blog/AddPost';

export default function Blog(props) {
    let loggedIn = props.loggedIn;
    let flashMessage = props.flashMessage;

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        fetch("https://kekambas-blog.herokuapp.com/blog/posts")
        .then(response => response.json()
        .then(data => {
            setPosts(data);
        }));
    }, []);

    return (
        <>
            { loggedIn ? 
                <AddPost
                    onNewPost={ post => setPosts(currentPosts => [post, ...currentPosts]) }
                    flashMessage={ flashMessage }
                />
                : <FeaturedBlog /> 
            }
            
            <BlogPosts 
                loggedIn={ loggedIn }
                posts={ posts }
            />

        </>
    )
}
