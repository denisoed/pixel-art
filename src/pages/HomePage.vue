<template>
  <div class="auth flex no-wrap">
    <!-- LEFT -->
    <div class="auth_left flex column items-start q-pa-md">
      <div class="auth_left-brand flex items-center q-gap-sm text-h6 text-bold">
        <q-img src="logo.svg" class="auth_left-logo" spinner-size="20px" />
        Pixel Art
      </div>

      <div class="auth_left-info flex column align-start no-wrap q-my-auto">
        <h1 class="q-my-md">
          Create <span>Pixel Arts</span><br />
          from your pictures
        </h1>
        <p class="auth_left-descr text-grey q-ma-none">
          Two clicks, and an ordinary picture <br />
          turns into a unique pixel masterpiece.
        </p>
      </div>

      <AutoSlider />
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
import AutoSlider from 'src/components/AutoSlider.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    AutoSlider,
  },
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
    position: relative;

    &-images {
      width: 100%;
      height: 100%;
      position: relative;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    &-info {
      z-index: 2;
    }

    &-brand {
      .q-img {
        width: 30px;
        height: 30px;
      }
    }

    h1 {
      font-weight: bold;
      width: max-content;
      font-size: 3.5vmax;
      line-height: normal;
      background-color: rgba($dark, 0.1);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(5px);

      span {
        color: $primary;
      }
    }

    &-descr {
      font-size: 18px;
      width: max-content;
      font-size: 1.3vmax;
      background-color: rgba($dark, 0.1);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(5px);
    }

    :deep(.auto-slider) {
      position: absolute;
      top: 0;
      right: 10%;

      .auto-slider_list {
        width: 35vw !important;
      }
    }
  }

  &_right {
    width: 400px;
    height: 100%;
    background: $dark-page;
  }
}
</style>
