require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

//Middleware
app.use(cors())
app.use(express.json())

//Routes

//Create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description],
    )
    res.json(newTodo.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})

//Get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo')
    res.json(allTodos.rows)
  } catch (error) {
    console.error(error.message)
  }
})

// Get a single todo
app.get('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params
    const todoItem = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      todoId,
    ])
    res.json(todoItem.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})

//Update a todo
app.put('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params
    const { description } = req.body
    const updatedTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, todoId],
    )
    res.json('Todo was updated!!!')
  } catch (error) {
    console.error(error.message)
  }
})

//Delete a todo
app.delete('/todos/:todoId', async (req, res) => {
  const { todoId } = req.params
  await pool.query('DELETE FROM todo WHERE todo_id = $1', [todoId])
  res.json('Todo deleted!!!')
})

app.listen(5000, () => console.log('Server running!!!'))
