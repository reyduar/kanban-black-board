import React, { DragEvent, useContext } from "react";
import { Button } from "primereact/button";
import SubtaskList from "./SubtaskList";
import { EntryCardProps } from "../interfaces";
import { EntriesContext } from "../context";

function EntryCard({ content }: EntryCardProps) {
  const { isDragging, startDragging, endDragging } = useContext(EntriesContext);
  const { label, name, createdAt, description, subtasks } = content;
  const dateAt = new Date(createdAt);
  const createdAtToString = dateAt.toDateString();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", content._id);
    startDragging();
  };

  return (
    <div
      className="surface-0 shadow-2 p-3 border-1 border-50 border-round"
      draggable
      onDragStart={onDragStart}
      onDragEnd={endDragging}
    >
      <div className="text-600">
        {label} | {name}
      </div>
      <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
      <div className="flex align-items-center">
        <span className="font-medium text-600">{description}</span>
      </div>
      {/* <SubtaskList subtasks={subtasks}></SubtaskList> */}

      <div className="flex justify-content-between flex-wrap">
        <div>
          <Button
            icon="pi pi-pencil"
            rounded
            text
            severity="info"
            aria-label="Edit"
            size="small"
          />
          <Button
            icon="pi pi-times"
            rounded
            text
            severity="danger"
            aria-label="Delete"
            size="small"
          />
        </div>
        <div className="mt-2">
          <span className="font-medium text-600">{createdAtToString}</span>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
