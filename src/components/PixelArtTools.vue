<template>
  <div id="pixel-art-tools" class="flex q-gap-sm items-center">
    <q-btn
      :color="!getEraser ? 'primary' : 'grey'"
      round
      :outline="getEraser"
      icon="mdi-pencil"
      @click="toggleEraser"
      :active="!getEraser"
      size="sm"
    >
      <q-tooltip class="text-caption">Eraser</q-tooltip>
    </q-btn>
    <q-btn
      :color="getEraser ? 'primary' : 'grey'"
      round
      :outline="!getEraser"
      icon="mdi-eraser"
      @click="toggleEraser"
      :active="getEraser"
      size="sm"
    >
      <q-tooltip class="text-caption">Eraser</q-tooltip>
    </q-btn>
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
