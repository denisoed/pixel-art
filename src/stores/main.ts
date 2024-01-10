import { LocalStorage } from 'quasar';
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
  withGrid: boolean;
}

const PIXELS_RESOLUTION_KEY = 'pixels-resolution';
const PIXELS_AREA_WITH_GRID = 'pixels-area-with-grid';

export const useMainStore = defineStore('main', {
  state: (): IState => {
    return {
      eraser: false,
      pixels: [],
      color: DEFAULT_COLOR,
      cssCode: '',
      pixelsResolution: 0,
      file: null,
      withGrid: true,
    };
  },
  getters: {
    getEraser: (state) => state.eraser,
    getPixels: (state) => state.pixels,
    getColor: (state) => state.color,
    getCssCode: (state) => state.cssCode,
    getPixelsResolution: (state) =>
      state.pixelsResolution ||
      Number(LocalStorage.getItem(PIXELS_RESOLUTION_KEY) || 0) ||
      DEFAULT_PIXELS_RESOLUTION,
    getFile: (state) => state.file,
    getWithGrid: (state) => state.withGrid,
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
      LocalStorage.set(PIXELS_RESOLUTION_KEY, resolution);
    },
    setFile(file: File | null) {
      this.file = file;
    },
    setWithGrid(withGrid: boolean) {
      this.withGrid = withGrid;
      LocalStorage.set(PIXELS_AREA_WITH_GRID, withGrid);
    },
  },
});
