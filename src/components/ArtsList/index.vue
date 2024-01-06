<template>
  <div class="arts-list flex column q-gap-md">
    <template v-if="arts">
      <template v-if="arts.length">
        <ItemList
          v-for="(art, i) in arts"
          :key="`art_${i}`"
          :id="art.id"
          :name="art.name"
        />
      </template>
      <div v-else class="flex q-gap-sm items-center text-caption text-grey">
        <q-icon name="mdi-clipboard-text-multiple-outline" size="xs" />
        No arts
      </div>
    </template>
    <div v-else class="arts-list_loading flex items-center q-gap-sm">
      <q-spinner color="primary" size="1em" />
      <div class="text-caption text-grey">Loading...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IArt } from 'src/interfaces';
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
});
</script>
