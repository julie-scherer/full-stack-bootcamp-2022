import React from 'react'

export default function Search() {
  return (
    <>
        <div className="row d-flex w-50 mx-auto justify-content-center">
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit">
                    Search
                </button>
            </form>
        </div>
    </>
  )
}
