import React from 'react';

export default function CreateBlogPost(props) {
    let flashMessage = props.flashMessage;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        const response = await fetch('https://kekambas-blog.herokuapp.com/blog/posts', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                title: title, 
                content: content 
            })
        })
        
        if (response.ok) {
            let data = await response.json();
            if (data.error) {
                console.error(data.error)
            } else {
                props.onNewPost({ title: title, content: content  });
                flashMessage('Your post has been created', 'success');
                console.log('post created', { title: title, content: content });
            }
        }
    }
        
    return (
        <div className='p-4 p-md-5 mt-4 text-white rounded bg-dark'>
            <h1 className="display-4">Create Post</h1>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" placeholder="Title of your blog post" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea type="textarea" name="content" className="form-control" placeholder="Main content of your blog post" style={{ height: '50' }}/>
                    </div>
                    <input type='submit' className='btn btn-light mt-3' value='Submit' />
                </div>
            </form>
        </div>
    )
}
