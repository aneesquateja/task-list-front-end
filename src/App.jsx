import TaskList from './components/TaskList.jsx';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';


const kbaseURL = 'http://127.0.0.1:5000/tasks'; // I can Replace with your deployed API URL if needed


const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    id: apiTask.id,
    title: apiTask.title,
    isComplete: apiTask.completed_at !== null,
    // isComplete: apiTask.completed_at ? true : false, // Treat completed_at presence as true/false
  };
  return newTask;
};



function App() {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API when the app loads
  useEffect(() => {
    axios.get(kbaseURL)
      .then((response) => {
        const tasksFromApi = response.data.map((task) => ({
          id: task.id,
          title: task.title,
          isComplete: task.completed_at !== null,
        }));
        setTasks(tasksFromApi);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Function to toggle the completion status of a task
  const toggleComplete = (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) {
      console.error(`Task with ID ${id} not found.`);
      return;
    }

    const endpoint = taskToToggle.isComplete
      ? `${kbaseURL}/${id}/mark_incomplete`
      : `${kbaseURL}/${id}/mark_complete`;

    axios.patch(endpoint)
      .then((response) => {
        const updatedTask = convertFromApi(response.data.task); // Assuming response includes updated task
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? updatedTask : task
          )
        );
      })
      .catch((error) => {
        console.error(`Error toggling task ${id}:`, error);
      });
  };


  // Function to delete a task
  const deleteTask = (id) => {
    axios.delete(`${kbaseURL}/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error(`Error deleting task ${id}:`, error);
      });
  };

  const handleSubmit = (task) => {
    console.log('Submitting task:', task); // Log the task object
    axios.post(`${kbaseURL}`, task)
      .then((result) => {
        console.log('Post result:', result); // Log the result
        setTasks((prevTasks) => [convertFromApi(result.data.task), ...prevTasks]);
      }).catch((error) => {
        console.error('Error posting task:', error); // Log the error
        if (error.response) {
          console.error('Response data:', error.response.data); // Log the response data
          console.error('Response status:', error.response.status); // Log the response status
          console.error('Response headers:', error.response.headers); // Log the response headers
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <br/>
        <div>
          <NewTaskForm handleSubmit={handleSubmit}/>
        </div>
        <br/>
        <div>
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
