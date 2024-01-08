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
    <q-btn size="sm" color="primary" round icon="mdi-download">
      <q-menu anchor="bottom right" self="top right" :offset="[0, 10]">
        <q-list>
          <q-item
            v-for="item in EXPORT_LIST"
            :key="item.label"
            clickable
            class="bg-dark text-white"
            v-close-popup
            @click="$emit(item.event)"
            :disable="loading"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
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

const EXPORT_LIST = [
  {
    label: 'Export PNG',
    event: 'on-export-png',
  },
  {
    label: 'Export JPEG',
    event: 'on-export-jpeg',
  },
];

export default defineComponent({
  name: 'PixelArtOptions',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['on-save', 'on-export-png', 'on-export-jpeg', 'on-export-svg'],
  setup(_, { emit }) {
    function onSave() {
      emit('on-save');
    }

    return {
      onSave,
      EXPORT_LIST,
    };
  },
});
</script>
