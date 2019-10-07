<template>
  <div class="my-component">
    <div class="btn my-component__btn" @click="root">Root</div>
    <div class="btn my-component__btn" @click="clear">Clear</div>
  </div>
</template>

<script>
export default {
  name: "MyComponet",
  methods: {
    root() {
      this.$store.dispatch("explorer/root");
      if (
        this.$router.history.current.path !== this.$store.state.explorer.route
      ) {
        this.$router.push("/");
      }
    },
    clear() {
      this.$store.dispatch("explorer/clear");
      if (
        this.$router.history.current.path !== this.$store.state.explorer.route
      ) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss">
.my-component {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: var(--white-color);
  border: 1px solid var(--dirty-white-color);
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.15);
  padding: 15px;
  position: absolute;
  left: 60px;
  bottom: 60px;

  &__btn {
    &:first-child {
      margin: 0 15px 0 0;
    }
  }
}
</style>