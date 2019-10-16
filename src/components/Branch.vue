<template>
  <div class="branch">
    <div v-for="(item, index) in items" :key="index">
      <div v-if="isArray(item.content)" class="branch__folder">
        <div class="branch__wrapper" :class="{hide: item.hide}">
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
          <span class="branch__title">{{ item.title }}</span>
        </div>
        <Branch v-if="item.open" :items="item.content" />
      </div>
      <div v-else class="branch__file">
        <div @click="toogle(item)" class="branch__wrapper" :class="{hide: item.hide}">
          <svg>
            <use xlink:href="#icon-file" />
          </svg>
          <span class="branch__title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Branch",
  props: {
    title: String,
    items: Array
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    isArray(content){
      return Array.isArray(content);
    },
    toogle(item) {
      this.$explorer.toogle(item);
    }
  }
};
</script>
<style lang="scss">
.branch {
  margin: 0 0 0 15px;
  
  &__wrapper {
    display: flex;
    align-items: center;
    margin: 0 0 5px;

    svg {
      width: 20px;
      height: 20px;
    }

    span {
      display: block;
      margin: 0 0 0 10px;
      font-size: 14px;
      line-height: 20px;
      color: var(--light-grey-color);
    }

    &.hide {
      display: none;
    }
  }
}
</style>