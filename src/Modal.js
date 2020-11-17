import React from 'react';
import './Modal.css'

function Modal({username, email, review, onCloseModal}) {

    return (
        <div className='modal'>
            <div className='modal-body'>
                <h1>Review was added</h1>
                <p>{username}</p>
                <p>{email}</p>
                <p>{review}</p>
                <button onClick={onCloseModal}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
