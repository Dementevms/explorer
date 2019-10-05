<template>
  <div class="tree">
    <TreeItem :items="items" />
  </div>
</template>
<script>
import TreeItem from "@/components/TreeItem.vue";
export default {
  name: "Tree",
  props: {
    items: Array
  },
  components: {
    TreeItem
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="scss">
.tree {
  margin: 0 0 0 -15px;

  &__item {
  }

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

  &__folder {
    margin: 0 0 0 15px;
  }

  &__file {
    margin: 0 0 0 15px;
  }
}
</style>