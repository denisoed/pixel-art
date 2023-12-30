import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { createPinia } from 'pinia';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

createApp(App).use(router).use(Toast).use(createPinia()).mount('#app');
