<template>
  <div class="item-list flex items-center justify-between">
    <q-input
      v-if="renaming"
      ref="inputRef"
      v-model="modelName"
      outlined
      flat
      dense
      class="item-list_inp"
      autofocus
      @keyup.enter="onRenameSave"
    >
      <template v-slot:append>
        <q-btn round dense flat icon="check" size="sm" @click="onRenameSave" />
        <q-btn round dense flat icon="close" size="sm" @click="onRenameClose" />
      </template>
    </q-input>
    <router-link
      :to="`/arts/${id}`"
      class="item-list-link"
      :class="{
        'router-link-exact-active active': openedMenu,
      }"
    >
      <div class="item-list-name">{{ modelName }}</div>
    </router-link>
    <div class="item-list-controls">
      <q-spinner v-if="loading" />
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
            <q-item clickable v-close-popup @click="onRename">
              <q-item-section>
                <q-item-label>
                  <span class="text-caption">Rename</span>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="mdi-pencil" size="xs" />
              </q-item-section>
            </q-item>
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
  emits: ['on-delete', 'on-edit'],
  setup(props, { emit }) {
    const modelName = ref(props.name);
    const openedMenu = ref(false);
    const renaming = ref(false);
    const loading = ref(false);
    const inputRef = ref();

    function toggleMenu() {
      openedMenu.value = !openedMenu.value;
    }

    function onDelete() {
      loading.value = true;
      openedMenu.value = false;
      emit('on-delete', props.id);
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    }

    function onRename() {
      openedMenu.value = false;
      renaming.value = true;
      setTimeout(() => {
        inputRef.value?.focus();
      }, 100);
    }

    function onRenameSave() {
      loading.value = true;
      renaming.value = false;
      emit('on-edit', props.id, modelName.value);
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    }

    function onRenameClose() {
      renaming.value = false;
    }

    return {
      modelName,
      loading,
      renaming,
      inputRef,
      openedMenu,
      toggleMenu,
      onDelete,
      onRename,
      onRenameSave,
      onRenameClose,
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
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 4px;
    display: none;
    background: $dark-page;
    z-index: 0;
    pointer-events: none;
    user-select: none;
  }

  &_inp {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background: $dark-page;

    :deep(.q-field__control) {
      height: 32px;
    }

    :deep(.q-field__append) {
      height: 32px;
    }
  }

  &-controls {
    height: 100%;
    display: none;
    align-items: center;
    position: absolute;
    top: 0;
    right: 15px;
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
      display: flex;
    }
  }

  &:active {
    transform: scale(0.99);
  }

  &-name {
    width: 100%;
    color: #fff;
    z-index: 1;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 170px;
  }

  &-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    line-height: normal;
    padding: 8px 15px;
  }

  .router-link-exact-active {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 4px;
      z-index: 0;
      background: rgba($dark-page, 0.5);
      pointer-events: none;
      user-select: none;
    }

    ~ .item-list-controls {
      display: flex;
    }
  }

  .active {
    &::after {
      background: $dark-page;
    }
  }
}
</style>
