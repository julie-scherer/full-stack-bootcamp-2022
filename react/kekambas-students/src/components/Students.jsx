import React, {useState, useEffect } from 'react';

export default function Students() {

    const [students, setStudents] = useState([]);
    const [memes, setMemes] = useState([]);
    
    useEffect(() => {
        fetch(`https://kekambas-bs.herokuapp.com/kekambas`)
            .then(res => res.json())
            .then(data => {
                setStudents(data);
            })
    }, [])
    
    useEffect(() => {
        fetch(`https://api.imgflip.com/get_memes`)
            .then(res => res.json())
            .then(data => {
                setMemes(data.data.memes);
            })
    }, [])

    return ( 
        <>
        
        <h1 className='display-4 text-center text-info'>Meet the Kekambas Family!</h1>
        <div className="row d-flex flex-wrap justify-content-center gx-2 mb-5">
            {students.map(student => { 
                return(
                    <div className="col-sm-6 col-md-4 col-lg-3 g-2" style={{ maxWidth: '100', height: 'auto' }}>
                        <div className="card" key={ student.id }>
                            <div className="card-body d-flex flex-column align-items-center">
                                <h5 className="card-title font-monospace">{ student.first_name + ' ' + student.last_name }</h5>
                                {/* {memes.map((meme, i) => { return( <img src={ meme.url } key={ i } className="img-fluid rounded-start" alt={ meme.url } /> ) })} */}
                                <img src={ memes[Math.floor(Math.random() * 99)].url } className="img-fluid rounded-start" alt="..." />
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

        </>
    )
}
