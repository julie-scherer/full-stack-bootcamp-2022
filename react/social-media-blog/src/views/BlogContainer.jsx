import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FeaturedBlog from '../components/blog/FeaturedBlog';
import BlogPosts from '../components/blog/BlogPosts';
import AddPost from '../components/blog/AddPost';
import Post from '../components/blog/Post';

export default function Blog({ loggedIn, flashMessage, posts, handleClick, onNewPost }) {
    <Routes>
            { posts.map((post) => 
                <Route path={`blog/post/${post.id}`} key={ post.id } >
                    <Post post={ post } key={ post.id } />
                </Route>
            )}
    </Routes>

    return (
        <>
            { loggedIn ? 
                <AddPost
                    onNewPost={ onNewPost }
                    flashMessage={ flashMessage }
                />
                : <FeaturedBlog /> 
            }
            
            <BlogPosts 
                loggedIn={ loggedIn }
                posts={ posts }
                handleClick={ handleClick }
            />

        </>
    )
}
