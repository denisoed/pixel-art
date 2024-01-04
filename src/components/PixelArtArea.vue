<template>
  <div
    class="pixel-art-area_wrap"
    :style="{
      width: styles.area.width,
      height: styles.area.height,
    }"
  >
    <canvas
      id="canvas"
      :style="{
        width: styles.area.width,
      }"
    />
    <div
      id="pixel-art-area"
      class="pixel-art-area"
      @pointermove="onPointerMove"
      @pointerdown="onPointerDown"
      :style="{
        gap: styles.area.gap,
      }"
    >
      <div
        v-for="(pixel, i) in getPixels"
        :key="`pixel_${i}`"
        :style="{
          background: pixel?.color || '',
          ...styles.pixel,
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
import { useMainStore } from 'src/stores/main';
import { useHistoriesStore } from 'src/stores/histories';
import { storeToRefs } from 'pinia';
import usePixelArt from 'src/modules/usePixelArt';

export default defineComponent({
  name: 'PixelArtArea',
  setup() {
    const store = useMainStore();
    const historiesStore = useHistoriesStore();
    const { getEraser, getPixels, getColor } = storeToRefs(store);
    const { styles } = usePixelArt();

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
      getPixels,
      onPointerMove,
      onPointerDown,
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.pixel-art-area_wrap {
  position: relative;
  box-sizing: initial;

  #canvas {
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
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  overflow: hidden;
  position: relative;
  z-index: 1;

  .pixel {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    border-radius: 3px;
    background: #191f2b;
  }
}
</style>
