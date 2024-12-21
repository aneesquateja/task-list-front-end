import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({handleSubmit}) => {
  const [title, setTitleName] = useState('');


  const handleTaskNameChange = (event) => {
    setTitleName(event.target.value);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title,
      description: '',
      is_Complete: '',
    };
    handleSubmit(newTask);
    setTitleName('');
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <label htmlFor="task-name">Specify Task: </label>
      <input type="text" id="task-name" name="name task" value={title} onChange={handleTaskNameChange}/>
      <div>
        <input type="submit" value="Add a task" />
      </div>
    </form>
  );
};
NewTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default NewTaskForm;