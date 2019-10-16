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
        path: "/"
      },
      mutations: {
        toogle(state, item) {
          item.open = !item.open;
          state.content = explorer.getContent(item);
          state.path = explorer.getPath(state.items, item);
        },
        search(state, str) {
          const item = explorer.onSearch(state.items, str);
          state.content = explorer.getContent(item);
          state.path = `/?search=${str}`;
        },
        router(state, path) {
          const item = explorer.onRouter(state.items, path);
          state.content = explorer.getContent(item);
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
        }
      }
    }
  }
});
