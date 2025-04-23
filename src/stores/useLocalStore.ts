import create from 'zustand';

interface Local {
  skipFeature: boolean;
  setSkipFeature: (read: boolean) => void;
}

const useLocalStore = create<Local>((set) => ({
  skipFeature: localStorage.getItem('skipFeature') === 'yes',
  setSkipFeature: (read: boolean) => {
    const result = read ? 'yes' : 'no';
    localStorage.setItem('skipFeature', result);
    set({ skipFeature: result === 'yes' });
  },
}));
export default useLocalStore;
