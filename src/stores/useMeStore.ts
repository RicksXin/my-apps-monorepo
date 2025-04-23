import { defineStore } from 'pinia';
import { User } from '@/api/types/common';
import request, { Result } from '@/config/request';

type MeState = {
  userInfo?: User;
  me?: Promise<Result<User>>;
};

type MeActions = {
  refreshMe: () => void;
  fetchMe: () => void;
};
export const useMeStore = defineStore<string, MeState, {}, MeActions>('me', {
  state: () => ({
    me: undefined,
    userInfo: undefined,
  }),
  actions: {
    refreshMe() {
      this.me = request.get<User>('/me');
    },
    fetchMe() {
      this.refreshMe();
    },
  },
});
