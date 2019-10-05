<template>
  <div id="app" class="them_light">
    <Explorer />
    <HelloWorld />
  </div>
</template>

<script>
import Explorer from "@/components/Explorer.vue";
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  components: {
    Explorer,
    HelloWorld
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.them {
  &_light {
    --blue-color: #0088bb;
    --dark-blue-color: #0d6586;
    --grey-color: #555555;
    --light-grey-color: #74777b;
    --black-color: #000000;
    --white-color: #ffffff;
    --dirty-white-color: #dddddd;
    --ornge-color: #ffbb44;
    --light-orange-color: #ffcc88;
    --green-color: #01a39d;
    --red-color: #ee1133;
    --light-red-color: #ff5a5a;
  }
}

.btn {
  display: block;
  box-sizing: border-box;
  background-color: var(--blue-color);
  border-radius: 2px;
  padding: 0 30px;
  height: 38px;
  font-family: Arial;
  font-size: 12px;
  line-height: 38px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: var(--white-color);
  transition: all 0.33s ease;

  &:hover {
    cursor: pointer;
    background-color: var(--dark-blue-color);
  }
}

.input {
  display: block;
  box-sizing: border-box;
  background: none;
  border: none;
  outline: none;
  border: 1px solid var(--dirty-white-color);
  padding: 10px;
  width: 100%;
  font-size: 14px;

  &::placeholder {
    font-size: 14px;
    color: var(--dirty-white-color);
  }
}

.disabled {
  opacity: 0.5;
}
</style>
