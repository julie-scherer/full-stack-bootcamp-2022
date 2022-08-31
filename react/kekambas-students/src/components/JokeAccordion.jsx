import React, {useState, useEffect } from 'react';

export default function Header() {
    const [joke, setJoke] = useState([]);
    
    useEffect(() => {
        fetch(`https://v2.jokeapi.dev/joke/Any`)
            .then(res => res.json())
            .then(joke => {
                setJoke(joke);
            })
    }, [])

    return (
        <>

        <h1 className="display-6 text-center">Joke of the day!</h1>
        <div className="accordion accordion-flush w-50 mx-auto border border-bottom">
            <div className="accordion-item primary" key={ joke.id }>
                <h2 className="accordion-header display-2" id="headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panel${joke.id}-content`} aria-expanded="true" aria-controls={`panel${joke.id}-content`}>
                        { joke.setup }
                    </button>
                </h2>
                <div id={`panel${joke.id}-content`} className="accordion-collapse collapse" aria-labelledby="headingOne">
                    <div className="accordion-body">
                        { joke.delivery }
                    </div>
                </div>
            </div>
        </div>  

        </>
    )
}
