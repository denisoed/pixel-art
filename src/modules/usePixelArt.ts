import { config } from '@/config/index';
import { IPixel } from '@/interfaces';
import { toPng } from 'html-to-image';

const usePixelArt = () => {
  function generateInitPixels(): IPixel[] {
    const result = [];
    for (let i = 0; i < config.width; ++i) {
      for (let j = 0; j < config.height; ++j) {
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
    canvas.width = config.width;
    canvas.height = config.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    ctx.clearRect(0, 0, 9999, 9999);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const constructPixelData = [];
    for (let i = 0; i < config.width; ++i) {
      for (let j = 0; j < config.height; ++j) {
        const pixelData = canvas
          ?.getContext('2d')
          ?.getImageData(j, i, 1, 1).data;
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
      (pixel) => `${pixel.x}px ${pixel.y}px ${pixel.color || 'transparent'}`,
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

  return {
    generateInitPixels,
    generatePixelsFromFile,
    generateCss,
    exportPng,
  };
};

export default usePixelArt;
