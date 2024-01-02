<template>
  <component
    :is="tag"
    class="ui-button"
    :class="{ 'ui-button--active': active }"
    role="button"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UIButton',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'button',
    },
  },
});
</script>

<style lang="scss" scoped>
.ui-button {
  background: #191f2b;
  box-shadow: none;
  margin: 0 1rem 1rem 0;
  font-variation-settings: 'wght' 600;
  letter-spacing: 0;
  border-radius: 100px;
  font-size: 1rem;
  transform: scale(1);
  transition: all 0.05s ease-out;
  border: none;
  color: white;
  font-family: Inter, sans-serif;
  padding: 8px 15px;
  cursor: pointer;
  transition: all 0.1s ease-out;

  &:hover {
    background: rgba($color: #323c4e, $alpha: 0.6);
  }

  &:active {
    transform: scale(0.97);
  }

  &--active {
    background: #323c4e !important;
  }
}
</style>
