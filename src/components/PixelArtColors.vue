<template>
  <div id="pixel-art-colors">
    <div class="colors">
      <div
        v-for="color in COLORS"
        :key="color"
        class="color"
        :style="{ background: color }"
        :data-color="color"
        @click="onColor(color)"
        :class="{ current: color === activeColor }"
      />
      <div class="select-color">
        <h3>Select Color:</h3>
        <input type="color" value="" class="color-picker" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const COLORS = [
  'white',
  '#ffc231',
  '#ff6c31',
  '#ff1c1c',
  '#35c161',
  '#3552c1',
  '#7935c1',
];

export default defineComponent({
  name: 'PixelArtColors',
  emits: ['on-change'],
  setup(_, { emit }) {
    const activeColor = ref('white');

    function onColor(c: string) {
      activeColor.value = c;
      emit('on-change', c);
    }

    return {
      onColor,
      COLORS,
      activeColor,
    };
  },
});
</script>
