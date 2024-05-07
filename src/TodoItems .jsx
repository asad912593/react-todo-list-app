import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const TodoItems = ({ todo, colors, onToggleComplete, onUpdateTodo, onRemoveTodo }) => {
  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  const handleEdit = () => {
    onUpdateTodo(todo.id);
  };

  const handleDelete = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li style={{ backgroundColor: colors[todo.id % colors.length] }}>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={handleToggle}
      >
        {todo.text} - {todo.date}
      </span>
      {todo.notes && <p>{todo.notes}</p>}
      <div className="icon-container">
        <FontAwesomeIcon
          icon={faEdit}
          onClick={handleEdit}
          className="icon edit-icon"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={handleDelete}
          className="icon delete-icon"
        />
        <FontAwesomeIcon
          icon={faCheckCircle}
          onClick={handleToggle}
          className="icon complete-icon"
        />
      </div>
    </li>
  );
};

export default TodoItems;