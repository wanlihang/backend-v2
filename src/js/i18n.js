import Vue from 'vue';
import ElementLocale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n';
import messages from './lang/index';

Vue.use(VueI18n);

const i18n = new VueI18n({
     locale: 'zh',
     messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n;