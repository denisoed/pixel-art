<template>
  <div class="home flex column q-gutter-md">
    <PixelArtOptions />

    <PixelArtColors />

    <PixelArtArea />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import usePixelArt from 'src/modules/usePixelArt';
import { useMainStore } from 'src/stores/main';

import PixelArtArea from 'src/components/PixelArtArea.vue';
import PixelArtOptions from 'src/components/PixelArtOptions.vue';
import PixelArtColors from 'src/components/PixelArtColors.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    PixelArtArea,
    PixelArtOptions,
    PixelArtColors,
  },
  setup() {
    const store = useMainStore();
    const { generateInitPixels } = usePixelArt();

    function init() {
      const pixels = generateInitPixels();
      store.setPixels(pixels);
    }

    onMounted(() => {
      init();
    });
  },
});
</script>

<style>
body {
  background: rgb(15 19 22);
  color: white;
  padding: 2rem;
  font-family: Inter, sans-serif;
}

.article-link a {
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  top: 1rem;
  right: 1rem;
  font-size: 1.25rem;
}
code {
  font-family: Menlo, Monaco, 'Courier New', monospace;
  font-size: 1rem;
  border-radius: 10px;
  left: 5px;
  margin-top: 0rem;
  overflow: auto;
  box-sizing: border-box;
  padding: 0 1.5rem 6.5rem 1.5rem;
  display: block;
  max-height: 500px;
  line-height: 1.25rem;
  border-radius: 12px;
  width: 100%;
  float: left;
  background: #1d2146a3;
  font-size: 0.875rem;
  max-width: 100%;
}

#pixel-art-area {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  overflow: hidden;
  border-radius: 4px;
  padding: 2px 0 2px 2px;
}

#pixel-art-area .pixel {
  width: 0.825rem;
  margin: 0 3px 3px 0;
  height: 0.825rem;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  border-radius: 3px;
  background: #191f2b;
}

#pixel-art-options {
  display: flex;
}

.generate-css,
.reset,
.prebuilt > .current,
.eraser,
.import-container:before {
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
}
.import-container:before {
  content: 'Select a File';
  cursor: pointer;
  line-height: 2.25rem;
  padding: 0 1rem;
  cursor: pointer;
  display: block;
  position: absolute;
  pointer-events: none;
  font-size: 1rem;
  border-radius: 100px;
  margin: 0;
}
input[type='file'] {
  border: none;
  background: transparent;
  text-transform: initial;
  width: 9rem;
  color: rgb(15 19 22);
  height: 2.5rem;
  cursor: pointer;
  opacity: 0;
  padding: 0;
}

input[type='file']::file-selector-button {
  opacity: 0;
}
input[type='file']::file-upload-button,
input[type='file']::-webkit-file-upload-button {
  visibility: hidden;
}
input {
  background: transparent;
}

.eraser {
  padding: 0 1rem;
}

.generate-css:hover,
.reset:hover,
.prebuilt > .current:hover,
input[type='file']:before:hover,
.eraser:hover {
  background: #6366914a;
  transform: scale(1.02);
  cursor: pointer;
}

.prebuilt > .current {
  border-radius: 100px;
  padding: 0.25rem 1rem;
  line-height: 1.65rem;
  margin: 0 1rem 0 0;
}

.prebuilt {
  position: relative;
  cursor: pointer;
}
.options {
  background: white;
  border-radius: 4px;
  left: 1rem;
  position: absolute;
  z-index: 999;
  top: 3rem;
}

.options > div {
  padding: 0.5rem;
  font-size: 1rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  font-variation-settings: 'wght' 600;
  min-width: 150px;
}

.options > div:last-of-type {
  border-bottom: none;
}

.options {
  pointer-events: none;
  opacity: 0;
  transition: all 0.1s ease-out;
  transform: scale(0.95);
}

.options.active {
  opacity: 1;
  transform: scale(1);
  pointer-events: all;
}

.options:after {
  content: '';
  position: absolute;
  top: -23px;
  left: 45px;
  border-color: transparent transparent white transparent;
  border-width: 12px;
  border-style: solid;
}

.eraser {
  display: flex;
  align-items: center;
  transition: all 0.1s ease-out;
  height: 2.25rem;
  position: relative;
}

.eraser {
  cursor: pointer;
}

.eraser.current {
  background: #323c4e;
}

#popup-pixel-art {
  position: fixed;
  background: white;
  top: 2rem;
  z-index: 99999999;
  transform: scale(0.9);
  opacity: 0;
  pointer-events: none;
  left: 5rem;
  border-radius: 6px;
  left: calc(50% - 350px);
  width: 700px;
  padding: 1.5rem;
  box-sizing: border-box;
  max-height: calc(100% - 4rem);
  overflow: hidden;
}
#popup-pixel-art.active {
  transform: scale(1);
  opacity: 1;
  pointer-events: all;
  overflow: scroll;
}

#popup-pixel-art h2 {
  color: black;
  font-variation-settings: 'wght' 600;
  font-weight: 400;
  margin: 0 0 0rem 0;
  font-size: 1.5rem;
}

#popup-pixel-art code {
  background: #171b38;
}

#popup-pixel-art pre {
  width: calc(100% - 13rem);
}

#popup-pixel-art pre code {
  height: 185px;
}

#popup-pixel-art p {
  color: rgba(0, 0, 0, 0.4);
  margin: 0.5rem 0 1rem 0;
  letter-spacing: 0px;
  font-size: 1rem;
  line-height: 1.5rem;
}
#popup-pixel-art pre code:before,
#popup-pixel-art pre code:after {
  display: none;
}
.pixelart {
  position: absolute;
  top: 5.5rem;
  right: 13rem;
}

.close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
}
.close svg {
  color: black;
}
@media screen and (max-width: 800px) {
  #pixel-art-area .pixel {
    width: 0.5rem;
    height: 0.5rem;
  }

  #pixel-art-area,
  #pixel-art-options {
    position: relative;
    left: -2rem;
  }

  #pixel-art-options {
    z-index: 9999;
  }

  #pixel-art-area {
    width: calc(33rem - (0.325rem * 16)) !important;
    height: calc(33rem - (0.325rem * 16)) !important;
  }
  #popup-pixel-art pre {
    width: calc(100% - 8rem);
  }
  .pixelart {
    top: 7rem;
    right: 8rem;
  }
  #pixel-art-options {
    width: calc(100% - 4rem) !important;
    margin-left: 1.5rem;
    flex-wrap: wrap;
  }

  .generate-css,
  .reset,
  .prebuilt > .current {
    font-size: 0.825rem;
  }

  #popup-pixel-art {
    width: 100%;
    z-index: 99999;
    left: 0;
  }
}

.hidden {
  display: none !important;
}

.flex {
  display: flex;
}

.column {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>
