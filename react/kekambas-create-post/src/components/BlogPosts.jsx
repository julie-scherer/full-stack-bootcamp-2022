import React from 'react';

export default function BlogPosts(props) {
    return (
        <div className='d-flex flex-column align-items-center m-3 border p-4 bg-light'>
        <h1 className='display-6'>Blog Posts</h1>
            {props.posts.map(post => {
                return (
                    <div className="card w-50 mb-2" style={{ width: '5' }} key={post.id}>
                        <div className="card-body">
                            <h5 className="card-title">{ post.title } </h5>
                            <p className="card-text">{ post.body }</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};