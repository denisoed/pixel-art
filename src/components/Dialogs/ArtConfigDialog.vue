<template>
  <q-dialog :model-value="dialog" @hide="hideDialog" position="bottom">
    <q-card
      class="art-config-dialog"
      :style="{
        width: '400px',
      }"
    >
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Art Settings</div>
        <q-btn icon="mdi-close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-list class="q-my-md">
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Art Grid</q-item-label>
            <q-item-label caption>Enable or disable art grid</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle dense color="primary" v-model="settings.grid" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { useMainStore } from 'src/stores/main';

export default defineComponent({
  name: 'ArtConfigDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['hide'],
  setup(_, { emit }) {
    const mainStore = useMainStore();

    const settings = reactive({
      grid: mainStore.getWithGrid,
    });

    function hideDialog() {
      emit('hide');
    }

    function toggleGrid(val: boolean) {
      mainStore.setWithGrid(val);
    }

    watch(settings, () => {
      toggleGrid(settings.grid);
    });

    return {
      hideDialog,
      settings,
    };
  },
});
</script>
