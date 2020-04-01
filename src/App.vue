<template>
  <div id="app">
    <Navigation v-if="currentUser"></Navigation>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "@/components/Navigation.vue";

import lax from "lax.js";

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapState(["currentUser"])
  },
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
/* Media query: Mobile devices (Using iPhone X as the standard) */
@media only screen and (max-device-width: 812px) {
  #app {
    flex-direction: column;
    margin-left: 0pt;
  }
}
</style>
