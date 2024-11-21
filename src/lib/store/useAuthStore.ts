import {create} from "zustand";

interface AuthState {
  username: string;
  email: string;
  isLogin: boolean;
  setUser: (username: string, email: string) => void;
  setLoginStatus: (status: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  username: "",
  email: "",
  isLogin: false,
  setUser: (username, email) => set(() => ({username, email, isLogin: true})),
  setLoginStatus: (status) => set(() => ({isLogin: status})),
  logout: () => set(() => ({username: "", email: "", isLogin: false})),
}));

export default useAuthStore;
