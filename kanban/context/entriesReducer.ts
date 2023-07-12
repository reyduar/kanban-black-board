import { eq } from "lodash";
import { EntriesState } from ".";
import { Entry } from "../interfaces";

type EntriesActionType =
  | { type: "[Entry] Create-Entry"; payload: Entry }
  | { type: "[Entry] Update-Entry"; payload: Entry }
  | { type: "[Entry] Start-Dragging" }
  | { type: "[Entry] End-Dragging" }
  | { type: "[Entry] Show-Modal" }
  | { type: "[Entry] Close-Modal" };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] Create-Entry":
      return { ...state, entries: [...state.entries, action.payload] };
    case "[Entry] Update-Entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (eq(entry._id, action.payload._id)) {
            return action.payload;
          }
          return entry;
        }),
      };
    case "[Entry] Start-Dragging":
      return { ...state, isDragging: true };
    case "[Entry] End-Dragging":
      return { ...state, isDragging: false };
    case "[Entry] Show-Modal":
      return { ...state, visibleModalEntry: true };
    case "[Entry] Close-Modal":
      return { ...state, visibleModalEntry: false };
    default:
      return state;
  }
};
