<template>
  <div class="explorer">
    <div class="explorer__search">
      <div class="explorer__search-input">
        <input 
          placeholder="Input text" 
          type="text" 
          class="input"
          v-model="input"
        >
      </div>
      <div class="explorer__search-btn">
        <div 
          class="btn"
          @click="search"
        >Search</div>
      </div>
    </div>
    <div class="explorer__columns">
      <div class="explorer__column-left">
        <Tree 
          v-if="items" 
          :items="items" 
        />
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
      title: null,
      items: null,
      input: null
    };
  },
  mounted() {
    this.items = tempData;
    this.router();
  },
  computed:{
    content(){
      return this.$store.state.content;
    }
  },
  methods: {

    search(){
      console.log('search', this.input);
      console.log('this.items', this.items);
      this.action("open", false);
      this.action("hide", true);
      const filter = this.filter(this.items, this.input);
      this.$router.push(filter.path);
      console.log('filter', filter);
    },

    router() {
      const path = this.$router.history.current.path;
      this.action("open", true, path);
      this.action("hide", false, path);
    },

    map(items) {
      const result = [];
      items.forEach(item => {
        let path = `/${item.title}`;
        if (item.type === "folder" && item.content) {
          const array = this.search(item.content);
          array.forEach(elem => {
            let _p = path + `${elem}`;
            result.push(_p);
          });
        }
        result.push(path);
      });
      return result;
    },

    execute(items, path, callback) {
      const array = path.split("/");
      array.shift();
      items.forEach(item => {
        if (item.title === array[0]) {
          callback(item);
          path = array.join("/");
          if (item.type === "folder" && item.content) {
            this.execute(item.content, path, callback);
          }
        }
      });
    },

    executeAll(items, callback) {
      items.forEach(item => {
        callback(item);
        if (item.type === "folder" && item.content) {
          this.executeAll(item.content, callback);
        }
      });
    },

    action(name, value, path) {
      const callback = item => (item[name] = value);
      if (path) {
        this.execute(this.items, path, callback);
      } else {
        this.executeAll(this.items, callback);
      }
    },

    filter(items, str) {
      const result = {
        match: false,
        path: '/'
      }
      items.forEach(item => {
        if (item.title === str) {
          result.match = true;
          result.path += item.title;
          item.open = true;
          item.hide = false;
        }
        if (item.type === "folder" && item.content) {
          const _result = this.filter(item.content, str);
          if (_result.match) {
            result.match = true;
            result.path += item.title +_result.path;
            item.open = true;
            item.hide = false;
          }
        }
      });
      return result;
    }
  }
};
</script>

<style lang="scss">
.explorer {
  padding: 30px;

  &__search{
    display: flex;
    padding: 0 0 15px;
    width: 100%;
  }

  &__search-input{
    width: 100%;
  }

  &__search-btn{
    margin: 0 0 0 15px;
  }

  &__columns{
    display: flex;

  }

  &__columns{
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