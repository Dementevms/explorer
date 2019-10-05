<template>
  <div class="hello">
    <input v-model="input" type="text" class="input" />
    <div class="btn" @click="search">Search</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      input: null
    };
  },
  methods: {
    search() {
      this.$store.dispatch("explorer/search", this.input);
    }
  }
};
</script>

<style lang="scss">
.hello {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: var(--white-color);
  border: 1px solid var(--dirty-white-color);
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.15);
  padding: 15px;
  width: 360px;
  position: absolute;
  right: 60px;
  bottom: 60px;

  .input {
    margin: 0 10px 0 0;
  }
}
</style>
