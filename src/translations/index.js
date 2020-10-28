import { createI18n } from 'vue-i18n';
import es from './es.json';
import ca from './ca.json';
import pt from './pt.json';
import fr from './fr.json';

const i18n = createI18n({
    locale: 'es',
    messages: {
        es,
        ca,
        pt,
        fr
    },
    fallbackLocale: 'es'
});

export default i18n;