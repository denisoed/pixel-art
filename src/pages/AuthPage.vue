<template>
  <div class="auth flex no-wrap">
    <!-- LEFT -->
    <div class="auth_left q-pa-md">
      <div class="auth_left-brand text-h6 text-bold">Pixel Art</div>
    </div>

    <!-- RIGHT -->
    <div class="auth_right q-pa-md flex flex-center column">
      <div class="flex flex-center column q-mt-auto">
        <div class="auth_right-title text-h5 text-bold q-mb-md">
          Get Started
        </div>
        <div class="auth_right-btns">
          <q-btn
            color="primary"
            @click="signWithGoogle"
            :loading="loadingSignIn"
          >
            <q-icon name="mdi-google" color="white" size="xs" class="q-mr-sm" />
            Sign In with Google
          </q-btn>
        </div>
      </div>

      <div class="q-mt-auto">
        <p class="text-caption text-grey q-ma-none">
          Copyright &copy; {{ year }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { date } from 'quasar';
import useAuth from 'src/modules/useAuth';

export default defineComponent({
  name: 'AuthPage',
  setup() {
    const { signWithGoogle } = useAuth();

    const year = date.formatDate(Date.now(), 'YYYY');
    const loadingSignIn = ref(false);

    return {
      year,
      signWithGoogle,
      loadingSignIn,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth {
  height: 100vh;

  &_left {
    width: 100%;
    height: 100%;
    background: $dark;
  }

  &_right {
    width: 400px;
    height: 100%;
    background: $dark-page;
  }
}
</style>
