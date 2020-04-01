<template>
  <header>
    <section>
      <div class="col1">
        <ul class="links">
          <li>
            <router-link to="dashboard"
              ><img id="logo" src="../assets/orange_pigeon.png"
            /></router-link>
          </li>
          <li><router-link to="dashboard">Home</router-link></li>
          <li><router-link to="profile">Profile</router-link></li>
          <li><a @click="logout">Log out</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
const fb = require("../firebaseConfig.js");

export default {
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.col1 {
  position: fixed;
  top: 0;
  left: 0;

  // background-color: red;
  width: 150pt;

  #logo {
    width: 75pt;
    height: 75pt;
  }

  .links {
    font-weight: bold;
    font-size: 15pt;
    list-style: none;
    li {
      margin: 5pt 5pt 20pt 0pt;
      a {
        cursor: pointer;
        text-decoration: none;
        color: inherit;

        &:hover {
          color: lighten(#ff6600, 5%);
        }
      }
    }
  }
}
@media only screen and (max-device-width: 812px) {
  .col1 {
    height: 50pt;
    width: 100%;
    position: static;
    #logo {
      width: 50pt;
      height: 50pt;
    }

    .links {
      padding: 0;
      margin-top: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 11pt;
      li {
        margin: 0pt 20pt 0pt 0pt;
        a {
          cursor: pointer;
          text-decoration: none;
          color: inherit;

          &:hover {
            color: lighten(#ff6600, 5%);
          }
        }
      }
    }
  }
}
</style>
