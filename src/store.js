import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    content: null
  },

  mutations: {
    openFolder(state, item) {
      state.content = item.title;
    },

    openFile(state, item) {
      state.content = item.content;
    }
  },

  actions: {
    openFolder({ commit }, item) {
      commit("openFolder", item);
    },

    openFile({ commit }, item) {
      commit("openFile", item);
    }
  }
});
