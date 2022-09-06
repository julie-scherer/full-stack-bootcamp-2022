import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import Post from './Post';
// import Blog from '../../views/Blog';

export default function BlogPosts({ posts }) {


    return (
        <>
            <div className="row my-3" style={{ height: 750 + 'px' }}>

                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white scrollarea" style={{ maxWidth: 250 + 'px', height: 100 + '%', overflowY: 'scroll' }}>
                    <div className="d-flex align-items-center flex-shrink-0 p-3 border-bottom">
                        <span className="fs-5 fw-bold">Blog Posts</span>
                    </div>
                    <div id="blog-posts" className="list-group list-group-flush border-bottom">
                        {posts.map((post, i) => {
                            return (
                                <a href={`#list-item-${i}`} className="list-group-item list-group-item-action py-3 lh-tight" key={i}>
                                    <div className="d-flex w-100 align-items-center justify-content-between">
                                        <p className="mb-1 lead">{ post.title }</p>
                                        <small className='text-muted'>{ post.date_created.slice(0, 3) }</small>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className="col" data-bs-spy="scroll" data-bs-target="#blog-posts" data-bs-offset="0" tabIndex="0" style={{ width: 'auto', height: 100 + '%', overflowY: 'scroll' }}>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {posts.map( (post, i) => {
                            return (<Post post={ post } i={ i } key={ post.id } />)
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}
