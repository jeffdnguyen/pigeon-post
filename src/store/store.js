import Vue from "vue";
import Vuex from "vuex";

const fb = require("../firebaseConfig.js");

Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserProfile", user);

    // UPDATE USER PROFILE
    // fb.usersCollections.doc(user.uid).onSnapshot(doc => {
    //   store.commit('setUserProfile', doc.data())
    // })

    fb.postsCollections.orderBy("createdOn", "desc").onSnapshot(snapshot => {
      let postsArray = [];

      snapshot.forEach(doc => {
        let post = doc.data();
        post.id = doc.id;
        postsArray.push(post);
      });

      store.commit("setPosts", postsArray);
    });
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
    fetchUserProfile(context, data) {
      let currentUser;
      if (typeof data == "object") {
        currentUser = data.uid;
      } else {
        currentUser = data;
      }
      fb.usersCollections
        .doc(currentUser)
        .get()
        .then(result => {
          let profile = result.data();
          profile.id = result.id;
          context.commit("setUserProfile", profile); //result.data()
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
