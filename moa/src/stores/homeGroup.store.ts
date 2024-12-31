import { create } from "zustand";
import { MeetingGroup } from "../types";

interface HomeGroupStore {
  results: MeetingGroup[];
  loading: boolean;

  setResults: (results:MeetingGroup[]) => void; 
  setLoading: (loading: boolean) => void;
}

const useHomeGroupStore =  create<HomeGroupStore>((set) =>({
  results: [],
  loading: false,

  setResults: (results) => set({results: results}),
  setLoading: (loading) => set({loading: loading}),

}));

export default useHomeGroupStore;