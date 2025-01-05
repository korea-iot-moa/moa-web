import { create } from "zustand";
import { User } from "../types";

interface UserInfoStore {
  userInfo: User | null;
  loading: boolean;
  passwordValue: {
    password: string
  };

  setLoading: (loading: boolean) => void;
  setUserInfo: (userInfo: User) => void;
  setPasswordValue: (passwordValue: {
    password: string
  }) => void;
}

const useUserInfoStore = create<UserInfoStore>((set) => ({
  userInfo: null,
  loading: false,
  passwordValue:{
    password: ""
  },

  setLoading: (loading) => set({loading: loading}),
  setUserInfo: (userInfo) => set({userInfo: userInfo}),
  setPasswordValue: (passwordValue) => set({passwordValue:passwordValue}) 
}));

export default useUserInfoStore;