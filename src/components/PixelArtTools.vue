<template>
  <div id="pixel-art-tools" class="flex column q-gap-sm items-center">
    <q-btn
      color="primary"
      round
      :outline="!getEraser"
      icon="mdi-eraser"
      @click="toggleEraser"
      :active="getEraser"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMainStore } from 'src/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'PixelArtTools',
  setup() {
    const store = useMainStore();

    const { getEraser } = storeToRefs(store);

    return {
      toggleEraser: store.toggleEraser,
      getEraser,
    };
  },
});
</script>
