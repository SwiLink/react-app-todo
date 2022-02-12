import React from 'react'

export default function ToDo({todo, toggleTodo}) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (
      <label>
          <input type="checkbox" defaultChecked={todo.complete} onChange={handleTodoClick}/>
          {todo.name}</label>
  )
}
