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
  }
};
</script>

<style>
body {
  padding: 20px;
  height: 200vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
