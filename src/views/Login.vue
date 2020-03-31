<template>
  <div id="login">
    <transition name="fade">
      <div v-show="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <section>
      <div class="col1">
        <h1>pigeon_post</h1>
        <p>social media done right and by right we mean carrier pigeons</p>
      </div>
      <div class="col2">
        <form v-if="showLoginForm && !showForgotPassword" @submit.prevent>
          <h1>Log in</h1>
          <label for="email1">Email</label>
          <input
            v-model.trim="loginForm.email"
            type="text"
            placeholder="Enter your email here"
            id="email1"
          />
          <label for="password1">Password</label>
          <input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="Enter your password here"
            id="password1"
          />
          <button @click="login" class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset">Forgot Password</a>
            <a @click="toggleForm">Sign up</a>
          </div>
        </form>
        <form v-else-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          <h1>Get Started</h1>
          <label for="name">Name</label>
          <input
            v-model.trim="signupForm.name"
            type="text"
            placeholder="Enter your name here"
            id="name"
          />
          <label for="email2">Email</label>
          <input
            v-model.trim="signupForm.email"
            type="text"
            placeholder="Enter your email here"
            id="email2"
          />
          <label for="password2">Password</label>
          <input
            v-model.trim="signupForm.password"
            type="password"
            placeholder="Enter your password here"
            id="password2"
          />
          <button @click="signup" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm">Back to Log In</a>
          </div>
        </form>
        <form v-else class="password-reset" @submit.prevent>
          <div v-if="!passwordResetSuccess">
            <h1>Reset Password</h1>
            <p>We will send you an email to reset your password</p>

            <label for="email3">Email</label>
            <input
              v-model.trim="passwordForm.email"
              type="text"
              placeholder="Enter your email here"
              id="email3"
            />
            <button @click="resetPassword" class="button">Submit</button>
            <div class="extras">
              <a @click="togglePasswordReset">Back to Log In</a>
            </div>
          </div>
          <div v-else>
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
