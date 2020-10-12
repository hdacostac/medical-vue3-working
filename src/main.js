import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ToastService from 'primevue/toastservice';

import en from './translations/en.json';
import es from './translations/es.json';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
    locale: 'es',
    messages: {
        en,
        es
    },
    fallbackLocale: 'es'
});

createApp(App).use(store).use(router).use(ToastService).use(i18n).mount('#app')
