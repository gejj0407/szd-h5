import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    userInfo: null,
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  getters: {
    userInfo: state => state.userInfo,
  },
  actions: {},
  modules: {}
});
