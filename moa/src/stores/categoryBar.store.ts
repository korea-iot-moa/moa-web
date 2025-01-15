import { create } from "zustand";

interface CategroyBarStore {
  isOpen: boolean;

  setIsOpne: (isOpen: boolean) => void;
}

const useCategoryBarStore = create<CategroyBarStore>((set) => ({
  isOpen: false,
  setIsOpne: (isOpen) => set((state) => ({ isOpen: isOpen ?? !state.isOpen })),
}));

export default useCategoryBarStore;
