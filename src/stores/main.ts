import { defineStore } from 'pinia';
import { IPixel } from 'src/interfaces';
import { DEFAULT_COLOR } from '@/config/index';

interface IState {
  eraser: boolean;
  pixels: IPixel[];
  color: string;
}

export const useMainStore = defineStore('main', {
  state: (): IState => {
    return {
      eraser: false,
      pixels: [],
      color: DEFAULT_COLOR,
    };
  },
  getters: {
    getEraser: (state) => state.eraser,
    getPixels: (state) => state.pixels,
    getColor: (state) => state.color,
  },
  actions: {
    toggleEraser() {
      this.eraser = !this.eraser;
    },
    setPixels(pixels: IPixel[]) {
      this.pixels = pixels;
    },
    setColor(color: string) {
      this.color = color;
    },
  },
});
