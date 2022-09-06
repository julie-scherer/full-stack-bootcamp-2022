import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ post, i }) {
    return (
        <div className="col" id={`list-item-${i}`} key={post.id}>
            <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice" >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">{post.author.username}</text>
                </svg>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group p-2">
                            <Link to={{ pathname: `post/${post.id}` }} key={i} >
                                <button type="button" onClick={() => { }} className="btn btn-sm btn-outline-secondary mx-1">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
