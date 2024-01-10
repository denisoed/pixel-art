<template>
  <div class="text-caption">
    v{{ version }} <span class="text-deep-orange">ALPHA</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { version } from '../../package.json';

export default defineComponent({
  name: 'ProjectVersion',
  setup() {
    return {
      version,
    };
  },
});
</script>
