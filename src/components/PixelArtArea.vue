<template>
  <div class="pixel-art-area_wrap">
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

    <!-- Loader -->
    <q-inner-loading :showing="loading" size="sm" style="z-index: 10" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue';
import { useMainStore } from 'src/stores/main';
import { storeToRefs } from 'pinia';
import usePixelArt from 'src/modules/usePixelArt';

export default defineComponent({
  name: 'PixelArtArea',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useMainStore();
    const { getEraser, getPixels, getColor } = storeToRefs(store);
    const { styles } = usePixelArt();

    const isMouseDown = ref(false);

    watch(
      styles,
      () => {
        document.documentElement.style.setProperty(
          '--pixel-area-width',
          styles.value.area.width
        );
        document.documentElement.style.setProperty(
          '--pixel-area-height',
          styles.value.area.height
        );
        document.documentElement.style.setProperty(
          '--pixel-width',
          styles.value.pixel.width
        );
        document.documentElement.style.setProperty(
          '--pixel-height',
          styles.value.pixel.height
        );
        document.documentElement.style.setProperty(
          '--pixel-margin-right',
          styles.value.pixel.marginRight
        );
        document.documentElement.style.setProperty(
          '--pixel-margin-bottom',
          styles.value.pixel.marginBottom
        );
      },
      {
        deep: true,
        immediate: true,
      }
    );

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
      const pixels = document.querySelectorAll('.pixel') || [];
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
:root {
  --pixel-area-width: auto;
  --pixel-area-height: auto;

  --pixel-width: auto;
  --pixel-height: auto;
  --pixel-margin-right: 0;
  --pixel-margin-bottom: 0;
}

.pixel-art-area_wrap {
  position: relative;
  box-sizing: initial;

  width: var(--pixel-area-width);
  height: var(--pixel-area-height);
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
    background: #191f2b;

    width: var(--pixel-width);
    height: var(--pixel-height);
    margin-right: var(--pixel-margin-right);
    margin-bottom: var(--pixel-margin-bottom);
  }
}
</style>
