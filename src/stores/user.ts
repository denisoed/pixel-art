import { defineStore } from 'pinia';
import { IUser } from 'src/interfaces';
import { LocalStorage } from 'quasar';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/config';

interface IState {
  user: IUser;
  accessToken: string | null;
  refreshToken: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): IState => {
    return {
      user: {
        photoURL: null,
        displayName: null,
        email: null,
      },
      accessToken: null,
      refreshToken: null,
    };
  },
  getters: {
    getUser: (state) => state.user,
    getAccessToken: (state) =>
      LocalStorage.getItem(ACCESS_TOKEN_KEY) || state.accessToken,
    getRefreshToken: (state) =>
      LocalStorage.getItem(REFRESH_TOKEN_KEY) || state.refreshToken,
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
      LocalStorage.set(ACCESS_TOKEN_KEY, accessToken);
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken;
      LocalStorage.set(REFRESH_TOKEN_KEY, refreshToken);
    },
  },
});
