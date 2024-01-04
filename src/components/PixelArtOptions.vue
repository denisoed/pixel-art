<template>
  <div id="pixel-art-options" class="flex column q-gap-sm items-center">
    <!-- <q-btn @click="onGenerateCss">Generate CSS</q-btn> -->
    <!-- <q-btn
      size="sm"
      color="primary"
      round
      @click="onExportPng"
      icon="mdi-download"
    /> -->
    <q-btn
      size="sm"
      color="primary"
      round
      @click="onReset"
      icon="mdi-trash-can-outline"
    >
      <q-tooltip class="text-caption">Clear Board</q-tooltip>
    </q-btn>
    <q-btn size="sm" color="primary" round icon="mdi-undo-variant">
      <q-tooltip class="text-caption">Undo</q-tooltip>
    </q-btn>
    <q-btn size="sm" color="primary" round icon="mdi-redo-variant">
      <q-tooltip class="text-caption">Redo</q-tooltip>
    </q-btn>
    <label>
      <q-icon name="upload" size="xs" />
      <input type="file" class="hidden" @change="onChangeFile" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { VALID_FILE_TYPES } from 'src/config/index';
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

    const { getPixels } = storeToRefs(store);

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
      onReset,
      onGenerateCss,
      onExportPng,
    };
  },
});
</script>
