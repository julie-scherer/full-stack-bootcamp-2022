import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function EditPost({ post, flashMessage, editPost }) {
    const [show, setShow] = useState(false);
    const [newTitle, setNewTitle] = useState(false);
    const [newContent, setNewContent] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userToken = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = newTitle;
        const content = newContent;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${userToken}`)
        const response = await fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${post.id}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            if (data.error) {
                flashMessage('Something went wrong. Please try again', 'danger');
                console.error(data.error);
            } else {
                console.log('post updated', data);
                flashMessage('Your post has been updated. Please refresh the page to see the updates', 'success');
                // editPost();
            }
        }
        setShow(false);
    }

    return (
        <>
            <Button variant="btn btn-sm btn-outline-secondary mx-1" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="Title"
                                placeholder={`${post.title}`}
                                autoFocus
                                onChange={event => setNewTitle(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Contenta</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder={`${post.content}`}
                                onChange={event => setNewContent(event.target.value)}
                            />
                        </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}