<template>
  <div id="pixel-art-options" class="flex column q-gap-sm items-center">
    <q-btn
      size="sm"
      color="primary"
      round
      @click="onReset"
      icon="mdi-trash-can-outline"
    >
      <q-tooltip class="text-caption">Clear Board</q-tooltip>
    </q-btn>
    <q-btn size="sm" disabled color="primary" round icon="mdi-undo-variant">
      <q-tooltip class="text-caption">Comming soon...</q-tooltip>
    </q-btn>
    <q-btn size="sm" disabled color="primary" round icon="mdi-redo-variant">
      <q-tooltip class="text-caption">Comming soon...</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { useMainStore } from 'src/stores/main';
import usePixelArt from 'src/modules/usePixelArt';

export default defineComponent({
  name: 'PixelArtOptions',
  setup() {
    const store = useMainStore();

    const { generateInitPixels } = usePixelArt();

    function onReset() {
      store.setPixels([]);
      const pixels = generateInitPixels();
      nextTick(() => {
        store.setPixels(pixels);
      });
    }

    return {
      onReset,
    };
  },
});
</script>
