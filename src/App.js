
import ToDoList from './ToDoList';
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const toDoNameRef = useRef()

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(()=>{localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))},[todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo=>todo.id===id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

 

  function handleAddTodo(e) {
    const name = toDoNameRef.current.value
    if (name === '') return 
    console.log(name)
    setTodos(prevTodos => {return [...prevTodos, {id:uuidv4(), name:name, complete: false}]})
    toDoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return ( <div>
      <ToDoList  todos={todos} toggleTodo={toggleTodo}/>
      <br />
      <input type="text" ref={toDoNameRef}/>
      <button onClick={handleAddTodo}>
        Add Todos
      </button>
      <button onClick={handleClearTodos}>
        Clear Completed Todos
      </button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
