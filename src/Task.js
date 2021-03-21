import React from "react";

export const Task = ({ task, onClick, onDoubleClick }) => {
  return (
    <div className="task" onDoubleClick={() => onDoubleClick(task.id)}>
      <h2>{task.name}</h2>
      <h2>{task.description}</h2>
      <h4>{task.remainder ? task.date : "Double click to turnon"}</h4>
      <button className="btn" onClick={() => onClick(task.id)}>
        remove
      </button>
    </div>
  );
};
