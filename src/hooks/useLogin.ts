import { create } from "zustand";

interface LoginStore {
  isOpen: boolean;
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
  openModal: () => void;
  closeModal: () => void;
  setOpenChange: (setOpen: boolean) => void;
}

export const useLogin = create<LoginStore>((set) => ({
  isOpen: false,
  mode: "login",
  setMode: (mode) => set({ mode }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setOpenChange: (setOpen) => set({ isOpen: setOpen }),
}));
