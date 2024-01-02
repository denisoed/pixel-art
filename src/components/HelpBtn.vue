<template>
  <q-btn
    disabled
    round
    color="dark"
    size="sm"
    class="fixed-bottom-right q-ma-sm"
  >
    <q-icon name="mdi-help" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpBtn',
});
</script>

<style lang="scss" scoped>
.q-btn {
  .q-icon {
    font-size: 12px;
  }
}
</style>
