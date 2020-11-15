import { createI18n } from 'vue-i18n';
import { setLocale } from 'yup';
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

setLocale({
    // use constant translation keys for messages without values
    mixed: {
        required: () => ({ key: 'global.field.required' }),
    },
    string: {
        max: ({ max }) => ({ key: 'global.field.max.length', values: { max } })
    },
    // use functions to generate an error object that includes the value from the schema
    number: {
        min: ({ min }) => ({ key: 'field_too_short', values: { min } }),
        max: ({ max }) => ({ key: 'field_too_big', values: { max } }),
    },
});

export default i18n;