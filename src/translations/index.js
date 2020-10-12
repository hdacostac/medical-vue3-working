import en from './en.json';
import es from './es.json';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
    locale: 'es',
    messages: {
        en,
        es
    },
    fallbackLocale: 'es'
});

export default i18n;