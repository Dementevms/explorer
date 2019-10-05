<template>
  <div class="tree__item">
    <div v-for="(item, index) in items" :key="index">
      <div v-if="item.type === 'folder'" class="tree__folder">
        <div class="tree__wrapper" :class="{hide: item.hide}">
          <template v-if="item.content.length > 0">
            <svg @click="toogleItem(item)">
              <use v-if="item.open" xlink:href="#icon-folder-open" />
              <use v-else xlink:href="#icon-folder" />
            </svg>
          </template>
          <template v-else>
            <svg class="disabled">
              <use xlink:href="#icon-folder" />
            </svg>
          </template>
          <span class="tree__title">{{ item.title }}</span>
        </div>
        <TreeItem v-if="item.open" v-bind:items="item.content" />
      </div>
      <div v-else class="tree__file">
        <div @click="toogleItem(item)" class="tree__wrapper" :class="{hide: item.hide}">
          <svg>
            <use xlink:href="#icon-file" />
          </svg>
          <span class="tree__title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    title: String,
    items: Array
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toogleItem(item) {
      this.$store.dispatch("explorer/toogleItem", item);
      if (
        this.$router.history.current.path !== this.$store.state.explorer.route
      ) {
        this.$router.push(this.$store.state.explorer.route);
      }
    }
  }
};
</script>