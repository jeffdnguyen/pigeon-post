<template>
  <div class="home">
    <section class="section container">
      <div id="title">
        <div class="logo">
          <h1>Pigeon Post</h1>
          <img src="../assets/orange_pigeon.png" />
        </div>
        <p>A messaging platform powered by carrier pigeons</p>
      </div>
    </section>
    <section class="section" id="section1">
      <FlyingPigeon :style="pigeon1"></FlyingPigeon>
      <FlyingPigeon :style="pigeon2"></FlyingPigeon>
      <FlyingPigeon :style="pigeon3"></FlyingPigeon>
      <FlyingPigeon :style="pigeon4"></FlyingPigeon>
      <FlyingPigeon :style="pigeon5"></FlyingPigeon>
      <FlyingPigeon :style="pigeon6"></FlyingPigeon>
      <FlyingPigeon :style="pigeon7"></FlyingPigeon>
    </section>
    <section class="section container" id="info">
      <div id="title">
        <h1>Messages sent through the cloud. Literally.</h1>
        <p>
          You've heard of software as a service. Now it's time for pigeons as a
          service. Communication has never been more contrived.
        </p>
        <br />
        <h2>Putting the long back in long distance communication</h2>
        <p>
          With Pigeon Post, your messages will take 3-7 days to safely and
          securely arrive. With the latest innovation in bird tech, we are able
          to deliver messages up to 75g(2.5oz) anywhere around the while, all
          while remaining completely immune to cyber attacks
        </p>
        <p>
          Inspired by Cher Ami, a homing pigeon awarded the French Croix de
          guerre for her heroic service in WWI, our pigeons operate around the
          clock, 24/7
        </p>
      </div>
    </section>
    <section class="section" id="section2">
      <SpinningBlock></SpinningBlock>
      <img id="envelope" src="../assets/envelope_opened.png" />
      <a @click="login" class="button">
        <strong>Get Started</strong>
      </a>
      <!-- <div class="access-box">
        <h1>Send your first message today</h1>
        <div>
          <a class="button">
            <strong>Get Started</strong>
          </a>
        </div>
      </div>-->
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import FlyingPigeon from "@/components/FlyingPigeon.vue";
import SpinningBlock from "@/components/SpinningBlock.vue";

export default {
  name: "Home",
  data() {
    return {
      pigeon1: {
        "margin-left": "-20%"
      },
      pigeon2: {
        top: "30%",
        "margin-left": "0" //  "-300pt"
      },
      pigeon3: {
        top: "10%",
        "margin-left": "-55%" //"500pt"
      },
      pigeon4: {
        top: "20%",
        "margin-left": "-65%" //"-200pt"
      },
      pigeon5: {
        top: "15%",
        "margin-left": "0" //"-100pt"
      },
      pigeon6: {
        top: "25%",
        "margin-left": "-40%" //"300pt"
      },
      pigeon7: {
        "margin-left": "-75%" //"-600pt"
      }
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    }
  },
  components: {
    FlyingPigeon,
    SpinningBlock
  }
};
</script>

<style>
.container {
  margin: auto;
  padding: 0 10%;
  height: 100vh;
  text-align: center;
}

#title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 100px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding-left: 20px;
}

.logo h1 {
  display: inline;
}

.logo img {
  height: 50pt;
  width: 50pt;
}

.section {
  display: block;
  position: relative;
}

#section1 {
  height: 500pt;
}

#info {
  height: auto;
}

#section2 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  padding-top: 5%;
}

#envelope {
  height: 200pt;
  width: 200pt;
}

.access-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  text-align: center;
  background-color: rgb(243, 144, 13);
  color: #f3f4f5;

  box-shadow: 3px 4px 0px 0px rgb(175, 119, 28);
  border-radius: 28px;
  height: 25vh;
  width: 75vw;
}

.button {
  text-decoration: none;
  color: #f3f4f5;
  background-color: rgb(243, 144, 13);

  box-shadow: 3px 4px 0px 0px rgb(175, 119, 28);
  border-radius: 28px;

  margin-top: 20px;
  padding: 10px 15px;
}
</style>
