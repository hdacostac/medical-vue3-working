import { createI18n } from 'vue-i18n';
import es from './es.json';
import ca from './ca.json';
import pt from './pt.json';
import fr from './fr.json';

function getCurrentLanguage() {
    let userLang = navigator.language || navigator.userLanguage;

    let language = userLang.split(',');
    language = language[0].split('-');

    console.log("Lenguage escogido:" + language[0]);

    return language[0];
}

const i18n = createI18n({
    locale: getCurrentLanguage(),
    messages: {
        es,
        ca,
        pt,
        fr
    },
    fallbackLocale: 'es'
});

export default i18n;