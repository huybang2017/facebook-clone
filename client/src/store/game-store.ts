import { create } from "zustand";

interface GameStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
