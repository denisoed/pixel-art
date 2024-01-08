<template>
  <div class="art-page flex flex-center q-gap-sm">
    <PixelArtOptions @on-save="onSave" :loading="loading" />
    <div
      class="flex flex-center column q-gap-xs"
      :style="{
        width: styles.area.width,
      }"
    >
      <div class="flex items-center justify-between q-gap-sm full-width">
        <PixelArtColors />
        <PixelArtTools />
      </div>
      <PixelArtArea :loading="loading" />
    </div>
    <q-slider
      :model-value="getPixelsResolution"
      :min="1"
      :max="4"
      color="primary"
      thumb-size="25px"
      markers
      vertical
      reverse
      label
      label-value="Resolution"
      @change="onChangeResolution"
    />

    <HelpBtn />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import usePixelArt from 'src/modules/usePixelArt';
import useDB from 'src/modules/useDB';
import useNotify from 'src/modules/useNotify';
import { useMainStore } from 'src/stores/main';
import { useArtsStore } from 'src/stores/arts';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import PixelArtArea from 'src/components/PixelArtArea.vue';
import PixelArtColors from 'src/components/PixelArtColors.vue';
import PixelArtTools from 'src/components/PixelArtTools.vue';
import PixelArtOptions from 'src/components/PixelArtOptions.vue';
import HelpBtn from 'src/components/HelpBtn.vue';

export default defineComponent({
  name: 'ArtPage',
  components: {
    PixelArtArea,
    PixelArtColors,
    PixelArtTools,
    HelpBtn,
    PixelArtOptions,
  },
  setup() {
    const route = useRoute();
    const store = useMainStore();
    const artsStore = useArtsStore();
    const { notifySuccess, notifyError } = useNotify();
    const { getPixelsResolution, getPixels } = storeToRefs(store);
    const { getArt } = storeToRefs(artsStore);
    const { generateInitPixels, styles } = usePixelArt();
    const { fetchArt, updateArt } = useDB();

    const loading = ref(false);

    async function fetchData() {
      try {
        loading.value = true;
        const pixels = generateInitPixels();
        store.setPixels(pixels);
        if (route.params.id) {
          const result = await fetchArt(route.params.id as string);
          if (!result) return;
          artsStore.setArt(result);
          store.setPixels(
            JSON.parse(result?.json)[getPixelsResolution.value - 1]
          );
        }
      } finally {
        loading.value = false;
      }
    }

    async function onChangeResolution(value: number) {
      if (getPixelsResolution.value === value) return;
      store.setPixelsResolution(value);
      if (getArt.value) {
        store.setPixels(
          JSON.parse(getArt.value.json)[getPixelsResolution.value - 1]
        );
      }
    }

    async function onSave() {
      try {
        loading.value = true;
        if (getArt.value) {
          const list = [...JSON.parse(getArt.value.json)];
          list[getPixelsResolution.value - 1] = getPixels.value;
          await updateArt(route.params.id as string, {
            name: getArt.value.name,
            json: JSON.stringify(list),
          });
          notifySuccess('Art updated successfully');
        }
      } catch {
        notifyError('Something went wrong. Please try again.');
      } finally {
        loading.value = false;
      }
    }

    watch(
      route,
      () => {
        fetchData();
      },
      {
        immediate: true,
      }
    );

    return {
      styles,
      loading,
      getPixelsResolution,
      onChangeResolution,
      onSave,
    };
  },
});
</script>

<style lang="scss" scoped>
.art-page {
  min-height: calc(100vh - 32px);
}

.flex {
  display: flex;
}

.column {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>
