<template>
  <div class="auth flex no-wrap">
    <!-- LEFT -->
    <div class="auth_left flex column q-pa-md">
      <div class="auth_left-brand flex items-center q-gap-sm text-h6 text-bold">
        <q-img src="logo.svg" class="auth_left-logo" spinner-size="20px" />
        Pixel Art
      </div>

      <div class="flex column no-wrap q-my-auto">
        <h1 class="text-h3 q-my-md">
          Create <span>Pixel Art</span> from your images
        </h1>
        <p class="auth_left-descr text-grey q-ma-none">
          Effortlessly transform your images into stunning pixelated
          masterpieces, celebrating the beauty of minimalism and artistic
          precision.
        </p>
      </div>
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
import { defineComponent } from 'vue';
import { date } from 'quasar';
import useAuth from 'src/modules/useAuth';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const { signWithGoogle, loadingSignIn } = useAuth();

    const year = date.formatDate(Date.now(), 'YYYY');

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

    &-brand {
      .q-img {
        width: 30px;
        height: 30px;
      }
    }

    h1 {
      font-weight: bold;
      max-width: 450px;

      span {
        color: $primary;
      }
    }

    &-descr {
      max-width: 500px;
      font-size: 18px;
    }
  }

  &_right {
    width: 400px;
    height: 100%;
    background: $dark-page;
  }
}
</style>
