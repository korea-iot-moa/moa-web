import { create } from "zustand";

interface UserState {
  userId: string;
  nickName: string;
  profileImage: string | null;
  isAuthenticated: boolean;
  login: (user: { userId: string; nickName: string; profileImage: string }) => void;
  logout: () => void;
}

const userAuthStore = create<UserState>((set) => ({
  userId: "",
  nickName: "",
  profileImage: null,
  isAuthenticated: false,

  login: (user) =>
    set({
      userId: user.userId,
      nickName: user.nickName,
      profileImage: user.profileImage,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      userId: "",
      nickName: "",
      profileImage: "",
      isAuthenticated: false,
    }),
}));

export default userAuthStore;
