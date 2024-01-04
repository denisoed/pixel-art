import { computed } from 'vue';
import { IPixel } from 'src/interfaces';
import { toPng } from 'html-to-image';
import { useMainStore } from 'src/stores/main';
import { storeToRefs } from 'pinia';

const usePixelArt = () => {
  const store = useMainStore();
  const { getPixelsResolution, getPixelsCount } = storeToRefs(store);

  function generateInitPixels(): IPixel[] {
    const result = [];
    for (let i = 0; i < getPixelsCount.value; ++i) {
      for (let j = 0; j < getPixelsCount.value; ++j) {
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
    canvas.width = getPixelsCount.value;
    canvas.height = getPixelsCount.value;
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
    for (let i = 0; i < getPixelsCount.value; ++i) {
      for (let j = 0; j < getPixelsCount.value; ++j) {
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

  const styles = computed(() => {
    const REM = 0.825;
    const GAP = 3;
    const pc = {
      [1]: 1,
      [2]: 1.5,
      [3]: 2,
    };
    const br = {
      [1]: 3,
      [2]: 2,
      [3]: 1.5,
    };
    const res = pc[getPixelsResolution.value as keyof typeof pc];
    const borderRadius = br[getPixelsResolution.value as keyof typeof pc];
    const count = getPixelsCount.value;
    return {
      area: {
        gap: `${GAP / res}px`,
        width: `calc(${(REM * count) / res}rem + ${(count * GAP) / res}px)`,
        height: `calc(${(REM * count) / res}rem + ${(count * GAP) / res}px)`,
      },
      pixel: {
        width: `${REM / res}rem`,
        height: `${REM / res}rem`,
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
