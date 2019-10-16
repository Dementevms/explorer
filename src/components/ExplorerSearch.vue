<template>
  <div class="explorer-search">
    <input
      type="text"
      class="input"
      v-model="input"
      v-on:keyup.enter="search"
      @change="clear"
    />
    <div class="btn" @click="search">Search</div>
  </div>
</template>

<script>
export default {
  name: "ExplorerSearch",
  data() {
    return {
      input: null
    };
  },
  mounted(){
    this.$explorer.search();
  },
  methods: {
    search() {
      this.$explorer.search(this.input);
    },
    clear(){
      if(!this.input){
        this.$explorer.clear();
      }
    }
  }
};
</script>

<style lang="scss">
.explorer-search {
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
