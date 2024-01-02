<template>
  <div
    class="pixel-art-area_wrap"
    :style="{
      width: `calc(${0.825 * config.width}rem + ${config.height * 3}px)`,
      height: `calc(${0.825 * config.height}rem + ${config.width * 3}px)`,
    }"
  >
    <canvas id="canvas" />
    <div
      id="pixel-art-area"
      class="pixel-art-area"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { config } from 'src/config/index';
import { useMainStore } from 'src/stores/main';
import { useHistoriesStore } from 'src/stores/histories';
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
            el.style.background = '#191f2b';
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
        el.style.background = '#191f2b';
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
        // historiesStore.setHistory(result);
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

<style lang="scss" scoped>
.pixel-art-area_wrap {
  position: relative;
  box-sizing: initial;

  #canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
  }
}

.pixel-art-area {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
</style>
