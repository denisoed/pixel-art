<template>
  <div
    id="pixel-art-area"
    class="pixel-art-area"
    :style="{
      width: `calc(${0.825 * config.width}rem + ${config.height * 3}px)`,
      height: `calc(${0.825 * config.height}rem + ${config.width * 3}px)`,
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { config } from '@/config/index';

export default defineComponent({
  name: 'PixelArtArea',
  setup() {
    return {
      config,
    };
  },
});
</script>
