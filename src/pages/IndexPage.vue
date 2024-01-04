<template>
  <div class="home flex flex-center q-gap-sm">
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
