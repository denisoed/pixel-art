<template>
  <div class="file-uploader" v-ripple>
    <q-file
      outlined
      :hint="hint || undefined"
      :rules="rules"
      @update:model-value="onChangeImage"
      :accept="acceptedExts"
    >
      <div class="absolute-center text-grey flex column flex-center q-gap-sm">
        <div class="flex">
          <q-icon name="mdi-image-plus" class="q-mr-sm" size="sm" />
          <span class="text-subtitle1">Upload Image</span>
        </div>
        <div class="flex column items-center">
          <p
            v-for="(info, i) in INFO"
            :key="`info_${i}`"
            class="text-caption q-ma-none"
          >
            {{ info }}
          </p>
        </div>
      </div>
    </q-file>
    <!-- Loader -->
    <q-inner-loading :showing="loading" size="sm" style="z-index: 10" />
  </div>
</template>

<script>
import useNotify from 'src/modules/useNotify';
import { defineComponent } from 'vue';
import {
  VALID_FILE_EXTS,
  VALID_FILE_TYPES,
  FILE_MAX_SIZE_KB,
} from 'src/config/index';

const INFO = [
  `File size should not exceed ${FILE_MAX_SIZE_KB} KB`,
  `Accepted formats: ${VALID_FILE_EXTS.join(', ')}`,
];

export default defineComponent({
  name: 'FileUploader',
  props: {
    hint: {
      type: String,
      default: null,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['on-change'],
  setup(props, { emit }) {
    const { notifyError } = useNotify();

    async function onChangeImage(image) {
      try {
        const fileSize = image.size / 1000;
        const fileType = image.type;
        if (fileSize >= FILE_MAX_SIZE_KB) {
          notifyError(`File size must be less than ${FILE_MAX_SIZE_KB} KB.`);
          return;
        }
        if (!VALID_FILE_TYPES.includes(fileType)) {
          notifyError(
            `File type must be one of: ${VALID_FILE_EXTS.join(', ')}.`
          );
          return;
        }
        emit('on-change', image);
      } catch {
        notifyError('Something went wrong. Please try again.');
      }
    }

    return {
      onChangeImage,
      INFO,
    };
  },
});
</script>

<style lang="scss">
.file-uploader {
  width: 60vw;
  height: 210px;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  position: relative;
  overflow: hidden;

  .q-file {
    width: 100%;
    height: 100%;
    position: relative;

    .q-field__control {
      height: 100%;
      padding-top: 5px;
      padding-bottom: 5px;
      justify-content: center;
      position: relative;

      &::before,
      &::after {
        border-width: 2px;
        border-style: dashed;
        border-radius: 4px;
      }

      .q-field__append {
        position: absolute;
        top: 0;
        right: 16px;
      }
    }
  }

  &_dialog-card {
    min-width: 300px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  &--circle {
    border-radius: 100%;
  }
}
</style>
