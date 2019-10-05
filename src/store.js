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
        route: null
      },
      mutations: {
        toogleItem(state, item) {
          if (item.type === 'folder') {
            state.content = item.title;
          } else {
            state.content = item.content;
          }
          explorer.toogle(item);
          state.route = explorer.route(state.items, item.title);
        },
        search(state, str) {
          explorer.clear(state.items);
          state.route = explorer.search(state.items, str);
        },
        router(state, path) {
          explorer.clear(state.items);
          explorer.router(state.items, path);
        }
      },
      actions: {
        toogleItem({ commit }, item) {
          commit("toogleItem", item);
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
