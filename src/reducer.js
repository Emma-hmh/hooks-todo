export default function(state, action){

  switch(action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload
      }

    case 'ADD_TODO':
  
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }

    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload
      }

    
    case 'TOGGLE_TODO':
      const toggledTodos = state.todos.map( todo => 
        todo.id === action.payload.id ? 
        action.payload :
        todo
      )

      return {
        ...state,
        todos: toggledTodos
      }

    case 'UPDATE_TODO': 
      // if(!action.payload || state.todos.some(todo => todo.text === action.payload)){
      //   return state
      // }
      const updatedTodo = { ...action.payload } 
      const updatedTodos = state.todos.map( todo => 
        todo.id === state.currentTodo.id ?
        updatedTodo :
        todo
      )

      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      }
    
    case 'REMOVE_TODO':
      const filteredTodos = state.todos.filter( todo => 
        todo.id !== action.payload.id  
      )
      const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo

      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodos
      }
    
    default:
      return state
  }

}