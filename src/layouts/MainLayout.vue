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
        <ProjectVersion class="absolute-top-left q-ml-md q-mt-lg" />
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import usePixelArt from 'src/modules/usePixelArt';

import SideBar from 'src/components/SideBar.vue';
import ProjectVersion from 'src/components/ProjectVersion.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    SideBar,
    ProjectVersion,
  },
  setup() {
    const { styles } = usePixelArt();

    return {
      styles,
    };
  },
});
</script>
