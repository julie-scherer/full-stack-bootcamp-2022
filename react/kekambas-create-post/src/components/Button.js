import React from 'react';

export default function Button(props) {
    
    return (
        <button className={`btn btn-${props.color ? props.color : 'primary'} w-100`} onClick={() => props.handleClick(props.step)}>+{props.step}</button>
    )
}
