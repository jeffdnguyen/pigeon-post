<template>
  <img
    class="lax pigeon-flying"
    data-lax-preset="leftToRight fadeInOut"
    src="../assets/orange_pigeon.png"
  />
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
.pigeon-flying {
  position: absolute;
  height: 100pt;
  width: 100pt;
}
</style>