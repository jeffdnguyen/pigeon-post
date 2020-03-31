<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import lax from "lax.js";

export default {
  created() {
    lax.setup();

    document.addEventListener(
      "scroll",
      function() {
        lax.update(window.scrollY);
      },
      false
    );

    document.add;
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f3f4f5;
}

#app {
  font-family: "Monserrat", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  color: #191818;
}
</style>
