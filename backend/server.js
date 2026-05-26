const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: 'Learn DevOps', done: false },
  { id: 2, text: 'Deploy my first app', done: false }
];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a todo
app.post('/api/todos', (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(todo);
  res.json(todo);
});

app.listen(3001, () => console.log('Backend running on port 3001'));