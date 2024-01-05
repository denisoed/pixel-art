<template>
  <div class="home flex q-gap-sm relative-position">
    <div class="text-caption absolute-top-left q-mt-sm">v0.0.1</div>
    <HelpBtn />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelpBtn from 'src/components/HelpBtn.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    HelpBtn,
  },
});
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - 32px);
}
</style>
