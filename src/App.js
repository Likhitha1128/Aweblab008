import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask({ ...task });
  };

  const handleSaveTask = () => {
    setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
    setIsEditing(false);
    setCurrentTask({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setCurrentTask({ ...currentTask, [name]: value });
    } else {
      setNewTask(value);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>React To-Do List</h1>
        <input
          type="text"
          name="text"
          value={isEditing ? currentTask.text : newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button onClick={isEditing ? handleSaveTask : handleAddTask}>
          {isEditing ? 'Save' : 'Add'}
        </button>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.text}
              <button className="edit-button" onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
