<template>
  <div class="tree__item">
    <div v-for="(item, index) in items" :key="index">
      <div v-if="item.type === 'folder'" class="tree__folder">
        <div 
          class="tree__wrapper"
          :class="{hide: item.hide}"  
        >
          <svg 
            v-if="item.open"
            @click="toogleItem(item)"
          >
            <use xlink:href="#icon-folder-open"></use>
          </svg>
          <svg 
            v-else
            @click="toogleItem(item)" 
          >
            <use xlink:href="#icon-folder"></use>
          </svg>
          <span class="tree__title">{{ item.title }}</span>
        </div>
        <TreeItem 
          v-if="item.open" 
          v-bind:items="item.content"
        />
      </div>
      <div v-else class="tree__file">
        <div 
          @click="toogleItem(item)" 
          class="tree__wrapper"
          :class="{hide: item.hide}"
        >
          <svg><use xlink:href="#icon-file"></use></svg>
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
  mounted() {

  },
  methods:{
    toogleItem(item){
      item.open = !item.open;
      if(item.type === 'folder'){
        this.$store.dispatch('openFolder', item);
      } 
      if(item.type === 'file'){
        this.$store.dispatch('openFile', item);
      } 
    }
  }
};
</script>