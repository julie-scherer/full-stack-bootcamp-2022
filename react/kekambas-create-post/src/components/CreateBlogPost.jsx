import React from 'react';

export default function CreatePost(props) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.body.value;
        const body = e.target.body.value;
        
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        const response = await fetch('http://localhost:5000/api/posts', {
            method : 'POST',
            headers : myHeaders,
            body : JSON.stringify({ title: title, body: body })
        })
        
        if (response.ok) {
            let data = await response.json();
            if (data.error) {
                console.error(data.error)
            } else {
                console.log('post created');
                props.onNewPost({ title: title, body: body  });
                console.log({ title: title, body: body  })
            }
        }
    }
    
    return (
        <div className='border p-4 m-3 bg-light'>
            <h1 className="display-4">Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" placeholder="Title of your blog post" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Body</label>
                        <textarea type="textarea" name="body" className="form-control" placeholder="Type the body of your blog post here" style={{ height: '50' }}/>
                    </div>
                    <input type='submit' className='btn btn-dark w-25 mt-3' value='Submit' />
                </div>
            </form>
        </div>
  )
}
