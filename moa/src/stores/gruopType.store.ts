import { create } from "zustand";
import { MeetingGroup } from "../types";

interface GroupTypeStore {
  groupType: string;
  results: MeetingGroup[];
  isResults: boolean | null;
  loading: boolean;

  setGroupType: (groupType: string) => void;
  setResults: (results: MeetingGroup[]) => void;
  setIsResults: (isResults: boolean | null) => void;
  setLoading: (loading: boolean) => void;
}

const useGroupTypeStore = create<GroupTypeStore>((set) => ({
  groupType: "",
  results: [],
  isResults: null,
  loading: false,

  setGroupType: (groupType) => set({groupType: groupType}),
  setResults: (results) => set({results: results}),
  setIsResults: (isResults) => set({isResults: isResults}),
  setLoading: (loading) => set({loading: loading}),
}));

export default useGroupTypeStore;