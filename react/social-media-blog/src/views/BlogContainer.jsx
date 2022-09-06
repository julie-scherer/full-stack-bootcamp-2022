import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import FeaturedBlog from '../components/blog/FeaturedBlog';
import BlogPosts from '../components/blog/BlogPosts';
import AddPost from '../components/blog/AddPost';
import Post from '../components/blog/Post';

export default function Blog({ loggedIn, flashMessage, handleClick, user }) {
    const [posts, setPosts] = useState([]);
    // const onNewPost = { post => setPosts(currentPosts => [post, ...currentPosts]) }
    const addNewPost = post => setPosts(currentPosts => [post, ...currentPosts]);
    const deletePost = id => setPosts(posts.filter(post => post.id !== id));
    const editPost = post => setPosts(post => posts.splice(posts.indexOf(post.id), 0, post));

    useEffect(() => {
        fetch("https://kekambas-blog.herokuapp.com/blog/posts")
        .then(response => response.json())
        .then(data => setPosts(data))
        }, []);
        
    <Routes>
        { posts.map((post) => 
            <Route
                key={ post.id }
                path={`post/${post.id}`}
                element={ <Post post={ post } key={ post.id } /> } /> 
            )}
    </Routes>

    
    return (
        <>
            { loggedIn ? 
                <AddPost
                    flashMessage={ flashMessage }
                    addNewPost={ addNewPost }
                />
                : <FeaturedBlog /> 
            }
            
            <BlogPosts 
                loggedIn={ loggedIn }
                posts={ posts }
                setPosts={ setPosts }
                handleClick={ handleClick }
                user={ user }
                flashMessage={ flashMessage }
                editPost={ editPost }
                deletePost={ deletePost }
            />

        </>
    )
}
