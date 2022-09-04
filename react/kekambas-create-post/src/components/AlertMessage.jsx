import React from 'react'

export default function AlertMessage(props) {
    return (
        <div className={`alert alert-${props.category} alert-dismissible fade show`} role='alert'>
            <strong>{props.message}</strong>
            <button type='button' className='btn-close' onClick={() => props.flashMessage(null, null)}></button>
        </div>
    )
}
