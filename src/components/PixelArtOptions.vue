<template>
  <div id="pixel-art-options">
    <button class="generate-css" @click="onGenerateCss">Generate CSS</button>
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
    <ModalsContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { config, VALID_FILE_TYPES } from '@/config/index';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import usePixelArt from '@/modules/usePixelArt';
import { ModalsContainer, useModal } from 'vue-final-modal';

import CssModal from '@/components/CssModal.vue';

export default defineComponent({
  name: 'PixelArtOptions',
  components: {
    ModalsContainer,
  },
  setup() {
    const store = useMainStore();
    const toast = useToast();

    const { open: openCssModal, close } = useModal({
      component: CssModal,
      attrs: {
        title: 'Css',
        onConfirm() {
          close();
        },
      },
    });
    const { generateInitPixels, generatePixelsFromFile, generateCss } =
      usePixelArt();

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
          toast.error('Please select a png, jpg or gif file to upload.', {
            timeout: 5000,
          });
        }
      }
    }

    function onGenerateCss() {
      const cssCode = generateCss(getPixels.value);
      store.setCssCode(cssCode);
      openCssModal();
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
    };
  },
});
</script>
