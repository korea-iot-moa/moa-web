import { create } from "zustand";
import { MeetingGroup } from "../types";

interface GroupStore {
  groupList: MeetingGroup[];
  setGroupListStore: (groups: MeetingGroup[]) => void;
  addGroupStore: (group: MeetingGroup) => void;
}

const useGroupListStore = create<GroupStore>((set) => ({
  groupList: [],
  setGroupListStore: (groups) => set({ groupList: groups }),
  addGroupStore: (group) =>
    set((state) => ({ groupList: [...state.groupList, group] })),
}));

export default useGroupListStore;