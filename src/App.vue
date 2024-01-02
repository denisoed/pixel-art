<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useQuasar, LocalStorage } from 'quasar';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();

    function changeMetaThemeColor(isDark: boolean) {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', isDark ? '#2b2d33' : '#fff');
    }

    function detectTheme() {
      const isDark = LocalStorage.getItem('dark-theme');
      if (typeof isDark === 'boolean') {
        $q.dark.set(isDark);
        changeMetaThemeColor(isDark);
      } else {
        if (window) {
          const isDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
          ).matches;
          changeMetaThemeColor(isDark);
          $q.dark.set(isDark);
        }
      }
    }

    onBeforeMount(() => {
      $q.dark.set(true);
    });
  },
});
</script>
