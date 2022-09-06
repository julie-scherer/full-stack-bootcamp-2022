import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeletePost({ post, flashMessage, deletePost }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleDelete = async (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        const userToken = localStorage.getItem('token');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${userToken}`)
        const response = await fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${post.id}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            if (data.error) {
                flashMessage('Something went wrong. Please try again', 'danger');
                console.error(data.error)
            } else {
                console.log('post deleted')
                flashMessage('Your post was deleted', 'success');
                deletePost();
            }
        }
        setShow(false);
    }

    return (
        <>
            <Button variant="btn btn-sm btn-outline-secondary mx-1" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}