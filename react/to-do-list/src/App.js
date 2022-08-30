import React, { useState } from 'react';
import Todo from './components/Todo';
import uuid from 'react-uuid';


function App() {
    const [todos, setTodos] = useState([])

    function handleAddTodo(e) {
        e.preventDefault()
        const name = e.target.task.value
        if (name === '') return // if the input is empty, return nothing (don't add an empty item to the to-do list)
        setTodos(prevTodos => {
            // console.log(`prevTodos: ${prevTodos}`)
            return [...prevTodos, { id: uuid(), name: name, complete: false}]
        })
        e.target.task.value = '' // clear input field after submit
    }

    function checkTodo(id){
        const newTodos = [...todos]  // make a copy of the todo list
        const todo = newTodos.find(todo => todo.id === id)  // find the id
        todo.complete = !todo.complete  // change complete property to the opposite (true if false, false if true)
        console.log(`${todo.name} checked (${todo.complete})`)
        setTodos(newTodos)
    }

    return (
        // wrap mult elements in a fragment (empty HTML element)
        <> 
            {/* {console.log(todos)} */}
            <div className='container m-2 p-3 justify-content-center border border-5'>
                <h2 className='display-2'>To Do List!</h2>
                {todos.map(todo => <Todo key={todo.id} checkTodo={checkTodo} todo={todo} />)}
                <div className='row'> 
                    <form onSubmit={handleAddTodo}>
                        <input type='text' name='task' />
                        <input type='submit' value='Add Task' />
                    </form>
                </div>
                <div className='row'> 
                    <div className='col'>
                        Completed: {todos.filter(todo => todo.complete).length} / {todos.length}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
