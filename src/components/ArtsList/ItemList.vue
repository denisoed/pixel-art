<template>
  <div class="item-list flex items-center justify-between">
    <router-link
      :to="`/art/${id}`"
      class="item-list-link"
      :class="{
        'router-link-exact-active active': openedMenu,
      }"
    >
      <div class="item-list-name">{{ id }}</div>
    </router-link>
    <div class="item-list-controls">
      <q-spinner v-if="deleting" />
      <q-btn
        v-else
        icon="mdi-dots-horizontal"
        size="sm"
        dense
        flat
        round
        @click="toggleMenu"
      >
        <q-menu @hide="toggleMenu" anchor="bottom left" self="top right">
          <q-list>
            <q-item clickable v-close-popup @click="onDelete">
              <q-item-section>
                <q-item-label>
                  <span class="text-caption">Delete</span>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="mdi-delete" size="xs" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ItemList',
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  emits: ['on-delete'],
  setup(props, { emit }) {
    const openedMenu = ref(false);
    const deleting = ref(false);

    function toggleMenu() {
      openedMenu.value = !openedMenu.value;
    }

    function onDelete() {
      deleting.value = true;
      openedMenu.value = false;
      emit('on-delete', props.id);
    }

    return {
      openedMenu,
      toggleMenu,
      onDelete,
      deleting,
    };
  },
});
</script>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
  text-decoration: none;
  color: #fff;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 30px);
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
    background: transparent;

    .q-btn {
      color: #fff;
    }
  }

  &:hover {
    &::before {
      display: block;
    }

    .item-list-controls {
      display: block;
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &-name {
    width: 100%;
    height: 100%;
    color: #fff;
    z-index: 1;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  &-link {
    width: 100%;
    height: 100%;
    display: block;
    color: #fff;
    text-decoration: none;
  }

  .router-link-exact-active {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 30px);
      height: calc(100% + 10px);
      border-radius: 4px;
      z-index: 0;
      background: rgba($dark-page, 0.5);
    }

    ~ .item-list-controls {
      display: block;
    }
  }

  .active {
    &::after {
      background: $dark-page;
    }
  }
}
</style>
