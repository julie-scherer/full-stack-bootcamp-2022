import ButtonCounter from './components/ButtonCounter';
import Navbar from "./components/Navbar";
// import Racers from './components/Racers';
import RacersClass from './components/RacersClass';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import AlertMessage from './components/AlertMessage';
import { useState } from 'react';
import Login from './components/Login';
import Blog from './components/Blog';

function App(props) {
    const now = new Date();
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration')) > now) ? true : false)

    const flashMessage = (message, category) => {
        setMessage(message);
        setCategory(category)
    }

    const login = () => {
        setLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        setLoggedIn(false)
        flashMessage('You have successfully logged out', 'success')

    }

    return (
        <>
            <Navbar name='Brian' city='Chicago' logout={logout} loggedIn={loggedIn} />
            <div className='container'>
                {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
                <Routes>
                    <Route path='/' element={<ButtonCounter />} />
                    <Route path='/standings' element={<RacersClass />} />
                    <Route path='/blog' element={<Blog loggedIn={loggedIn} />} />
                    <Route path='/register' element={<Register flashMessage={flashMessage}/>} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} login={login} />} />
                </Routes>
            </div>
        </>
    )
}

export default App;
