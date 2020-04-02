import Vue from "vue";
import VueRouter from "vue-router";

import firebase from "firebase";

Vue.use(VueRouter);

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    name: "Home",
    component: lazyLoad("Home"),
    props: true
  },
  {
    path: "/login",
    name: "Login",
    component: lazyLoad("Login"),
    props: true
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: lazyLoad("Dashboard"),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile/:profileId",
    name: "profile",
    component: lazyLoad("Profile"),
    props: true,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  //Fetch correct profile

  // Redirect based on auth status
  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else if (!requiresAuth && currentUser) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
