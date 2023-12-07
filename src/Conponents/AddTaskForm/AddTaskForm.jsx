import { useEffect, useState } from "react";
import "./AddTaskForm.css";
import { FaPlus } from "react-icons/fa";
import TaskItem from "../TaskItem/TaskItem";

export default function AddTaskForm() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Handler function to update the state when the input value changes
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  // Handler function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, todo]);
    setInputValue("");
  };
  // Handle Delete Todo
  const deleteTodo = (id) => {
    const filteredTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodo);
  };
  return (
    <>
      <div className="todo-app">
        <div>
          <h1 className="title">🎯 My To-Do App ...</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                required
                className="form-input"
                placeholder="Add your Task"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </label>

            <button className="submit-btn" type="submit">
              <FaPlus />
            </button>
          </form>
        </div>
        <br />
        <div className="task-container">
          {todos.map((todo) => (
            <TaskItem
              key={todo.id}
              deleteTodo={deleteTodo}
              todo={{ todo, setTodos }}
            />
          ))}
        </div>
        <br />
      </div>
    </>
  );
}
