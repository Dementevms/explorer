import Vue from "vue";
import Vuex from "vuex";
import Explorer from "@/modules/explorer";
const explorer = new Explorer();
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    explorer: {
      namespaced: true,
      state: {
        items: null,
        content: null,
        route: "/"
      },
      mutations: {
        toogle(state, item) {
          explorer.toogle(item);
          explorer.content(item);
          state.route = explorer.route(state.items, item);
        },
        search(state, str) {
          state.content = null;
          explorer.clear(state.items);
          explorer.search(state.items, str);
          state.route = `/?search=${str}`;
        },
        router(state, path) {
          state.content = null;
          explorer.clear(state.items);
          const content = explorer.router(state.items, path);
          state.content = explorer.content(content);
        },
        root(state) {
          state.content = null;
          explorer.root(state.items);
        },
        clear(state) {
          state.content = null;
          explorer.clear(state.items);
        }
      },
      actions: {
        toogle({ commit }, item) {
          commit("toogle", item);
        },
        search({ commit }, str) {
          commit("search", str);
        },
        router({ commit }, path) {
          commit("router", path);
        },
        root({ commit }) {
          commit("root");
        },
        clear({ commit }) {
          commit("clear");
        }
      }
    }
  }
});
