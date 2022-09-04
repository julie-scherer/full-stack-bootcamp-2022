import React, { useState } from 'react'
import Button from "./Button";

export default function ButtonCounter() {
    let buttons = [
        {color: 'primary', step: 1},
        {color: 'secondary', step: 10},
        {color: 'success', step: 100},
        {color: 'danger', step: 1000},
    ]
    // Set a state for count - initial state of 0 and setCount is function to change state value of count
    const [count, setCount] = useState(0);   

    // Function to be executed when a button is clicked
    function handleClick(step){
        setCount(count + step);
    };
    return (
        <>
            <h1 className='text-center'>Hello World</h1>
            <h3 className='text-center'>Total: {count}</h3>
            {buttons.map((b, i) => <Button color={b.color} step={b.step} key={i} handleClick={handleClick} />)}
        </>
    )
}
