import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AlertMessage from './components/AlertMessage';
import Blog from './views/BlogContainer';
import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Post from './components/blog/Post';

function App() {

    const now = new Date();
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration')) > now) ? true : false);
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://kekambas-blog.herokuapp.com/blog/posts")
        .then(response => response.json())
        .then(data => setPosts(data))
        }, []);

    const login = () => {
        setLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        setLoggedIn(false);
    }

    const flashMessage = (message, category) => {
        setMessage(message);
        setCategory(category);
    }

    return (
        <>
            <NavBar
                logout={ logout }
                loggedIn={ loggedIn }
            />

            <div className="container py-3">
                { message ?
                    <AlertMessage message={ message } category={ category } flashMessage={ flashMessage }/> 
                    : null }

                <Routes>
                    <Route
                        path='/'
                        element={ <Home /> }
                    />

                    <Route
                        path='blog'
                        element={ <Blog
                            loggedIn={ loggedIn }
                            flashMessage={ flashMessage }
                            posts={ posts }
                            onNewPost={ post => setPosts(currentPosts => [post, ...currentPosts]) } /> } >
                        { posts.map((post) => 
                        <Route
                            key={ post.id }
                            path={`post/${post.id}`}
                            element={ <Post post={ post } key={ post.id } /> } /> 
                        )}
                    </Route>

                    <Route
                        path='signin'
                        element={ <SignIn
                            login={ login }
                            flashMessage={ flashMessage } /> }
                    />

                    <Route
                        path='signup'
                        element={ <SignUp
                            flashMessage={ flashMessage } /> }
                    />

                </Routes>

            </div>

            <Footer />
        </>
    );
}

export default App;
