import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar( props ) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Welcome</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/blog">Blog</Link>
                        { props.loggedIn ? 
                            <Link className="nav-link" to="/" onClick={props.logout}>Logout</Link>
                        :
                            <>
                            <Link className="nav-link" to="/signin">Sign In</Link>
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}
