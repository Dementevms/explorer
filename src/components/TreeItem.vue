<template>
  <div class="tree__item">
    <div v-for="(item, index) in items" :key="index">
      <div v-if="item.type === 'folder'" class="folder">
        <div 
          class="tree__wrapper"
          :class="{hide: item.hide}"  
        >
          <svg v-if="item.open"><use xlink:href="#icon-folder-open"></use></svg>
          <svg v-else ><use xlink:href="#icon-folder"></use></svg>
          <span class="title">{{ item.title }}</span>
        </div>
        <TreeItem 
          v-if="item.open" 
          v-bind:items="item.content"
        />
      </div>
      <div v-else class="file">
        <div 
          @click="openFile" 
          class="tree__wrapper"
          :class="{hide: item.hide}"
        >
          <svg><use xlink:href="#icon-file"></use></svg>
          <span class="title">{{ item.title }}</span>
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
  mounted() {

  },
  methods:{
    openFile(){
      this.$store.dispatch('openFile');
    }
  }
};
</script>