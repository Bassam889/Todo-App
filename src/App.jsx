import React, { useReducer, useRef, useEffect, useState } from 'react'
import Todo from './Todo'

const initialState = []

export const actions = {
  addTodo: 'add-todo',
  toggleTodo: 'toggle-todo',
  deleteTodo: 'delete-todo',
  resetTodos: 'reset',
}

function reducer(state, action) {
  switch(action.type) {
    case actions.addTodo:
      return [...state, newTodo(action.payload.name)]
    case actions.toggleTodo:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo
      })
    case actions.deleteTodo:
      return state.filter(todo => todo.id !== action.payload.id)
    case actions.resetstate:
      return initialState
    default:
      throw new Error(`Unhandled expression in switch: ${action.type}`);
  }
}

function newTodo(name) {
  return {
    id: Date.now(),
    name: name,
    complete: false,
  }
}

export default function App() {

  const [todos, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("todos")) || initialState)
  const inputRef = useRef()
  const [name, setName] = useState('')

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  let todoElement = todos.map(todo => {
    return <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
  })

  function clearAllTodos() {
    localStorage.clear()
    dispatch({ type: actions.resetstate })
  }

  function addTodos() {
    if (name) {
      dispatch({ type: actions.addTodo, payload: { name: name } })
      setName('')
    }
  }

  return (
    <div className='container'>
      <h1>My todos</h1>
      <form className='form' onSubmit={handleSubmit}>
        <br />
        <input
          placeholder='Add new task...'
          className='input' 
          type="text" 
          ref={inputRef} 
          value={name} 
          onChange={handleChange}
        />
        <button className='btn-add-todo' onClick={addTodos}>Add Todo</button>
      </form>
      <br />
      {todoElement}
      <div className='btn-clear-container'>
      <button className="btn-clear" onClick={clearAllTodos}>Clear All Todos</button>
      </div>
    </div>
  )
}

