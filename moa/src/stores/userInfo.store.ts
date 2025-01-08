import { create } from "zustand";
import { User } from "../types";

interface UserInfoStore {
  errorMg: string;
  passwordValue: {
    password: string
  };

  setErrorMg:(errorMg: string) => void;  
  setPasswordValue: (passwordValue: {
    password: string
  }) => void;
}

const useUserInfoStore = create<UserInfoStore>((set) => ({
  passwordValue:{
    password: ""
  },
  errorMg: '',

  setErrorMg: (errorMg) => set({errorMg: errorMg}),
  setPasswordValue: (passwordValue) => set({passwordValue:passwordValue}) 
}));

export default useUserInfoStore;