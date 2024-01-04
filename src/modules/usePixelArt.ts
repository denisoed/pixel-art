import { computed } from 'vue';
import { IPixel } from 'src/interfaces';
import { toPng } from 'html-to-image';

const SIZE = 0.825;
const GAP = 3;
const PIXELS_COUNT = 40;

const usePixelArt = () => {
  function generateInitPixels(): IPixel[] {
    const result = [];
    for (let i = 0; i < PIXELS_COUNT; ++i) {
      for (let j = 0; j < PIXELS_COUNT; ++j) {
        result.push({
          x: j,
          y: i,
          color: '',
        });
      }
    }
    return result;
  }

  async function generatePixelsFromFile(file: File): Promise<IPixel[] | []> {
    if (!file) return [];
    const bitmap = await createImageBitmap(file);
    const canvas = document.querySelector('canvas');
    if (!canvas) return [];
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    ctx.clearRect(0, 0, 9999, 9999);
    canvas.width = PIXELS_COUNT;
    canvas.height = PIXELS_COUNT;
    const scale = Math.min(
      canvas.width / bitmap.width,
      canvas.height / bitmap.height
    );
    const width = bitmap.width * scale;
    const height = bitmap.height * scale;
    const x = canvas.width / 2 - width / 2;
    const y = canvas.height / 2 - height / 2;
    ctx.drawImage(bitmap, x, y, width, height);
    const constructPixelData = [];
    for (let i = 0; i < PIXELS_COUNT; ++i) {
      for (let j = 0; j < PIXELS_COUNT; ++j) {
        const pixelData = ctx.getImageData(j, i, 1, 1).data;
        if (!pixelData) continue;
        constructPixelData.push({
          x: j,
          y: i,
          color:
            pixelData?.length && pixelData[3] !== 0
              ? `rgb(${pixelData[0]} ${pixelData[1]} ${pixelData[2]})`
              : '',
        });
      }
    }
    return constructPixelData;
  }

  function generateCss(pixels: IPixel[]): string {
    const pixelsCss = pixels.map(
      (pixel) => `${pixel.x}px ${pixel.y}px ${pixel.color || 'transparent'}`
    );
    const css = `.pixelart {
      width: 1px;
      height: 1px;
      transform: scale(5);
      background: transparent;
      box-shadow: ${pixelsCss.join(', ')};
    `;
    debugger;
    return css;
  }

  async function exportPng() {
    const pixelArea: HTMLElement | null =
      document.querySelector('#pixel-art-area');
    if (!pixelArea) return;
    const dataUrl = await toPng(pixelArea);
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = dataUrl;
    link.click();
    link.remove();
  }

  const styles = computed(() => ({
    area: {
      gap: `${GAP}px`,
      width: `calc(${SIZE * PIXELS_COUNT}rem + ${PIXELS_COUNT * GAP}px)`,
      height: `calc(${SIZE * PIXELS_COUNT}rem + ${PIXELS_COUNT * GAP}px)`,
    },
    pixel: {
      width: `${SIZE}rem`,
      height: `${SIZE}rem`,
    },
  }));

  return {
    generateInitPixels,
    generatePixelsFromFile,
    generateCss,
    exportPng,
    styles,
  };
};

export default usePixelArt;
