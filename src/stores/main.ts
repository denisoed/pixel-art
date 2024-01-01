import { defineStore } from 'pinia';
import { IPixel } from '@/interfaces';
import { DEFAULT_COLOR } from '@/config/index';

interface IState {
  eraser: boolean;
  pixels: IPixel[];
  color: string;
  cssCode: string;
}

export const useMainStore = defineStore('main', {
  state: (): IState => {
    return {
      eraser: false,
      pixels: [],
      color: DEFAULT_COLOR,
      cssCode: '',
    };
  },
  getters: {
    getEraser: (state) => state.eraser,
    getPixels: (state) => state.pixels,
    getColor: (state) => state.color,
    getCssCode: (state) => state.cssCode,
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
    setCssCode(css: string) {
      this.cssCode = css;
    },
  },
});
