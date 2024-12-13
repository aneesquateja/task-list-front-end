import TaskList from './components/TaskList.jsx';
import './App.css';
import React, { useState } from 'react';

const initialTasks= [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
  {
    id: 3,
    title: 'Do laundry',
    isComplete: true,
  },
  {
    id: 4,
    title: 'call friend',
    isComplete: true,
  },
  {
    id: 5,
    title: 'workout',
    isComplete: false, 
  },
  {
    id: 6,
    title: 'cook food',
    isComplete: true,
  },
];

function App() {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState(initialTasks);
  // Function to toggle the completion status of a task
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task // Toggle isComplete for the matching task
      )
    );
  };

  // FUnction to delete a task

  const deletetask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));  // Remove task with the matching id
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={deletetask}/>}</div>
      </main>
    </div>
  );
};

export default App;
