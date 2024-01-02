<template>
  <div id="pixel-art-options" class="flex q-gutter-sm items-center">
    <!-- <q-btn @click="onGenerateCss">Generate CSS</q-btn> -->
    <q-btn color="primary" rounded @click="onExportPng">Export</q-btn>
    <q-btn color="primary" rounded @click="onReset">Reset</q-btn>
    <q-btn color="primary" rounded @click="toggleEraser" :active="getEraser">
      Eraser
    </q-btn>
    <label>
      <q-icon name="upload" size="xs" />
      Import File
      <input type="file" class="hidden" @change="onChangeFile" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { config, VALID_FILE_TYPES } from 'src/config/index';
import { useMainStore } from 'src/stores/main';
import { storeToRefs } from 'pinia';
import usePixelArt from 'src/modules/usePixelArt';

export default defineComponent({
  name: 'PixelArtOptions',
  setup() {
    const store = useMainStore();

    const {
      generateInitPixels,
      generatePixelsFromFile,
      generateCss,
      exportPng,
    } = usePixelArt();

    const { getEraser, getPixels } = storeToRefs(store);

    async function onChangeFile(e: Event) {
      const files = (e?.target as HTMLInputElement)?.files;
      if (files?.length) {
        const file = files[0];
        if (VALID_FILE_TYPES.includes(file.type)) {
          store.setPixels([]);
          const pixels = await generatePixelsFromFile(file);
          nextTick(() => {
            store.setPixels(pixels);
          });
        } else {
          // toast.error('Please select a png, jpg or gif file to upload.', {
          //   timeout: 5000,
          // });
        }
      }
    }

    function onGenerateCss() {
      const cssCode = generateCss(getPixels.value);
      store.setCssCode(cssCode);
    }

    function onExportPng() {
      exportPng();
    }

    function onReset() {
      store.setPixels([]);
      const pixels = generateInitPixels();
      nextTick(() => {
        store.setPixels(pixels);
      });
    }

    return {
      onChangeFile,
      config,
      toggleEraser: store.toggleEraser,
      getEraser,
      onReset,
      onGenerateCss,
      onExportPng,
    };
  },
});
</script>
