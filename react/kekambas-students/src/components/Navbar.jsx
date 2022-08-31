import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import './Nav.css';

export default function Navbar() {
    const [fact, setFact] = useState([]);

    useEffect(() => {
        fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)
        .then(res => res.json())
        .then(fact => {
            setFact(fact);
    })}, [])

    return (
        <div className="navbar navbar-dark bg-dark mb-3">
            <div className="container-fluid d-flex justify-content-between">
                <div className='w-50'><Logo /></div>
                <div className='text-muted text-wrap text-end fw-lighter fs-6 w-50'>{ fact.text }</div>
            </div>
        </div>
    )
}
