import React, { useContext, useMemo, DragEvent } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { ScrollTop } from "primereact/scrolltop";
import { EntryListProps } from "../interfaces";
import EntryCard from "./EntryCard";
import { EntriesContext } from "../context";
import { eq, filter, find, map } from "lodash";
import style from "./EntryList.module.scss";

export const EntryList = ({ title, status }: EntryListProps) => {
  const { updateEntry, entries, isDragging, endDragging } =
    useContext(EntriesContext);
  const entriesByStatus = useMemo(
    () => filter(entries, (entry) => eq(entry.status, status)),
    [entries]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    const entry = find(entries, (e) => eq(e._id, id))!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const listSyle =
    "surface-0 shadow-2 border-1 border-50 border-round p-3 h-full flex flex-column";

  return (
    <div className="col-12 lg:col-4">
      <div className="p-3 h-full">
        <div
          className={
            isDragging
              ? `${style.dragging} p-3 h-full flex flex-column`
              : `${listSyle}`
          }
          onDrop={onDropEntry}
          onDragOver={allowDrop}
        >
          <ScrollPanel style={{ height: "calc(100vh - 280px)" }}>
            <div className="text-900 font-medium text-xl mb-2">{title}</div>
            <div>
              {entriesByStatus.length > 0 &&
                map(entriesByStatus, (entry) => (
                  <EntryCard key={entry._id} content={entry}></EntryCard>
                ))}
            </div>
            <ScrollTop
              target="parent"
              className="custom-scrolltop"
              threshold={100}
              icon="pi pi-arrow-up"
            ></ScrollTop>
          </ScrollPanel>
        </div>
      </div>
    </div>
  );
};
