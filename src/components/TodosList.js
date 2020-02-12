import React, {useContext} from 'react'
import axios from 'axios'
import TodosContext from '../context'

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext)
  const title = state.todos.length > 0 
  ? `${state.todos.length} Todos` :
  'Nothing To Do!'

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-4xl font-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => (
          <li 
            key={todo.id}
            className="flex items-center bg-orange-600 border-black border-dashed border-2 my-2 py-4"
          >
            <span 
              className={`flex-1 ml-12 cursor-pointer ${todo.complete && "line-through text-gray-700"}`}
              onDoubleClick={async () => {
                const response = await axios.patch(`https://todos-api-zkjdtcbkvp.now.sh/todos/${todo.id}`, {
                  complete: !todo.complete
                })
                dispatch({ type: 'TOGGLE_TODO', payload: response.data })
              }}
            > 
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: 'SET_CURRENT_TODO', payload: todo })}
            >
              <img
                src="https://img.icons8.com/material/64/000000/edit--v1.png"
                alt="Edit Icon"
                className="h-6 p-1"
              />
            </button>
            <button
              onClick={ async () => {
                await axios.delete(`https://todos-api-zkjdtcbkvp.now.sh/todos/${todo.id}`)
                dispatch({type: 'REMOVE_TODO', payload: todo})
              }}
            >
              <img
                src="https://img.icons8.com/material/80/000000/delete-forever--v2.png"
                alt="Delete Icon"
                className="h-6 p-1"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}