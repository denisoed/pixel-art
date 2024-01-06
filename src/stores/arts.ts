import { defineStore } from 'pinia';
import { IArt } from 'src/interfaces';

interface IState {
  arts: IArt[];
}

export const useArtsStore = defineStore('arts', {
  state: (): IState => {
    return {
      arts: [],
    };
  },
  getters: {
    getArts: (state) => state.arts,
  },
  actions: {
    setArts(arts: IArt[]) {
      this.arts = arts;
    },
    setArt(art: IArt) {
      this.arts = [...this.arts, art];
    },
    deleteArt(id: string) {
      this.arts = this.arts.filter((art) => art.id !== id);
    },
  },
});
