import { create } from "zustand";
import { User } from "../types";

interface FindUserIdStore {
  result: User | null;
  setResult: (result:User | null) => void;
}

const useFindUserIdStore = create<FindUserIdStore>((set) => ({
  result: null,
  setResult: (result) => set({result: result}),
}));

export default useFindUserIdStore;