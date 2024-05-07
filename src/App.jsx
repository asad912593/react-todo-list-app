import React, { useState } from 'react';
import './TodoList.css'; // Import CSS file for styling
import TodoItem from './TodoItems '; // Import TodoItem component
import InputField from './InputFields '; // Import InputField component

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [noteValue, setNoteValue] = useState(''); // State variable for notes
  const [editIndex, setEditIndex] = useState(null); // Track the index of the todo being edited
  const [searchTerm, setSearchTerm] = useState(''); // State variable to manage search term

  const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff']; // Array of colors for todos

  // Function to handle input change for todo text
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle input change for todo date
  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  // Function to handle input change for todo note
  const handleNoteChange = (event) => {
    setNoteValue(event.target.value);
  };

  // Function to generate unique ID for todos
  const generateId = () => {
    return Math.floor(Math.random() * 100000);
  };

  // Function to add a new todo
  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: generateId(),
        text: inputValue,
        completed: false,
        date: dateValue,
        notes: noteValue
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setDateValue('');
      setNoteValue(''); // Reset note input value
    }
  };

  // Function to remove a todo
  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to update a todo
  const handleUpdateTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setInputValue(todoToEdit.text);
    setDateValue(todoToEdit.date);
    setNoteValue(todoToEdit.notes);
    setEditIndex(id);
  };

  // Function to save an updated todo
  const handleSaveTodo = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === editIndex) {
        return {
          ...todo,
          text: inputValue,
          date: dateValue,
          notes: noteValue
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditIndex(null); // Exit edit mode
    setInputValue('');
    setDateValue('');
    setNoteValue('');
  };

  // Function to cancel editing a todo
  const handleCancelEdit = () => {
    setEditIndex(null);
    setInputValue('');
    setDateValue('');
    setNoteValue('');
  };

  // Function to toggle completion status of a todo
  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter todos based on search term
  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <InputField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <InputField
          type="text"
          value={noteValue}
          onChange={handleNoteChange}
          placeholder="Add notes (optional)"
        />
        <InputField
          type="date"
          value={dateValue}
          onChange={handleDateChange}
        />
        <button onClick={editIndex !== null ? handleSaveTodo : handleAddTodo}>
          {editIndex !== null ? 'Save' : 'Add'}
        </button>
        {editIndex !== null && (
          <button onClick={handleCancelEdit}>Cancel</button>
        )}
      </div>
      <div className="search-container">
        <InputField
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search todos..."
        />
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            colors={colors}
            onToggleComplete={handleToggleComplete}
            onUpdateTodo={handleUpdateTodo}
            onRemoveTodo={handleRemoveTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;