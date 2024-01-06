<template>
  <div class="arts-list">
    <div
      v-for="(art, i) in arts"
      :key="`art_${i}`"
      class="arts-list_item flex items-center justify-between"
    >
      <div class="arts-list_item-name">{{ art.name }}</div>
      <div class="arts-list_item-controls">
        <q-btn icon="mdi-dots-horizontal" size="sm" dense flat round />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IArt } from 'src/interfaces';

export default defineComponent({
  name: 'ArtsList',
  props: {
    arts: {
      type: Array as PropType<IArt[]>,
      required: true,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
.arts-list {
  &_item {
    width: 100%;
    cursor: pointer;
    transition: all 0.2s ease-out;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 20px);
      height: calc(100% + 10px);
      border-radius: 4px;
      display: none;
      background: $dark-page;
      z-index: 0;
    }

    &-controls {
      height: 100%;
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      background: #000;
    }

    &:hover {
      &::before {
        display: block;
      }

      .arts-list_item-controls {
        display: block;
      }
    }

    &-name {
      color: #fff;
      z-index: 1;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }
  }
}
</style>
