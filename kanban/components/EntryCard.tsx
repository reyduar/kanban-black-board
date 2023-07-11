import React, { useEffect } from "react";
import { Button } from "primereact/button";
import SubtaskList from "./SubtaskList";
import { EntryCardProps } from "../interfaces";

function EntryCard({ content }: EntryCardProps) {
  const { label, name, createdAt, descriptions } = content;
  const dateObj = new Date(createdAt);
  const dateString = dateObj.toDateString();
  return (
    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
      <div className="text-600">{label}</div>
      <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
      <div className="flex align-items-center">
        <span className="font-bold text-2xl text-900">{name}</span>
      </div>
      <SubtaskList subtasks={descriptions}></SubtaskList>
      <span className="ml-2 font-medium text-600">{dateString}</span>
      {/* <Button label="Edit Details" className="p-3 w-full mt-auto" /> */}
    </div>
  );
}

export default EntryCard;
