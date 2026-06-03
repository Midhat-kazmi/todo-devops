import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  async function addTodo() {
    if (!input.trim()) return

    const formData = new FormData()
    formData.append('text', input)
    if (image) formData.append('image', image)

    await fetch('/api/todos', {
      method: 'POST',
      body: formData
    })

    setInput('')
    setImage(null)
    fetchTodos()
  }

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '500px', margin: '50px auto', padding: '0 20px' }}>
      <h1>📝 My Todo App</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Enter a task..."
            style={{ padding: '8px', flex: 1, fontSize: '16px' }}
          />
          <button
            onClick={addTodo}
            style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Add
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: '18px' }}>{todo.text}</div>
            {todo.image && (
              <img src={todo.image} alt="todo" style={{ width: '100%', marginTop: '8px', borderRadius: '4px' }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App