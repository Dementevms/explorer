export default {
  install(Vue, options) {
    Vue.prototype.$explorer = {
      $router: options.router,
      $store: options.store,
      toogle(item){
        this.$store.dispatch("explorer/toogle", item);
        this._routerPush();
      },
      search(value) {
        if (value) {
          this.$store.dispatch("explorer/search", value);
          this._routerPush();
        }
      },
      clear() {
        this.$router.push("/");
        this.$store.dispatch("explorer/router", "/");
      },
      _routerPush(){
        const fullPath = this.$router.history.current.fullPath;
        const path = this.$store.state.explorer.path;
        if (fullPath !== path) {
          this.$router.push(this.$store.state.explorer.path);
        }
      }
    };
  }
};
