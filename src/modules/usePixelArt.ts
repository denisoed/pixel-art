import { computed, ref } from 'vue';
import { IPixel } from 'src/interfaces';
import { useMainStore } from 'src/stores/main';
import { storeToRefs } from 'pinia';
import { PIXELS_STEP } from 'src/config';
import { elementToSVG } from 'dom-to-svg';
import { toCanvas } from 'html-to-image';

const usePixelArt = () => {
  const store = useMainStore();
  const { getPixelsResolution, getWithGrid } = storeToRefs(store);

  const exportLoading = ref(false);

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

  async function generatePixelsFromFile(
    file: File,
    resolution: number
  ): Promise<IPixel[] | []> {
    if (!file) return [];
    const bitmap = await createImageBitmap(file);
    const canvas = document.querySelector('canvas');
    if (!canvas) return [];
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    const rows = PIXELS_STEP * resolution || 1;
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

  function download(href: string, name: string) {
    const link = document.createElement('a');
    link.download = name;
    link.href = href;
    link.click();
    link.remove();
  }

  function exportImage(
    type: 'image/png' | 'image/jpeg' | 'image/webp' = 'image/png',
    ext: 'png' | 'jpeg' | 'webp' = 'png',
    params: { backgroundColor?: string } = {}
  ) {
    try {
      exportLoading.value = true;
      const pixelArea: HTMLElement | null =
        document.querySelector('#pixel-art-area');
      if (!pixelArea) return;
      toCanvas(pixelArea, params).then((canvas) => {
        const image = canvas.toDataURL(type);
        download(image, `pixel-art.${ext}`);
      });
    } finally {
      exportLoading.value = false;
    }
  }

  async function exportPng() {
    exportImage('image/png', 'png');
  }

  async function exportSvg() {
    const pixelArea: HTMLElement | null =
      document.querySelector('#pixel-art-area');
    if (!pixelArea) return;
    const svg = await elementToSVG(pixelArea);
    const svgBlob = new Blob([svg.documentElement.outerHTML], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    download(svgUrl, 'pixel-art.svg');
  }

  async function exportWebp() {
    exportImage('image/webp', 'webp');
  }

  async function exportJpeg() {
    exportImage('image/jpeg', 'jpeg');
  }

  const styles = computed(() => {
    const rem = {
      [1]: 1,
      [2]: 1,
      [3]: 0.5,
      [4]: 0.5,
    };
    const gap = {
      [1]: 1,
      [2]: 1,
      [3]: 1,
      [4]: 1,
    };
    const size = rem[getPixelsResolution.value as keyof typeof rem];
    const indent = gap[getPixelsResolution.value as keyof typeof gap];
    const rows = PIXELS_STEP * getPixelsResolution.value;
    return {
      area: {
        width: `calc(${size * rows}rem + ${rows * indent}px)`,
        height: `calc(${size * rows}rem + ${rows * indent}px)`,
      },
      pixel: {
        marginRight: `${getWithGrid.value ? indent : 0}px`,
        marginBottom: `${getWithGrid.value ? indent : 0}px`,
        width: `calc(${size}rem + ${getWithGrid.value ? 0 : indent}px)`,
        height: `calc(${size}rem + ${getWithGrid.value ? 0 : indent}px)`,
      },
    };
  });

  return {
    styles,
    generateInitPixels,
    generatePixelsFromFile,
    generateCss,
    exportPng,
    exportJpeg,
    exportWebp,
    exportSvg,
    exportLoading,
  };
};

export default usePixelArt;
