<template>
  <div id="login">
    <transition name="fade">
      <div v-show="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <section>
      <div class="login">
        <form v-if="showLoginForm && !showForgotPassword" @submit.prevent>
          <div class="logo">
            <h1>Pigeon Post</h1>
            <img src="../assets/orange_pigeon.png" />
          </div>
          <input
            v-model.trim="loginForm.email"
            type="text"
            placeholder="email"
            id="email1"
          />
          <input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="password"
            id="password1"
          />
          <button @click="login" class="button">LOGIN</button>
          <div class="extras">
            <a @click="togglePasswordReset"
              ><span class="gray-text">Forgot Your Password? </span> Reset
              Password</a
            >
            <a @click="toggleForm"
              ><span class="gray-text">Not Registered? </span>Sign Up</a
            >
          </div>
        </form>
        <form v-else-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          <h1>Get Started</h1>
          <input
            v-model.trim="signupForm.name"
            type="text"
            placeholder="name"
            id="name"
          />
          <input
            v-model.trim="signupForm.email"
            type="text"
            placeholder="email"
            id="email2"
          />
          <input
            v-model.trim="signupForm.password"
            type="password"
            placeholder="password"
            id="password2"
          />
          <button @click="signup" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm"
              ><span class="gray-text">Already Registered? </span>Log In</a
            >
          </div>
        </form>
        <form v-else @submit.prevent>
          <div v-if="!passwordResetSuccess" class="password-form">
            <h1>Reset Password</h1>
            <input
              v-model.trim="passwordForm.email"
              type="text"
              placeholder="email"
              id="email3"
            />
            <button @click="resetPassword" class="button">Submit</button>
            <div class="extras">
              <a @click="togglePasswordReset">Back to Log In</a>
            </div>
          </div>
          <div v-else class="password-form">
            <h1>Email Sent</h1>
            <p>Check your email for a link to reset your password</p>
            <button @click="togglePasswordReset" class="button">
              Back to Log In
            </button>
          </div>
        </form>
        <transition name="fade">
          <div v-show="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
const fb = require("../firebaseConfig.js");

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        email: "",
        password: ""
      },
      passwordForm: {
        email: ""
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: ""
    };
  },
  methods: {
    resetPassword() {
      this.performingRequest = true;
      this.errorMsg = "";

      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false;
          this.passwordResetSuccess = true;
          this.passwordForm.email = "";
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.errorMsg = "";
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordResetSuccess = false;
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },
    signup() {
      this.performingRequest = true;

      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);

          fb.usersCollections
            .doc(user.user.uid)
            .set({
              name: this.signupForm.name
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.performingRequest = false;
              this.$router.push("/dashboard");
            })
            .catch(err => {
              console.log(err);
              this.performingRequest = false;
              this.errorMsg = err.message;
            });
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    login() {
      this.performingRequest = true;

      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    }
  }
};
</script>

<style scoped>
#login {
  background-color: #ff6600cb;
  margin: auto;
  padding: 0 10%;
  height: 100vh;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
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

.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(#34495e, 1);
  z-index: 9999;
}

.loading p {
  background-color: white;
  width: 150px;
  text-align: center;
  margin: 40vh auto 0;
  padding: 40px 0;
  border-radius: 28px;
  box-shadow: 0 0 20px 0 rgba(#34495e, 1);
}

.login {
  margin: auto;
  height: 50vh;
  width: 30vw;

  font-size: 16px;

  background-color: #f3f4f5;
  box-shadow: 3px 6px 10px 0px rgb(128, 80, 18);
  border-radius: 28px;
}

/* Media query: Mobile devices (Using iPhone X as the standard) */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) {
  .login {
    width: 75vw;
  }
}

.login form,
.login form div.password-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.login input,
.login div input {
  background: #e3e4e5;
  border: none;
  border-radius: 28px;

  margin: 15pt 15pt 1pt 15pt;
  padding: 10pt;

  height: 10pt;
  width: auto;
}

.login .extras,
.login div .extras {
  color: #ff6600;
  font-size: 75%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 25pt;
  padding-right: 5pt;
  padding-bottom: 5pt;
}

.password-form p {
  margin: 15pt;
}

.error-msg {
  color: #f3f4f5;
}

.gray-text {
  color: #939495;
}

.button {
  text-decoration: none;
  color: #f3f4f5;
  background-color: #ff6600;

  border: none;
  /* box-shadow: 3px 4px 0px 0px rgb(175, 119, 28); */
  border-radius: 28px;

  margin: 15pt;
  padding: 10pt;
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
