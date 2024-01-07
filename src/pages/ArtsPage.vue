<template>
  <div class="home flex flex-center q-gap-sm relative-position">
    <div class="text-caption absolute-top-left q-mt-sm">v{{ version }}</div>
    <HelpBtn />
    <div class="flex column q-gap-md">
      <div
        class="flex no-wrap items-center home-logo q-mx-auto q-gap-md q-mb-lg"
      >
        <q-img src="logo.svg" alt="Logo" />
        <span class="text-h4 text-bold">Pixel Art</span>
      </div>

      <FileUploader :loading="loading" @on-change="onFileChanged" />
      <div class="home_buttons flex items-start no-wrap q-gap-md q-px-md">
        <div
          v-ripple
          class="home_buttons-item full-width flex column"
          @click="createSimple"
        >
          Simple Board
          <span class="text-caption text-grey">Board without any art</span>
        </div>
        <div
          v-ripple
          class="home_buttons-item full-width cursor-not-allowed flex column"
        >
          Random Art
          <span class="text-caption text-grey"
            >Create random art from the our gallery</span
          >
          <q-tooltip class="text-caption">Coming Soon...</q-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { version } from '../../package.json';
import useDB from 'src/modules/useDB';
import usePixelArt from 'src/modules/usePixelArt';
import useNotify from 'src/modules/useNotify';
import { useArtsStore } from 'src/stores/arts';
import { useRouter } from 'vue-router';

import HelpBtn from 'src/components/HelpBtn.vue';
import FileUploader from 'src/components/FileUploader.vue';

export default defineComponent({
  name: 'ArtsPage',
  components: {
    HelpBtn,
    FileUploader,
  },
  setup() {
    const { createArt, fetchArts } = useDB();
    const { generatePixelsFromFile } = usePixelArt();
    const { notifySuccess, notifyError } = useNotify();
    const { push } = useRouter();
    const artsStore = useArtsStore();

    const loading = ref(false);

    async function onFileChanged(file: File | null) {
      if (file) {
        try {
          loading.value = true;
          const result = await Promise.all([
            generatePixelsFromFile(file, 1),
            generatePixelsFromFile(file, 2),
            generatePixelsFromFile(file, 3),
            generatePixelsFromFile(file, 4),
          ]);
          const response = await createArt({
            name: file.name,
            json: JSON.stringify(result),
          });
          const arts = await fetchArts();
          artsStore.setArts(arts);
          push(`/arts/${response.id}`);
          notifySuccess('Art created successfully');
        } catch {
          notifyError('Something went wrong. Please try again.');
        } finally {
          loading.value = false;
        }
      }
    }

    async function createSimple() {
      try {
        loading.value = true;
        const response = await createArt({
          name: 'Simple Art',
          json: '',
        });
        const arts = await fetchArts();
        artsStore.setArts(arts);
        push(`/arts/${response.id}`);
        notifySuccess('Art created successfully');
      } catch {
        notifyError('Something went wrong. Please try again.');
      } finally {
        loading.value = false;
      }
    }

    return {
      version,
      onFileChanged,
      loading,
      createSimple,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - 32px);

  &-logo {
    .q-img {
      width: 70px;
    }
  }

  &_buttons {
    &-item {
      position: relative;
      border-radius: 4px;
      padding: 15px;
      border: 1px solid $dark;
      cursor: pointer;
    }
  }
}
</style>
