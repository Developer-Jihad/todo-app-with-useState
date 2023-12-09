import React, { useState } from "react";
import "./TaskItem.css";
import { RxCross2 } from "react-icons/rx";
import { PiCheckCircleFill } from "react-icons/pi";
import { PiCheckCircleBold } from "react-icons/pi";
import { BiSolidEdit } from "react-icons/bi";
import { MdSaveAs } from "react-icons/md";

export default function TaskItem({ todo: { todo, setTodos }, deleteTodo }) {
  const { id, text, completed } = todo;
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState(text);

  const handleSubmit = (e, id) => {
    e.preventDefault();
    setTodos((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            text: editedTodo,
          };
        }
        return item;
      })
    );
    setIsEdit(false);
  };
  const handleComplete = () => {
    setTodos((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <>
      <div className="single-item">
        <div className="flex">
          <div>
            {completed ? (
              <div>
                <PiCheckCircleFill
                  onClick={handleComplete}
                  className="checked-icon icon"
                />
              </div>
            ) : (
              <div>
                <PiCheckCircleBold
                  onClick={handleComplete}
                  className="unChecked-icon icon"
                />
              </div>
            )}
          </div>

          <div className="todo-text">
            {completed ? (
              <div className=" completed-todo">
                <s className="todo-text">{text}</s>
              </div>
            ) : (
              <div className="editing-form">
                {isEdit ? (
                  <form onSubmit={(e) => handleSubmit(e, id)}>
                    <input
                      type="text"
                      onChange={(e) => setEditedTodo(e.target.value)}
                      value={editedTodo}
                      id={id}
                    />

                    <button className="save-edit-btn icon">
                      <MdSaveAs />
                    </button>
                  </form>
                ) : (
                  <span className="todo-text">{text}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <BiSolidEdit
            onClick={() => setIsEdit(true)}
            className="edit-icon icon"
          />
          <RxCross2 onClick={() => deleteTodo(id)} className="dlt-icon icon" />
        </div>
      </div>
    </>
  );
}
