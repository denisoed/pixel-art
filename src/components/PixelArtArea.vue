<template>
  <div
    id="pixel-art-area"
    ref=""
    class="pixel-art-area"
    :style="{
      width: `calc(${0.825 * config.width}rem + ${config.height * 3}px)`,
      height: `calc(${0.825 * config.height}rem + ${config.width * 3}px)`,
    }"
    @pointermove="onPointerMove"
    @pointerdown="onPointerDown"
  >
    <div
      class="pixel"
      v-for="(pixel, i) in pixels"
      :key="i"
      :data-y-coordinate="pixel.y"
      :data-x-coordinate="pixel.x"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { config } from '@/config/index';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'PixelArtArea',
  setup() {
    const store = useMainStore();
    const { getEraser } = storeToRefs(store);

    const isMouseDown = ref(false);
    const pixelArtArea = ref<HTMLElement | null>();
    const pixels = ref<{ x: number; y: number }[]>([]);

    function generateStartPixels() {
      const result = [];
      for (let i = 0; i < config.width; ++i) {
        for (let j = 0; j < config.height; ++j) {
          result.push({
            x: j,
            y: i,
          });
        }
      }
      pixels.value = result;
    }

    function onPointerMove(e: Event) {
      if (
        (config.drawing === true && isMouseDown.value === true) ||
        (getEraser.value === true && isMouseDown.value === true)
      ) {
        const el = e.target as HTMLElement | null;
        if (el && el.matches('.pixel')) {
          if (getEraser.value === true) {
            el.setAttribute('data-color', '');
            el.style.background = `#191f2b`;
          } else {
            el.setAttribute('data-color', config.color);
            el.style.background = `${config.color}`;
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
        el.setAttribute('data-color', config.color);
        el.style.background = `${config.color}`;
      }
      isMouseDown.value = true;
    }

    function onPointerUp() {
      isMouseDown.value = false;
    }

    onMounted(() => {
      generateStartPixels();
      document.addEventListener('pointerup', onPointerUp);
    });

    onUnmounted(() => {
      document.removeEventListener('pointerup', onPointerUp);
    });

    return {
      config,
      pixels,
      pixelArtArea,
      onPointerMove,
      onPointerDown,
    };
  },
});
</script>
