import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './lang/index'
Vue.use(VueI18n);
const i18n = new VueI18n({
     locale: localStorage.getItem('LANGUAGE') || 'zh',//防止刷新浏览器恢复默认值
     messages 
});
export default i18n;