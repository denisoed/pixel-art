<template>
  <div class="home flex flex-center q-gap-sm relative-position">
    <div class="text-caption absolute-top-left q-mt-sm">v{{ version }}</div>
    <HelpBtn />
    <div class="flex column">
      <FileUploader :loading="loading" @on-change="onFileChanged" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { version } from '../../package.json';
import useDB from 'src/modules/useDB';
import useNotify from 'src/modules/useNotify';
import { useRouter } from 'vue-router';

import HelpBtn from 'src/components/HelpBtn.vue';
import FileUploader from 'src/components/FileUploader.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    HelpBtn,
    FileUploader,
  },
  setup() {
    const { createArt } = useDB();
    const { notifySuccess, notifyError } = useNotify();
    const { push } = useRouter();

    const loading = ref(false);

    async function onFileChanged(file: File | null) {
      if (file) {
        try {
          loading.value = true;
          const response = await createArt({
            name: file.name,
          });
          push(`/art/${response.id}`);
          notifySuccess('Art created successfully');
        } catch {
          notifyError('Something went wrong. Please try again.');
        } finally {
          loading.value = false;
        }
      }
    }

    return {
      version,
      onFileChanged,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - 32px);
}
</style>
