import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; //需要注意的是，样式文件需要单独引入
import App from './App.vue';
import router from './router';
import store from './store';
import api from './js/request/request';
import i18n from './js/i18n';
import utils from './js/utils';
import moment from 'moment'


// 全局样式
import './assets/common/variable.less';
import './assets/common/iconfont/iconfont.css';

// markdown编辑器
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

// 全局组件
import FormLabelComp from '@/components/form-label';
import BackBar from '@/components/back-bar';
import HelperText from '@/components/helper-text';
import PLink from '@/components/permission/link';
import PButton from '@/components/permission/btn';


Vue.use(ElementUI);

// 组件注册
Vue.use(mavonEditor);
Vue.prototype.moment = moment;
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm') {
  if (!dateStr) {
    return dateStr;
  }
  return moment(dateStr).format(pattern);
})
Vue.component('FormLabel', FormLabelComp);
Vue.component('BackBar', BackBar);
Vue.component('HelperText', HelperText);
Vue.component('PLink', PLink);
Vue.component('PButton', PButton);

Vue.config.productionTip = false;

// api挂载
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')