<template>
  <div id="pixel-art-colors">
    <div class="colors flex items-center">
      <div
        v-for="color in COLORS"
        :key="color"
        class="color"
        :style="{ background: color }"
        :data-color="color"
        @click="onColor(color)"
        :class="{ current: color === getColor && !customColor }"
      />
      <div class="select-color flex items-center">
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
import { useMainStore } from 'src/stores/main';
import { storeToRefs } from 'pinia';
import { COLORS } from 'src/config/index';
import debounce from 'lodash.debounce';

export default defineComponent({
  name: 'PixelArtColors',
  setup() {
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
      }, 500)
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

<style lang="scss" scoped>
h3 {
  line-height: normal;
}

.colors {
  position: relative;
  display: flex;
  align-items: center;
}

.colors .color {
  width: 1.25rem;
  cursor: pointer;
  height: 1.25rem;
  position: relative;
  border-radius: 100px;
  margin: 0 0.5rem 0 0;
}

.colors > div:not(.select-color).current:after,
input.current:after {
  border: 2px solid rgb(112 142 255);
  position: absolute;
  content: '';
  border-radius: 100px;
  top: -2px;
  /* box-shadow: 0 0 0 1px rgb(112 142 255 / 39%); */
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
}

.colors > .select-color h3 {
  margin: 0 0.5rem 0 1rem;
  font-size: 1rem !important;
  min-width: max-content;
}
input {
  position: relative;
}

input::-webkit-color-swatch {
  border-radius: 100px;
  width: 16px;
  cursor: pointer;
  height: 18px;
  margin: 2px 0 0 2px;
  border: none;
}

input[type='color']:before {
  content: '';
  top: 6px;
  left: 4px;
  width: calc(100% - 6px);
  border-radius: 100px;
  height: calc(100% - 10px);
  background: rgba(255, 255, 255, 0.125);
  position: absolute;
}
input[type='color'] {
  height: 2rem;
  padding: 0;
  background: transparent !important;
  border-radius: 10px;
  height: 1.75rem;
  position: relative;
  border: none;
  cursor: pointer;
}
input.current:after {
  top: 3px;
  left: 1px;
  width: calc(100% + 0px);
  height: calc(100% + -4px);
}
</style>
