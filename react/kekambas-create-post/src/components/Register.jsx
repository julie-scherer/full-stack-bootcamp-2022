import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.password.value !==  e.target.confirmPass.value){
            props.flashMessage('Your passwords do not match', 'danger')
        } else {
            console.log('passwords match!')            
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            const response = await fetch('http://localhost:5000/api/users', {
                method : 'POST',
                headers : myHeaders,
                body : JSON.stringify({
                    username: e.target.username.value,
                    email: e.target.email.value,
                    password: e.target.password.value
                })
            })
            if (response.ok) {
                let data = await response.json();
                if (data.error){
                    console.error(data.error)
                } else {
                    props.flashMessage('You have successfully registered. Please login.', 'success')
                    navigate('/login')
                }
            }
        }
    }

    return (
        <>
            <h4 className="text-center">Register</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type='text' className='form-control' placeholder='Enter Email' name='email' />
                    <label htmlFor="username">Username</label>
                    <input type='text' className='form-control' placeholder='Enter Username' name='username' />
                    <label htmlFor="password">Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' name='password' />
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password Again' name='confirmPass' />

                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Register' />
                </div>
            </form>
        </>
    )
}
