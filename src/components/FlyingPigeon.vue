<template>
  <div class="pigeon" data-lax-preset="fadeInOut leftToRight"></div>
</template>

<script>
import lax from "lax.js";

export default {
  mounted: function() {
    lax.addElement(this.$el); // add your element to lax when it mounts
  }
};
</script>

<style>
.pigeon {
  width: 200pt;
  height: 200pt;
  background: blue;
  border-radius: 100pt;
  margin-top: 50vh;
  position: absolute;
}
</style>