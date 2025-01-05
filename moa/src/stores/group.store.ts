import { create } from "zustand";
import { MeetingGroup } from "../types";

interface GroupStore {
  groupData: MeetingGroup | null;
  setGroupData: (group:MeetingGroup | null) => void;
}

const useGroupStore = create<GroupStore>((set) => ({
  groupData: null,

  setGroupData: (groupData) => set({groupData: groupData}),
}));

export default useGroupStore;