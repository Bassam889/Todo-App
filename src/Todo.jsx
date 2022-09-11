import React from 'react'
import { actions } from './App'

export default function Todo({ todo, dispatch }) {

  function toggleTodo() {
    dispatch({ type: actions.toggleTodo, payload: { id: todo.id }})
  }

  function deleteTodo() {
    dispatch({ type: actions.deleteTodo, payload: { id: todo.id }})
  }

  return (
    <div className='todo-container'>
      <span className="todo" style={{ color: todo.complete ? '#AAA' : '#F09A15', textDecoration: todo.complete ? 'line-through' : 'none'}}>
        {todo.name}
      </span>
      <div className='btn-todo-container'>
      <button className="btn-toggle" onClick={toggleTodo}
        >Toggle</button>
        <button className="btn-delete" onClick={deleteTodo}
        >Delete</button>
      </div>
    </div>
  )
}
