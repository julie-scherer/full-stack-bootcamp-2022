import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Modal from './components/Modal';
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
    const [user, setUser] = useState([]);
    
    const getUser = async () => {
        const userToken = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${userToken}`)
        const response = await fetch("https://kekambas-blog.herokuapp.com/auth/me", {
            method: 'GET',
            headers: myHeaders
        })
        if (response.ok) {
            let data = await response.json();
            if (data.error) {
                console.log(data.error)
            } else {
                setUser(data);
                console.log(user);
            }
            return user
        }}

    const login = () => {
        setLoggedIn(true);
        getUser();
        console.log(user);
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
                            user={ loggedIn? user : null }
                            /> } >
                        <Route path={`post/:postid`} element={ <Post /> } /> 
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

            {loggedIn ? console.log(user) : ''}
        </>
    );
}

export default App;
