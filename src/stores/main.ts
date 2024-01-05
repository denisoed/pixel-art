import { defineStore } from 'pinia';
import { IPixel } from 'src/interfaces';
import { DEFAULT_COLOR, DEFAULT_PIXELS_RESOLUTION } from 'src/config/index';

interface IState {
  eraser: boolean;
  pixels: IPixel[];
  color: string;
  cssCode: string;
  pixelsResolution: number;
  file: File | null;
}

export const useMainStore = defineStore('main', {
  state: (): IState => {
    return {
      eraser: false,
      pixels: [],
      color: DEFAULT_COLOR,
      cssCode: '',
      pixelsResolution: DEFAULT_PIXELS_RESOLUTION,
      file: null,
    };
  },
  getters: {
    getEraser: (state) => state.eraser,
    getPixels: (state) => state.pixels,
    getColor: (state) => state.color,
    getCssCode: (state) => state.cssCode,
    getPixelsResolution: (state) => state.pixelsResolution,
    getFile: (state) => state.file,
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
    setPixelsResolution(resolution: number) {
      this.pixelsResolution = resolution;
    },
    setFile(file: File | null) {
      this.file = file;
    },
  },
});
