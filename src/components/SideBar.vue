<template>
  <q-drawer
    show-if-above
    :width="250"
    :mini="isMini"
    :breakpoint="500"
    class="q-pa-sm"
  >
    <div
      class="sidebar-hider"
      :class="{ 'sidebar-hider--active': isMini }"
      @click="toggleSidebar"
    >
      <div class="flex column">
        <div class="sidebar-hider_line1" />
        <div class="sidebar-hider_line2" />
      </div>
      <q-tooltip class="text-caption">
        {{ isMini ? 'Maximize Sidebar' : 'Minimize Sidebar' }}
      </q-tooltip>
    </div>
    <q-list class="flex column full-height">
      <q-item clickable v-ripple to="/" class="text-white">
        <q-item-section> Create New Art </q-item-section>
        <q-item-section avatar>
          <q-icon name="mdi-plus" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <span class="text-caption">Your Arts</span>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple class="q-mt-auto">
        <q-item-section> Settings </q-item-section>
        <q-item-section avatar>
          <q-avatar size="36px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { LocalStorage } from 'quasar';

const MINI_STORAGE_KEY = 'pixel-art-sidebar-mini';

export default defineComponent({
  name: 'SideBar',

  setup() {
    const isMini = ref(false);

    function toggleSidebar() {
      isMini.value = !isMini.value;
      LocalStorage.set(MINI_STORAGE_KEY, isMini.value);
    }

    onMounted(() => {
      isMini.value = LocalStorage.getItem(MINI_STORAGE_KEY) || false;
    });

    return {
      isMini,
      toggleSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
.text-caption {
  color: #808080;
}

.sidebar-hider {
  width: 30px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translateY(-50%);
  cursor: pointer;

  &_line1,
  &_line2 {
    width: 4px;
    height: 12px;
    background-color: $dark;
    transition: all 0.2s ease-out;
  }

  &--active {
    transform: rotate(180deg);

    .sidebar-hider_line1 {
      transform: translateY(0.15rem) rotate(15deg) translateZ(0px);
    }

    .sidebar-hider_line2 {
      transform: translateY(-0.15rem) rotate(-15deg) translateZ(0px);
    }
  }

  &:hover {
    .sidebar-hider_line1,
    .sidebar-hider_line2 {
      background-color: #fff;
    }

    .sidebar-hider_line1 {
      transform: translateY(0.15rem) rotate(15deg) translateZ(0px);
    }

    .sidebar-hider_line2 {
      transform: translateY(-0.15rem) rotate(-15deg) translateZ(0px);
    }
  }
}
</style>
