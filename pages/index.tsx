import { EntryList } from "@/kanban/components";
import NewEntry from "@/kanban/components/NewEntry";

export default function Home() {
  return (
    <div className="surface-0">
      {/* <div className="text-900 font-bold text-6xl mb-4 text-center">
        Kanban Board
      </div> */}
      <NewEntry></NewEntry>
      <div className="grid">
        <EntryList title="TODO" status="pending"></EntryList>
        <EntryList title="IN PROGRESS" status="in-progress"></EntryList>
        <EntryList title="DONE" status="finished"></EntryList>
      </div>
    </div>
  );
}
