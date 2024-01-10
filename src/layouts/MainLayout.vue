<template>
  <q-layout view="lHh Lpr lff">
    <SideBar />
    <canvas
      id="canvas"
      :style="{
        width: styles.area.width,
      }"
    />
    <q-page-container>
      <div class="q-pa-md full-height relative-position">
        <ProjectVersion class="absolute-top-left q-ml-md q-mt-md" />
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import useDB from 'src/modules/useDB';
import usePixelArt from 'src/modules/usePixelArt';
import { useArtsStore } from 'src/stores/arts';

import SideBar from 'src/components/SideBar.vue';
import ProjectVersion from 'src/components/ProjectVersion.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    SideBar,
    ProjectVersion,
  },
  setup() {
    const { fetchArts } = useDB();
    const artsStore = useArtsStore();
    const { styles } = usePixelArt();

    async function getData() {
      const response = await fetchArts();
      artsStore.setArts(response);
    }

    onBeforeMount(() => {
      getData();
    });

    return {
      styles,
    };
  },
});
</script>
