<template>
  <div class="home">
    <section class="section" id="header">
      <div id="title">
        <h1>Pigeon Post</h1>
        <p>A messaging platform powered by carrier pigeons</p>
        <img src="../assets/logo.png" />
      </div>
    </section>
    <section class="section" id="section1">
      <FlyingPigeon :style="pigeon1" data-lax-preset="leftToRight"></FlyingPigeon>
      <FlyingPigeon :style="pigeon2" data-lax-preset="leftToRight"></FlyingPigeon>
      <FlyingPigeon :style="pigeon3" data-lax-preset="leftToRight"></FlyingPigeon>
    </section>
    <section class="section" id="section2">
      <FlyingPigeon :style="pigeon4" data-lax-preset="rightToLeft"></FlyingPigeon>
      <FlyingPigeon :style="pigeon5" data-lax-preset="rightToLeft"></FlyingPigeon>
      <FlyingPigeon :style="pigeon6" data-lax-preset="rightToLeft"></FlyingPigeon>
      <FlyingPigeon :style="pigeon7" data-lax-preset="rightToLeft"></FlyingPigeon>
      <FlyingPigeon :style="pigeon8" data-lax-preset="leftToRight"></FlyingPigeon>
    </section>
    <section class="section" id="header">
      <div id="title">
        <h1>Messages sent through the cloud. Literally.</h1>
        <p>You've heard of software as a service. Now it's time for pigeons as a service. Communication has never been more contrived.</p>
        <br />
        <h2>We put the long in long distance communication</h2>
        <p>With Pigeon Post, your messages will take 3-7 days to safely and securely arrive. With the latest innovation in bird tech, we are able to deliver messages up to 75g(2.5oz) anywhere around the while, all while remaining completely immune to cyber attacks</p>
        <p>Inspired by Cher Ami, a homing pigeon awarded the French Croix de guerre for her heroic service in WWI, our pigeons operate around the clock, 24/7</p>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import FlyingPigeon from "@/components/FlyingPigeon.vue";

export default {
  name: "Home",
  data() {
    return {
      pigeon1: {
        left: "0pt"
      },
      pigeon2: {
        left: "-300pt"
      },
      pigeon3: {
        top: "50pt",
        left: "100pt"
      },
      pigeon4: {
        top: "-50pt",
        right: "300pt"
      },
      pigeon5: {
        right: "0pt"
      },
      pigeon6: {
        right: "-200pt"
      },
      pigeon7: {
        top: "100pt",
        right: "100pt"
      },
      pigeon8: {
        top: "-100pt",
        left: "-100pt"
      }
    };
  },
  components: {
    FlyingPigeon
  }
};
</script>

<style>
#header {
  height: 100vh;
  text-align: center;
}

#title {
  margin: auto;
  padding-top: 100px;
  height: 5vh;
}

.section {
  display: block;
  position: relative;
}

#section1 {
  height: 200pt;
}

#section2 {
  height: 200pt;
}
</style>
