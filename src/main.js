import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';
import store from './store';

// Prime components
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import SplitButton from 'primevue/splitbutton';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

// i18n configuration
import i18n from './translations';

// Rest configuration
import { restServicesUrl, oauthServerUrl } from "../application-properties.json";
import { init as initRestServiceHandler } from '@/configuration/rest.config';
import { init as initOAuthServiceHandler } from '@/configuration/oauth.config'; 

initRestServiceHandler(restServicesUrl);
initOAuthServiceHandler(oauthServerUrl);

const app = createApp(App);

app.use(PrimeVue, {ripple: true});
app.component('PrimeInputText', InputText);
app.component('PrimeRadioButton', RadioButton);
app.component('PrimeDropdown', Dropdown);
app.component('PrimeCalendar', Calendar);
app.component('PrimeButton', Button);
app.component('PrimeToolbar', Toolbar);
app.component('PrimeSplitButton', SplitButton);
app.component('Toast', Toast);

app.use(PrimeVue, {
    locale: {
        monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    }
});

app.use(store).use(router).use(ToastService).use(i18n).mount('#app');
