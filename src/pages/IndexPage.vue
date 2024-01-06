<template>
  <div class="home flex q-gap-sm relative-position">
    <div class="text-caption absolute-top-left q-mt-sm">v{{ version }}</div>
    <HelpBtn />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import HelpBtn from 'src/components/HelpBtn.vue';
import useDB from 'src/modules/useDB';
import { version } from '../../package.json';

export default defineComponent({
  name: 'IndexPage',
  components: {
    HelpBtn,
  },
  setup() {
    const { getArts } = useDB();

    onBeforeMount(async () => {
      const arts = await getArts();
      console.log(arts);
    });

    return {
      version,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - 32px);
}
</style>
