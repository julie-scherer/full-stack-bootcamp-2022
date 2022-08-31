import React from 'react';
import logo from './ct-logo.png';

export default function Logo() {
    return (
        <a className="navbar-brand" href="#">
            <div className='d-flex align-items-center '>
                <img src={logo} alt="" className="App-logo d-inline-block align-text-top" />
                <h1 className="mx-2 text-white display-6">Coding Temple</h1>
            </div>
        </a>
    )
}
