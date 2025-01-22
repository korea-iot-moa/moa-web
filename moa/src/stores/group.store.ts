import { create } from "zustand";
import { MeetingGroup, UserAnswer } from "../types";
import { persist } from "zustand/middleware";

interface GroupStore {
  groupData: MeetingGroup | null;
  userAnswer: UserAnswer | null;

  setGroupData: (group: MeetingGroup | null) => void;
  setUserAnswer: (userAnswer: UserAnswer | null) => void;
}

const useGroupStore = create<GroupStore>()(
  persist(
    (set) => ({
      groupData: null,
      userAnswer: null,
      setGroupData: (groupData) => set({ groupData }),
      setUserAnswer: (userAnswer) => set({ userAnswer }),
    }),
    {
      name: "group-storage",
      storage: {
        getItem: (key) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

export default useGroupStore;
