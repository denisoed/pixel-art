import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      eraser: false,
    };
  },
  getters: {
    getEraser: (state) => state.eraser,
  },
  actions: {
    toggleEraser() {
      this.eraser = !this.eraser;
    },
  },
});
