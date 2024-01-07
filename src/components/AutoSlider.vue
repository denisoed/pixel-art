<template>
  <div class="auto-slider flex justify-between no-wrap">
    <div class="auto-slider_top-g" />
    <div
      class="auto-slider_list"
      ref="assetsRef"
      @mouseover="stopAnimateScroll"
      @mouseout="animateScroll"
    >
      <div class="auto-slider_list-track flex column q-gap-md">
        <q-img src="slide1.png" alt="Slide 1" />
        <q-img src="slide2.png" alt="Slide 2" />
        <q-img src="slide3.png" alt="Slide 3" />
        <q-img src="slide4.png" alt="Slide 4" />
      </div>
    </div>
    <div class="auto-slider_bottom-g" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'AutoSlider',
  setup() {
    const isPaused = ref(false);
    const assetsRef = ref(null);
    const animationId = ref(0);

    function stopAnimateScroll() {
      isPaused.value = true;
      cancelAnimationFrame(animationId.value);
    }

    function animateScroll() {
      isPaused.value = false;
      const content = assetsRef.value as HTMLBaseElement | null;
      const scrollSpeed = 1;
      const scrollDelay = 30;
      let scrollingDown = true;

      let lastTimestamp = 0;

      function moveScroll(timestamp: number) {
        if (content) {
          if (!lastTimestamp) {
            lastTimestamp = timestamp;
          }
          const elapsed = timestamp - lastTimestamp;
          if (elapsed > scrollDelay) {
            lastTimestamp = timestamp;
            if (scrollingDown) {
              content.scrollTop += scrollSpeed;
            } else {
              content.scrollTop -= scrollSpeed;
            }
            if (
              content.scrollTop + content.clientHeight >=
              content.scrollHeight
            ) {
              scrollingDown = false;
            } else if (content.scrollTop <= 0) {
              scrollingDown = true;
            }
          }

          animationId.value = requestAnimationFrame(moveScroll);
        }
      }
      animationId.value = requestAnimationFrame(moveScroll);
    }

    onMounted(() => {
      animateScroll();
    });

    return {
      isPaused,
      assetsRef,
      animateScroll,
      stopAnimateScroll,
    };
  },
});
</script>

<style lang="scss" scoped>
.auto-slider {
  position: relative;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 40px;

  &_list {
    width: 500px;
    height: 100%;
    overflow: auto;
    padding: 40px 0;

    &::-webkit-scrollbar {
      display: none;
    }

    :deep(.asset-card) {
      .q-img,
      iframe {
        height: 200px;
        max-height: 200px;
      }
    }
  }

  &_top-g {
    width: 100%;
    height: 100px;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba($dark, 1);
    background: linear-gradient(
      180deg,
      rgba($dark, 1) 0%,
      rgba($dark, 1) 10%,
      rgba($dark, 0) 100%
    );
    z-index: 2;
  }

  &_bottom-g {
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba($dark, 1);
    background: linear-gradient(
      0deg,
      rgba($dark, 1) 0%,
      rgba($dark, 1) 10%,
      rgba($dark, 0) 100%
    );
    z-index: 2;
  }
}
</style>
