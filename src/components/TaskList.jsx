import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';
import React from 'react';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onToggleComplete={onToggleComplete} // Pass toggle function to Task
          onDelete={onDelete} //pass the delete function to Task
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired,
};

export default TaskList;
