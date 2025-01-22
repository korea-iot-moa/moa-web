import { create } from "zustand";

interface CategoryBarStore {
  isOpen: boolean;

  setIsOpen: (isOpen: boolean) => void;
}

const useCategoryBarStore = create<CategoryBarStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set((state) => ({ isOpen: isOpen ?? !state.isOpen })),
}));

export default useCategoryBarStore;
