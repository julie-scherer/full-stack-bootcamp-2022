import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Post() {
    let navigate = useNavigate();

    return (
        <div className='col col-rows-100'>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
        </div>
    )
}