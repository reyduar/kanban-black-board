import React, { useContext, useMemo } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { ScrollTop } from "primereact/scrolltop";
import { EntryListProps } from "../interfaces";
import EntryCard from "./EntryCard";
import { EntriesContext } from "../context";
import { eq, filter, map } from "lodash";

export const EntryList = ({ title, status }: EntryListProps) => {
  const { entries } = useContext(EntriesContext);
  const entriesByStatus = useMemo(
    () => filter(entries, (entry) => eq(entry.status, status)),
    [entries]
  );

  return (
    <div className="col-12 lg:col-4">
      <div className="p-3 h-full">
        <div
          className="surface-0 shadow-2 border-1 border-50 border-round p-3 h-full flex flex-column"
          style={{ borderRadius: "6px" }}
        >
          <ScrollPanel style={{ height: "calc(100vh - 100px)" }}>
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
