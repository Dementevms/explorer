<template>
  <div class="explorer">
    <div class="explorer__search">
      <div class="explorer__search-input">
        <input placeholder="Input text" type="text" class="input">
      </div>
      <div class="explorer__search-btn">
        <div class="btn">Search</div>
      </div>
    </div>
    <div class="explorer__columns">
      <div class="explorer__column-left">
        <Tree v-if="items" :title="title" :items="items" />
      </div>
      <div class="explorer__column-right"></div>
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
      search: null
    };
  },
  mounted() {
    this.items = tempData;
  },
  methods: {
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
      let match = false;
      items.forEach(item => {
        if (item.title === str) {
          match = true;
          item.open = true;
          item.hide = false;
        }
        if (item.type === "folder" && item.content) {
          if (this.filter(item.content, str)) {
            match = true;
            item.open = true;
            item.hide = false;
          }
        }
      });
      return match;
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