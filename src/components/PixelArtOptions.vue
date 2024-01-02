<template>
  <div id="pixel-art-options">
    <!-- <UIButton @click="onGenerateCss">Generate CSS</UIButton> -->
    <UIButton @click="onExportPng">Export</UIButton>
    <UIButton @click="onReset">Reset</UIButton>
    <UIButton @click="toggleEraser" :active="getEraser"> Eraser </UIButton>
    <UIButton tag="label">
      Import
      <input type="file" class="hidden" @change="onChangeFile" />
    </UIButton>
    <ModalsContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { useToast } from 'vue-toastification';
import { config, VALID_FILE_TYPES } from '@/config/index';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import usePixelArt from '@/modules/usePixelArt';
import { ModalsContainer, useModal } from 'vue-final-modal';

import UIButton from '@/components/UIButton.vue';
import CssModal from '@/components/CssModal.vue';

export default defineComponent({
  name: 'PixelArtOptions',
  components: {
    ModalsContainer,
    UIButton,
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
