<template>
  <div
    id="pixel-art-options"
    :style="{
      width: `calc(${0.825 * config.width}rem + ${config.height * 3}px)`,
    }"
  >
    <button class="generate-css">
      <span class="generate-css-span">Generate CSS</span>
    </button>
    <button class="reset" @click="onReset">Reset</button>
    <button
      class="eraser"
      :class="{ current: getEraser }"
      @click="toggleEraser"
    >
      Eraser
    </button>
    <div class="import-container">
      <input type="file" @change="onChangeFile" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { useToast } from 'vue-toastification';
import { config } from '@/config/index';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import usePixelArt from '@/modules/usePixelArt';

export default defineComponent({
  name: 'PixelArtOptions',
  setup() {
    const store = useMainStore();
    const toast = useToast();
    const { generateInitPixels } = usePixelArt();

    const { getEraser } = storeToRefs(store);

    async function onChangeFile(e: Event) {
      const files = (e?.target as HTMLInputElement)?.files;
      if (files?.length) {
        const file = files[0];
        if (
          file.type == 'image/png' ||
          file.type == 'image/jpg' ||
          file.type == 'image/gif' ||
          file.type == 'image/jpeg'
        ) {
          const bitmap = await createImageBitmap(file);
          const canvas = document.querySelector('canvas');
          if (!canvas) return;
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.clearRect(0, 0, 9999, 9999);
          ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          const constructPixelData = [];
          for (let i = 0; i < config.width; ++i) {
            for (let j = 0; j < config.height; ++j) {
              const pixelData = canvas
                ?.getContext('2d')
                ?.getImageData(i, j, 1, 1).data;
              if (pixelData?.length && pixelData[3] !== 0) {
                constructPixelData.push({
                  x: i,
                  y: j,
                  color: `rgb(${pixelData[0]} ${pixelData[1]} ${pixelData[2]})`,
                });
              }
            }
          }
          constructPixelData.forEach((i) => {
            const getPixel = document.querySelector(
              `.pixel[data-x-coordinate="${i.x}"][data-y-coordinate="${i.y}"]`,
            ) as HTMLElement | null;
            if (getPixel !== null) {
              getPixel.setAttribute('data-color', i.color);
              getPixel.style.background = i.color;
            }
          });
        } else {
          toast.error('Please select a png, jpg or gif file to upload.', {
            timeout: 5000,
          });
        }
      }
    }

    function onReset() {
      store.setPixels([]);
      nextTick(() => {
        const pixels = generateInitPixels();
        store.setPixels(pixels);
      });
    }

    return {
      onChangeFile,
      config,
      toggleEraser: store.toggleEraser,
      getEraser,
      onReset,
    };
  },
});
</script>
