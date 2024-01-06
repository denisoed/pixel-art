<template>
  <q-layout view="lHh Lpr lff">
    <SideBar />

    <q-page-container>
      <div class="q-pa-md full-height">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import SideBar from 'src/components/SideBar.vue';
import useDB from 'src/modules/useDB';
import { useArtsStore } from 'src/stores/arts';

export default defineComponent({
  name: 'MainLayout',
  components: {
    SideBar,
  },
  setup() {
    const { getArts } = useDB();
    const artsStore = useArtsStore();

    async function getData() {
      const response = await getArts();
      artsStore.setArts(response);
    }

    onBeforeMount(() => {
      getData();
    });
  },
});
</script>
