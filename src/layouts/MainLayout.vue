<template>
  <q-layout view="lHh Lpr lff">
    <SideBar />

    <q-page-container>
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from 'src/components/SideBar.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    SideBar,
  },
});
</script>
