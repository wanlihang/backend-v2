import Vue from 'vue'
import Vuex from 'vuex'
import Utils from '@/js/utils';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLogin: false,
    enabledAddons: {}
  },
  mutations: {
    loginHandle(state, user) {
      state.user = user;
      state.isLogin = true;
    },
    logout(state) {
      state.user = null;
      state.isLogin = false;
      Utils.clearToken();
    },
    setEnabledAddons(state, addons) {
      state.enabledAddons = addons;
    }
  },
  actions: {
  },
  modules: {
  }
})
