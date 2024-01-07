<template>
  <div id="pixel-art-options" class="flex column q-gap-sm items-center">
    <q-btn
      size="sm"
      color="primary"
      round
      icon="mdi-content-save"
      @click="onSave"
      :disable="loading"
    >
      <q-tooltip class="text-caption">Save changes</q-tooltip>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PixelArtOptions',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['on-save'],
  setup(_, { emit }) {
    function onSave() {
      emit('on-save');
    }

    return {
      onSave,
    };
  },
});
</script>
