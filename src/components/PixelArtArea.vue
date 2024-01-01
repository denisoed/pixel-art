<template>
  <div
    id="pixel-art-area"
    class="pixel-art-area"
    :style="{
      width: `calc(${0.825 * config.width}rem + ${config.height * 3}px)`,
      height: `calc(${0.825 * config.height}rem + ${config.width * 3}px)`,
    }"
    @pointermove="onPointerMove"
    @pointerdown="onPointerDown"
  >
    <div
      v-for="(pixel, i) in getPixels"
      :key="`pixel_${i}`"
      :style="{
        background: pixel?.color || '',
      }"
      :data-y-coordinate="pixel.y"
      :data-x-coordinate="pixel.x"
      :data-color="pixel.color || ''"
      class="pixel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { config } from '@/config/index';
import { useMainStore } from '@/stores/main';
import { useHistoriesStore } from '@/stores/histories';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'PixelArtArea',
  setup() {
    const store = useMainStore();
    const historiesStore = useHistoriesStore();
    const { getEraser, getPixels, getColor } = storeToRefs(store);

    const isMouseDown = ref(false);

    function onPointerMove(e: Event) {
      if (isMouseDown.value === true) {
        const el = e.target as HTMLElement | null;
        if (el && el.matches('.pixel')) {
          if (getEraser.value === true) {
            el.setAttribute('data-color', '');
            el.style.background = `#191f2b`;
          } else {
            el.setAttribute('data-color', getColor.value);
            el.style.background = `${getColor.value}`;
          }
        }
      }
    }

    function onPointerDown(e: Event) {
      const el = e.target as HTMLElement | null;
      if (!el || !el.matches('.pixel')) return;
      if (getEraser.value === true) {
        el.setAttribute('data-color', '');
        el.style.background = `#191f2b`;
      } else {
        el.setAttribute('data-color', getColor.value);
        el.style.background = `${getColor.value}`;
      }
      isMouseDown.value = true;
    }

    function syncPixelsWithStores() {
      const pixels = document.querySelectorAll('.pixel');
      const result = [];
      for (const pixel of pixels) {
        result.push({
          x: Number(pixel.getAttribute('data-x-coordinate') || 0),
          y: Number(pixel.getAttribute('data-y-coordinate') || 0),
          color: pixel.getAttribute('data-color') || '',
        });
      }
      if (JSON.stringify(result) !== JSON.stringify(getPixels.value)) {
        store.setPixels(result);
        historiesStore.setHistory(result);
      }
    }

    function onPointerUp() {
      isMouseDown.value = false;
      syncPixelsWithStores();
    }

    onMounted(() => {
      document.addEventListener('pointerup', onPointerUp);
    });

    onUnmounted(() => {
      document.removeEventListener('pointerup', onPointerUp);
    });

    return {
      config,
      getPixels,
      onPointerMove,
      onPointerDown,
    };
  },
});
</script>
