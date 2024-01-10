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
    <q-btn
      size="sm"
      color="primary"
      round
      icon="mdi-download"
      :disable="loading"
    >
      <q-menu anchor="bottom right" self="top right" :offset="[0, 10]">
        <q-list>
          <q-item
            v-for="item in EXPORT_LIST"
            :key="item.label"
            clickable
            class="bg-dark text-white"
            v-close-popup
            @click="onClick(item.event)"
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
    <q-btn
      size="sm"
      color="primary"
      round
      icon="mdi-cog"
      @click="onShowConfig"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface ExportListItem {
  label: string;
  event: string;
}

type Events =
  | 'on-save'
  | 'on-export-png'
  | 'on-export-jpeg'
  | 'on-export-svg'
  | 'on-export-webp'
  | 'on-export-svg'
  | 'on-show-config';

const EXPORT_LIST: ExportListItem[] = [
  {
    label: 'Export PNG',
    event: 'on-export-png',
  },
  {
    label: 'Export JPEG',
    event: 'on-export-jpeg',
  },
  {
    label: 'Export WebP',
    event: 'on-export-webp',
  },
  {
    label: 'Export SVG',
    event: 'on-export-svg',
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
  emits: [] as Events[],
  setup(_, { emit }) {
    function onSave() {
      emit('on-save');
    }

    function onShowConfig() {
      emit('on-show-config');
    }

    function onClick(event: string) {
      emit(event as Events);
    }

    return {
      onSave,
      onClick,
      onShowConfig,
      EXPORT_LIST,
    };
  },
});
</script>
