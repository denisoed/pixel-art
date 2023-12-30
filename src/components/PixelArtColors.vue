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
        :class="{ current: color === getColor && !customColor }"
      />
      <div class="select-color">
        <h3>Select Color:</h3>
        <input
          type="color"
          class="color-picker"
          :class="{ current: customColor }"
          v-model="customColor"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { COLORS } from '@/config/index';
import debounce from 'lodash.debounce';

export default defineComponent({
  name: 'PixelArtColors',
  emits: ['on-change'],
  setup(_, { emit }) {
    const store = useMainStore();
    const { getColor } = storeToRefs(store);

    const customColor = ref('');

    function onColor(c: string) {
      customColor.value = '';
      store.setColor(c);
    }

    watch(
      customColor,
      debounce(() => {
        store.setColor(customColor.value);
      }, 500),
    );

    return {
      onColor,
      COLORS,
      getColor,
      customColor,
    };
  },
});
</script>
