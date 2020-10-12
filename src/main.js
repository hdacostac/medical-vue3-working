import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Prime components
import ToastService from 'primevue/toastservice';

// i18n configuration
import i18n from './translations';

const app = createApp(App);

app.use(store).use(router).use(ToastService).use(i18n).mount('#app');
