<template>
  <q-layout view="lHh Lpr lff">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="500"
      class="q-pa-sm"
    >
      <q-list class="flex column full-height">
        <q-item clickable v-ripple>
          <q-item-section> Create New Art </q-item-section>
          <q-item-section avatar>
            <q-icon name="mdi-plus" />
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="q-mt-auto">
          <q-item-section> Settings </q-item-section>
          <q-item-section avatar>
            <q-avatar size="36px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
