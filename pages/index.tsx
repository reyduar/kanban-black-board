import { EntryList } from "@/kanban/components";
import { Button } from "primereact/button";

export default function Home() {
  return (
    <div className="surface-0">
      {/* <div className="text-900 font-bold text-6xl mb-4 text-center">
        Kanban Board
      </div>
      <div className="text-700 text-xl mb-6 text-center line-height-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam
        eligendi quos.
      </div> */}

      <div className="grid">
        <EntryList title="TODO" status="pending"></EntryList>
        <EntryList title="IN PROGRESS" status="in-progress"></EntryList>
        <EntryList title="DONE" status="finished"></EntryList>
      </div>
    </div>
  );
}
