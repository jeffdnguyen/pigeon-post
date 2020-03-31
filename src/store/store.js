import Vue from "vue";
import Vuex from "vuex";

const fb = require("../firebaseConfig.js");

Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserProfile");
  }
});

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: [],
    hiddenPosts: []
  },
  actions: {
    clearData(context) {
      context.commit("setCurrentUser", null);
      context.commit("setUserProfile", {});
      context.commit("setPosts", null);
    },
    fetchUserProfile(context) {
      fb.usersCollections
        .doc(context.state.currentUser.uid)
        .get()
        .then(result => {
          context.commit("setUserProfile", result.data());
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProfile(context, data) {
      let name = data.name;

      fb.usersCollections
        .doc(context.state.currentUser.uid)
        .update({ name })
        .then(user => {
          fb.postsCollections
            .where("userId", "==", context.state.currentUser.uid)
            .get()
            .then(docs => {
              docs.forEach(doc => {
                fb.postsCollections.doc(doc.id).update({
                  userName: name
                });
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPosts(state, val) {
      state.posts = val;
    }
  }
});
