<template>
  <div class="arts-list flex column q-gap-md">
    <ItemList
      v-for="(art, i) in arts"
      :key="`art_${i}`"
      :id="art.id"
      :name="art.name"
    />
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
      type: Array as PropType<IArt[]>,
      required: true,
      default: () => [],
    },
  },
});
</script>
