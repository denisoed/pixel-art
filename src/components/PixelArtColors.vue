<template>
  <div id="pixel-art-colors">
    <div class="colors">
      <div
        class="color current"
        style="background: white"
        data-color="white"
      ></div>
      <div class="color" style="background: #ffc231" data-color="#ffc231"></div>
      <div class="color" style="background: #ff6c31" data-color="#ff6c31"></div>
      <div class="color" style="background: #ff1c1c" data-color="#ff1c1c"></div>
      <div class="color" style="background: #35c161" data-color="#35c161"></div>
      <div class="color" style="background: #3552c1" data-color="#3552c1"></div>
      <div class="color" style="background: #7935c1" data-color="#7935c1"></div>
      <div class="select-color">
        <h3>Select Color:</h3>
        <input type="color" value="" class="color-picker" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PixelArtColors',
});
</script>
