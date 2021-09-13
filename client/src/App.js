import './App.css'
import InputTodo from './components/InputTodo'
import TodoList from './components/TodoList'

function App() {
  return (
    <>
      <div className='container'>
        <InputTodo />
        <TodoList />
      </div>
    </>
  )
}

export default App
