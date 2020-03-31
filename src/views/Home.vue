<template>
  <div class="home">
    <FlyingPigeon></FlyingPigeon>
  </div>
</template>

<script>
// @ is an alias to /src
import FlyingPigeon from "@/components/FlyingPigeon.vue";

export default {
  name: "Home",
  components: {
    FlyingPigeon
  }
};
</script>
