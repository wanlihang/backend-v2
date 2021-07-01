import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
import messages from './lang/index'
Vue.use(VueI18n);
const i18n = new VueI18n({
     locale: localStorage.getItem('LANGUAGE') || 'zh',//防止刷新浏览器恢复默认值
     messages 
});

locale.i18n((key, value) => i18n.t(key, value)) //兼容element
export default i18n;