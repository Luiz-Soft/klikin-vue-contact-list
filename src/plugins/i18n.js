import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/locales/en.json';
import es from '@/locales/es.json';
import pt from '@/locales/pt.json';
import fr from '@/locales/fr.json';

Vue.use(VueI18n);

const messages = {
  en,
  es,
  pt,
  fr
};

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages, 
});

Vue.prototype.$t = function (key) {
  return i18n.t(key);
};

export default i18n;