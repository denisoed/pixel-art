import { defineStore } from 'pinia';
import { IArt } from 'src/interfaces';

interface IState {
  arts: IArt[];
  art: IArt | null;
}

export const useArtsStore = defineStore('arts', {
  state: (): IState => {
    return {
      arts: [],
      art: null,
    };
  },
  getters: {
    getArts: (state) => state.arts,
    getArt: (state) => state.art,
  },
  actions: {
    setArts(arts: IArt[]) {
      this.arts = arts;
    },
    pushArt(art: IArt) {
      this.arts = [...this.arts, art];
    },
    setArt(art: IArt) {
      this.art = art;
    },
    deleteArt(id: string) {
      this.arts = this.arts.filter((art) => art.id !== id);
    },
  },
});
