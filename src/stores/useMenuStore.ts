import create from 'zustand';

interface Menu {
  visible: boolean;
  setVisible: (read: boolean) => void;
}

const useMenuStore = create<Menu>((set) => ({
  visible: false,
  setVisible: (visible: boolean) => {
    set({ visible });
  },
}));
export default useMenuStore;
