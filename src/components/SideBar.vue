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
      <q-item class="flex column q-gap-sm">
        <span class="text-caption">Your Arts</span>
        <ArtsList :arts="arts" />
      </q-item>
      <q-item clickable v-ripple class="q-mt-auto">
        <q-item-section>
          {{ name }}
          <span class="text-caption">{{ email }}</span>
        </q-item-section>
        <q-item-section avatar v-if="photoURL">
          <q-avatar size="36px">
            <img :src="photoURL" :alt="name || 'User Photo'" />
          </q-avatar>
        </q-item-section>
        <q-menu fit dark :offset="[0, 10]">
          <q-list>
            <q-item clickable v-close-popup @click="signOut">
              <q-item-section> Sign Out </q-item-section>
              <q-item-section avatar>
                <q-icon name="mdi-logout" color="red" size="xs" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue';
import { LocalStorage } from 'quasar';
import useAuth from 'src/modules/useAuth';
import { useUserStore } from 'src/stores/user';
import useDB from 'src/modules/useDB';
import { IArt } from 'src/interfaces';

import ArtsList from 'src/components/ArtsList.vue';

const MINI_STORAGE_KEY = 'pixel-art-sidebar-mini';

export default defineComponent({
  name: 'SideBar',
  components: {
    ArtsList,
  },

  setup() {
    const userStore = useUserStore();
    const { signOut } = useAuth();
    const { getArts } = useDB();

    const isMini = ref(false);
    const arts = ref<IArt[]>([]);

    function toggleSidebar() {
      isMini.value = !isMini.value;
      LocalStorage.set(MINI_STORAGE_KEY, isMini.value);
    }

    onMounted(() => {
      isMini.value = LocalStorage.getItem(MINI_STORAGE_KEY) || false;
    });

    onBeforeMount(async () => {
      arts.value = await getArts();
    });

    return {
      isMini,
      toggleSidebar,
      name: userStore.user.displayName,
      email: userStore.user.email,
      photoURL: userStore.user.photoURL,
      signOut,
      arts,
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
