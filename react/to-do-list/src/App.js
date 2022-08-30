import React from 'react';
import TodoList from './components/TodoList';


function App() {
    return (
        <> 
            {/* {console.log(todos)} */}
            <div className='container m-2 p-3 justify-content-center border border-5'>
                <TodoList />
            </div>
        </>
    )
}

export default App;
