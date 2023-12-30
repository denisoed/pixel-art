import { defineStore } from 'pinia';
import { IPixel } from 'src/interfaces';

interface IState {
  eraser: boolean;
  pixels: IPixel[];
}

export const useMainStore = defineStore('main', {
  state: (): IState => {
    return {
      eraser: false,
      pixels: [],
    };
  },
  getters: {
    getEraser: (state) => state.eraser,
    getPixels: (state) => state.pixels,
  },
  actions: {
    toggleEraser() {
      this.eraser = !this.eraser;
    },
    setPixels(pixels: IPixel[]) {
      this.pixels = pixels;
    },
  },
});
