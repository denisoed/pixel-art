import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { createPinia } from 'pinia';
import { createVfm } from 'vue-final-modal';
import Toast from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import 'vue-final-modal/style.css';

createApp(App)
  .use(router)
  .use(Toast)
  .use(createVfm())
  .use(createPinia())
  .mount('#app');
