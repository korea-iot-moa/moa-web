import { create } from "zustand";

interface AuthStoreType {
  isAuthenticated: boolean;
  user: { user: string } | null;

  login: (user: { user: string }) => void;
  logout: () => void;
}

const userAuthStore = create<AuthStoreType>((set) => ({
  isAuthenticated: false,
  user: null,
  
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null })
}));


export default userAuthStore;