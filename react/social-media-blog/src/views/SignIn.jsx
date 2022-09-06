import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/authForms/SignInForm';

export default function SignIn( { login, flashMessage } ) {
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.inputUsername.value;
        const password = e.target.inputPassword.value;
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
        const response = await fetch('https://kekambas-blog.herokuapp.com/auth/token', {
            method : "POST",
            headers : myHeaders
        });

        if (response.ok){
            console.log("response worked!");
            let data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('expiration', data.token_expiration);
            login();
            console.log('logged in')
            flashMessage('You have successfully logged in', 'success');
            navigate('/');
        } else {
            console.log('username or password incorrect');
            flashMessage('Your username and/or password is incorrect', 'danger');
        }
    }

    return (
        <SignInForm handleSubmit={ handleSubmit } />
    )
}
