import React from "react";
import { SubtasksProps } from "../interfaces";

const SubtaskList = ({ subtasks }: SubtasksProps) => {
  return (
    <div>
      <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
      <ul className="list-none p-0 m-0 flex-grow-1">
        {subtasks.map((item) => (
          <li key={item._id} className="flex align-items-center mb-3">
            <i className="pi pi-check-circle text-green-500 mr-2"></i>
            <span className="text-900">{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubtaskList;
