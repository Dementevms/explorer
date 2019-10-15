<template>
  <div class="explorer">
    <div class="explorer__search">
      <div class="explorer__search-input">
        <input
          placeholder="Input text"
          type="text"
          class="input"
          v-model="input"
          v-on:keyup.enter="search"
        />
      </div>
      <div class="explorer__search-btn">
        <div class="btn" @click="search">Search</div>
      </div>
    </div>
    <div class="explorer__columns">
      <div class="explorer__column-left">
        <Tree v-if="items" :items="items" />
      </div>
      <div class="explorer__column-right">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import tempData from "@/assets/tempData";
import Tree from "@/components/Tree.vue";
export default {
  name: "Explorer",
  components: {
    Tree
  },
  data() {
    return {
      input: null
    };
  },
  mounted() {
    this.$store.state.explorer.items = tempData;
    this.update();
  },
  computed: {
    items() {
      return this.$store.state.explorer.items;
    },
    content() {
      return this.$store.state.explorer.content;
    },
    route(){
      return this.$store.state.explorer.route;
    }
  },
  watch: {
    '$route' (to, from) {
      this.update();
    },
    'route' (value) {
      console.log('value', value);
    }
  },
  methods: {
    update(){
      this.input = this.$router.history.current.query.search;
      if(this.input){
        this.search();
      } else {
        this.router();
      }
    },
    router() {
      const path = this.$router.history.current.path;
      this.$store.dispatch("explorer/router", path);
    },
    search() {
      this.$store.dispatch("explorer/search", this.input);
    }
  }
};
</script>

<style lang="scss">
.explorer {
  padding: 30px;

  &__search {
    display: flex;
    padding: 0 0 15px;
    width: 100%;
  }

  &__search-input {
    width: 100%;
  }

  &__search-btn {
    margin: 0 0 0 15px;
  }

  &__columns {
    display: flex;
  }

  &__columns {
    margin: 0 -7.5px;
  }

  &__column-left,
  &__column-right {
    box-sizing: border-box;
    border: 1px solid var(--dirty-white-color);
    margin: 0 7.5px;
    padding: 15px;
    width: 50%;
    height: calc(100vh - 113px);
  }
}
</style>