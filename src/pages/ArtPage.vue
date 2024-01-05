<template>
  <div class="flex flex-center q-gap-sm">
    <PixelArtOptions />
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
      <PixelArtArea />
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
import { defineComponent, onMounted } from 'vue';
import usePixelArt from 'src/modules/usePixelArt';
import { useMainStore } from 'src/stores/main';
import { storeToRefs } from 'pinia';

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
    const store = useMainStore();
    const { getPixelsResolution } = storeToRefs(store);
    const { generateInitPixels, styles } = usePixelArt();

    function init() {
      const pixels = generateInitPixels();
      store.setPixels(pixels);
    }

    function onChangeResolution(value: number) {
      const pc = {
        [1]: 0,
        [2]: 20,
        [3]: 40,
        [4]: 60,
      };
      store.setPixelsResolution(value);
      store.setPixelsCount(20 + pc[value as keyof typeof pc]);
      const pixels = generateInitPixels();
      store.setPixels(pixels);
    }

    onMounted(() => {
      init();
    });

    return {
      styles,
      getPixelsResolution,
      onChangeResolution,
    };
  },
});
</script>

<style>
.hidden {
  display: none !important;
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
