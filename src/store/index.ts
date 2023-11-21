import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false
  },
  getters: {
  },
  mutations: {
    SET_LOGIN_STATE(state, status) {
      state.isLoggedIn = status;
    }
  },
  actions: {
    login({ commit }) {
      // 这里可以添加登录逻辑，比如发送 API 请求
      // 假设登录成功，更新状态
      commit('SET_LOGIN_STATE', true);
    },
    // 还可以添加登出的 action
    logout({ commit }) {
      commit('SET_LOGIN_STATE', false);
    }
  },
  modules: {
  }
})
