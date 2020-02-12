import React from 'react'

const TodosContext = React.createContext({
  todos: [
    // { id: 1, text: 'Wake up', complete: true },
    // { id: 2, text: 'Shower', complete: false },
    // { id: 3, text: 'Brush teeth', complete: false }
  ], 
  currentTodo: {}
})

export default TodosContext