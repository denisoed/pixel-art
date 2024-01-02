<template>
  <div
    :class="[
      'custom-cursor',
      { 'custom-cursor--hover': hover },
      { 'custom-cursor--hide': hideCursor },
    ]"
  >
    <div class="custom-cursor_slot" :style="cursorPoint">
      <slot />
    </div>
    <slot name="zone" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'CustomCursor',
  setup() {
    const xChild = ref(0);
    const yChild = ref(0);
    const xParent = ref(0);
    const yParent = ref(0);
    const hover = ref(false);
    const hideCursor = ref(true);

    const cursorPoint = computed(() => {
      return `transform: translateX(${xChild.value - 3}px) translateY(${
        yChild.value - 3
      }px) translateZ(0) translate3d(0, 0, 0);`;
    });

    function moveCursor(e: MouseEvent) {
      xChild.value = e.clientX;
      yChild.value = e.clientY;
      setTimeout(() => {
        xParent.value = e.clientX - 15;
        yParent.value = e.clientY - 15;
      }, 100);
    }

    onMounted(() => {
      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseleave', () => {
        hideCursor.value = true;
      });
      document.addEventListener('mouseenter', () => {
        hideCursor.value = false;
      });
    });

    return {
      cursorPoint,
      hover,
      hideCursor,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-cursor {
  &_slot {
    top: 0;
    left: 0;
    position: fixed;
    pointer-events: none;
    user-select: none;
    z-index: 55555555;
    backface-visibility: hidden;
    will-change: transform;
  }
}
</style>
