import { computed } from 'vue';
import { IPixel } from 'src/interfaces';
import { toPng } from 'html-to-image';
import { useMainStore } from 'src/stores/main';
import { storeToRefs } from 'pinia';
import { PIXELS_STEP } from 'src/config';

const usePixelArt = () => {
  const store = useMainStore();
  const { getPixelsResolution } = storeToRefs(store);

  function generateInitPixels(): IPixel[] {
    const result = [];
    const rows = PIXELS_STEP * getPixelsResolution.value;
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < rows; ++j) {
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
    const rows = PIXELS_STEP * getPixelsResolution.value;
    ctx.clearRect(0, 0, 9999, 9999);
    canvas.width = rows;
    canvas.height = rows;
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
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < rows; ++j) {
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

  const styles = computed(() => {
    const rem = {
      [1]: 1.835,
      [2]: 0.885,
      [3]: 0.55,
      [4]: 0.445,
    };
    const bRadius = {
      [1]: 3,
      [2]: 2,
      [3]: 2,
      [4]: 1,
    };
    const gap = {
      [1]: 3,
      [2]: 2,
      [3]: 2,
      [4]: 1,
    };
    const borderRadius =
      bRadius[getPixelsResolution.value as keyof typeof bRadius];
    const size = rem[getPixelsResolution.value as keyof typeof rem];
    const indent = gap[getPixelsResolution.value as keyof typeof gap];
    const rows = PIXELS_STEP * getPixelsResolution.value;
    return {
      area: {
        width: `calc(${size * rows}rem + ${rows * indent}px)`,
        height: `calc(${size * rows}rem + ${rows * indent}px)`,
      },
      pixel: {
        marginRight: `${indent}px`,
        marginBottom: `${indent}px`,
        width: `${size}rem`,
        height: `${size}rem`,
        borderRadius: `${borderRadius}px`,
      },
    };
  });

  return {
    generateInitPixels,
    generatePixelsFromFile,
    generateCss,
    exportPng,
    styles,
  };
};

export default usePixelArt;
