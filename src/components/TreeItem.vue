<template>
  <div class="tree__item">
    <div v-for="(item, index) in items" :key="index">
      <div v-if="item.type === 'folder'" class="tree__folder">
        <div class="tree__wrapper" :class="{hide: item.hide}">
          <template v-if="item.content.length > 0">
            <svg @click="toogle(item)">
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
        <div @click="toogle(item)" class="tree__wrapper" :class="{hide: item.hide}">
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
    toogle(item) {
      this.$store.dispatch("explorer/toogle", item);
      if (
        this.$router.history.current.path !== this.$store.state.explorer.route
      ) {
        this.$router.push(this.$store.state.explorer.route);
      }
    }
  }
};
</script>