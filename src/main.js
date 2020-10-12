import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Prime components
import ToastService from 'primevue/toastservice';

// i18n configuration
import i18n from './translations';

// Rest configuration
import { restServicesUrl, oauthServerUrl } from "../application-properties.json";

import {init as initRestServiceHandler} from '@/configuration/rest.config';
import {init as initOAuthServiceHandler} from '@/configuration/oauth.config'; 

initRestServiceHandler(restServicesUrl);
initOAuthServiceHandler(oauthServerUrl);

const app = createApp(App);

app.use(store).use(router).use(ToastService).use(i18n).mount('#app');
