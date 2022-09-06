import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/authForms/SignUpForm';

export default function SignUp({ flashMessage }) {
    let navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.inputUsername.value;
        const email = e.target.inputEmail.value;
        const password = e.target.inputPassword.value;
        const confirmPassword = e.target.confirmPassword.value;
        
        if (password === confirmPassword) {
            console.log('passwords match!');
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            const response = await fetch('https://kekambas-blog.herokuapp.com/auth/users', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
            if (response.ok) {
                let data = await response.json();
                if (data.error){
                    console.error(data.error);
                } else {
                    console.log('user registered');
                    flashMessage('Your account has been created', 'success');
                    navigate('/signin');
                }
            }
        } else {
            flashMessage('Your passwords do not match', 'danger');
        }
    }

    return (
        <SignUpForm handleSubmit={ handleSubmit } />
    )
}