<template>
  <div class="arts-list flex column no-wrap q-gap-sm">
    <template v-if="list">
      <template v-if="list.length">
        <ItemList
          v-for="(art, i) in list"
          :key="`art_${i}`"
          :id="art.id"
          :name="art.name"
          @on-delete="onArtDelete"
          @on-rename="onArtRename"
        />
      </template>
      <div
        v-else
        class="flex q-gap-sm items-center text-caption text-grey q-px-md"
      >
        <q-icon name="mdi-clipboard-text-multiple-outline" size="xs" />
        No arts
      </div>
    </template>
    <div v-else class="arts-list_loading flex items-center q-gap-sm q-px-md">
      <q-spinner color="primary" size="1em" />
      <div class="text-caption text-grey">Loading...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, toRefs, ref } from 'vue';
import { IArt } from 'src/interfaces';
import useArtsApi from 'src/api/useArtsApi';
import { useRouter } from 'vue-router';
import useNotify from 'src/modules/useNotify';
import { useArtsStore } from 'src/stores/arts';

import ItemList from 'src/components/ArtsList/ItemList.vue';

export default defineComponent({
  name: 'ArtsList',
  components: {
    ItemList,
  },
  props: {
    arts: {
      type: Array as PropType<IArt[] | null>,
      required: true,
    },
  },
  setup(props) {
    const { arts } = toRefs(props);
    const { deleteArt, updateArt } = useArtsApi();
    const { notifyError, notifySuccess } = useNotify();
    const { push } = useRouter();
    const artsStore = useArtsStore();

    const list = ref<IArt[] | null>(null);

    async function onArtDelete(id: string) {
      try {
        await deleteArt(id);
        artsStore.deleteArt(id);
        notifySuccess('Art deleted successfully');
        push('/arts');
      } catch {
        notifyError('Something went wrong. Please try again.');
      }
    }

    async function onArtRename(id: string, name: string) {
      try {
        await updateArt(id, { name });
        notifySuccess('Art renamed successfully');
      } catch {
        notifyError('Something went wrong. Please try again.');
      }
    }

    watch(arts, (arts) => {
      list.value = arts;
    });

    return {
      list,
      onArtDelete,
      onArtRename,
    };
  },
});
</script>

<style lang="scss" scoped>
.arts-list {
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  padding-top: 5px;
}
</style>
