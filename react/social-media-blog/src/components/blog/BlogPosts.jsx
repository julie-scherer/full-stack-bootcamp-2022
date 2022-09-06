import React from 'react';
import { Link } from 'react-router-dom';
import ViewPost from './ViewPost';

export default function BlogPosts(props) {
    return (
        <>
            <div className="row my-3" style={{ height: 750 + 'px' }}>

                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white scrollarea" style={{ maxWidth: 250 + 'px', height: 100 + '%', overflowY: 'scroll' }}>
                    <div className="d-flex align-items-center flex-shrink-0 p-3 border-bottom">
                        <span className="fs-5 fw-bold">Blog Posts</span>
                    </div>
                    <div id="blog-posts" className="list-group list-group-flush border-bottom">
                        {props.posts.map((post, i) => {
                            return (
                                <a href={`#list-item-${i}`} className="list-group-item list-group-item-action py-3 lh-tight" key={i}>
                                    <div className="d-flex w-100 align-items-center justify-content-between">
                                        <p className="mb-1 lead">{post.title}</p>
                                        <small className='text-muted'>{post.date_created.slice(0, 3)}</small>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className="col" data-bs-spy="scroll" data-bs-target="#blog-posts" data-bs-offset="0" tabIndex="0" style={{ width: 'auto', height: 100 + '%', overflowY: 'scroll' }}>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {props.posts.map((post, i) => {
                            return (
                                <div>
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
                                                            <button type="button" onClick={() => { <ViewPost post={post} /> }} className="btn btn-sm btn-outline-secondary mx-1">View</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            </div>
        </>
    )
}
