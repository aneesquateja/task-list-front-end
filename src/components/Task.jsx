import PropTypes from 'prop-types';
import React from 'react';
import './Task.css';

const Task = ({ id, title, isComplete, onToggleComplete, onDelete }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      {/* Button to toggle the task's completion status */}
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => onToggleComplete(id)} // Trigger parent function on button click
      >
        {title}
      </button>
      {/* Button to delete the task */}
      <button
        className="tasks__item__remove button"
        onClick={() => onDelete(id)} // Trigger parent function on button click
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
