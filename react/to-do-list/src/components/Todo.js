import React from 'react'

export default function Todo({ todo, checkTodo }) {
    function handleTodoClick() {
        checkTodo(todo.id)
    }
    return (
        <div className="form-check">
            <input className="form-check-input" type='checkbox' checked={todo.complete} onChange={handleTodoClick} id="defaultCheck1" />
            <label className="form-check-label" htmlFor="defaultCheck1">
                {todo.name}
                {console.log(todo.name)}
            </label>
        </div>
    )
}