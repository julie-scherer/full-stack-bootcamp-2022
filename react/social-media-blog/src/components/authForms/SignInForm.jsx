import React from 'react';
import ctLogo from '../../static/ct-logo.png';

export default function SignInForm({ handleSubmit }) {
    return (
        <div className="form-signin p-15 m-auto fw-400" style={{ width: 100 + '%', maxWidth: 380 + 'px' }}>
            <form onSubmit={ handleSubmit }>
                <img className="mb-4" src={ctLogo} alt="" style={{ width: 75 + 'px', height: "auto" }} />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating my-1">
                    <input type="text" className="form-control" id="inputUsername" placeholder="Username" />
                    <label htmlFor="inputUsername">Username</label>
                </div>
                <div className="form-floating my-1 mb-3">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                    <label htmlFor="inputPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-primary" >Sign in</button>
            </form>
            <p className='mt-3'>Don't have an account? <a href="/signup">Sign up here!</a> </p>
        </div>
    )
}
