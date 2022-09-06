import React from 'react';

export default function FeaturedBlog() {
  
  return (
        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div className="col-md-6 px-0">
                <h1 className="display-4 fst-italic font-family-sans-serif">Title of a longer featured blog post</h1>
                <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                <p className="lead mb-0"><a href="/" className="text-white fw-bold">Continue reading...</a></p>
            </div>
        </div>
  )
}

// https://getbootstrap.com/docs/5.0/examples/blog/