import React from 'react';
import ctLogo from '../../static/ct-logo.png';

export default function SignUpForm({ handleSubmit }) {
    return (
        <div className="form-signin p-15 m-auto fw-400" style={{ width: 100 + '%', maxWidth: 760 + 'px' }}>
            <div className="row justify-content-center">
                <img className="mb-1" src={ctLogo} alt="" style={{ width: 130 + 'px', height: "auto" }} />
                <h1 className="mb-2 display-5 text-center">Sign up</h1>
                <small className='mb-4 text-muted text-center'>Create your first blog, connect with friends, and edit posts.</small>
            </div>
            <form onSubmit={ handleSubmit } className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputUsername" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" />
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            <small className='text-muted'>I'd like to keep up-to-date with my blog account and receive personalized marketing emails.</small>
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </div>
            </form>
            <p className='mt-3'>Already have an account? <a href="/signin">Sign in here!</a> </p>
        </div>
    )
}
