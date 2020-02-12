import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import TodosContext from '../context'


export default function TodoForm() {
  const [todo, setTodo] = useState("")
  const { state: { currentTodo = {} }, dispatch } = useContext(TodosContext)

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text)
    } else {
      setTodo("")
    }
  }, [currentTodo.id, currentTodo.text])

  const handleSubmit = async event => {
    event.preventDefault()
  
    if(currentTodo.text) {
      const response = await axios.patch(`https://todos-api-zkjdtcbkvp.now.sh/todos/${todo.id}`, {
        text: todo
      })
      dispatch({ type: "UPDATE_TODO", payload: response.data })
    } else {
      const response = await axios.post('https://todos-api-zkjdtcbkvp.now.sh/todos', {
        id: Math.random(),
        text: todo,
        complete: false
      })
      dispatch({ type: "ADD_TODO", payload: response.data})
    }
     
    setTodo("")
  }

  return(
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input 
        type="text" 
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  )
}