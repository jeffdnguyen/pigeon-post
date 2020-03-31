<template>
  <div class="lax pigeon-flying" data-lax-preset="speedy">PIGEON</div>
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
  background-color: orange;
  position: absolute;
}
</style>