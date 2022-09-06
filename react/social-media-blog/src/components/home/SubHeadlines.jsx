import React from 'react';

export default function SubHeadlines() {
  return (
    <>

        <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
            <div className="col bg-dark me-md-3 pt-3 px-3 text-center text-white overflow-hidden">
                <div className="my-3 py-3">
                    <h2 className="display-5">Another headline</h2>
                    <p className="lead">And an even wittier subheading.</p>
                </div>
                <div className="bg-light shadow-sm mx-auto" style={{ width: 80+'%', height: 300+'px' }}></div>
            </div>
            <div className="col bg-light me-md-3 pt-3 px-3 text-center overflow-hidden">
                <div className="my-3 p-3">
                    <h2 className="display-5">Another headline</h2>
                    <p className="lead">And an even wittier subheading.</p>
                </div>
                <div className="bg-dark shadow-sm mx-auto" style={{ width: 80+'%', height: 300+'px' }}></div>
            </div>
        </div>

    </>
  )
}

// https://getbootstrap.com/docs/5.0/examples/product/