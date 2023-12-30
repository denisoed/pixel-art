<template>
  <VueFinalModal class="css-modal" content-class="css-modal_content">
    <h3>
      {{ title }}
    </h3>
    <code>{{ getCssCode }}</code>
    <button @click="emit('confirm')">Close</button>
  </VueFinalModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'CssModal',
  components: {
    VueFinalModal,
  },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
  emits: ['confirm'],
  setup(_, { emit }) {
    const store = useMainStore();

    const { getCssCode } = storeToRefs(store);

    return {
      emit,
      getCssCode,
    };
  },
});
</script>

<style lang="scss">
.css-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  &_content {
    background: #191f2b;
    color: #fff;
    padding: 15px;

    h3 {
      margin: 0;
    }
  }
}
</style>
