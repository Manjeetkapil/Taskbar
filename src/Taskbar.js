import React from "react";
import { Task } from "./Task";
import "./App.css";
export const Taskbar = ({ data, onClick, onDoubleClick }) => {
  return (
    <div className="box">
      {data.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
          ></Task>
        );
      })}
    </div>
  );
};
