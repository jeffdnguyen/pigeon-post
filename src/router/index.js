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
    component: lazyLoad("Home")
  },
  {
    path: "/login",
    name: "Login",
    component: lazyLoad("Login")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: lazyLoad("Dashboard"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: lazyLoad("Profile"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

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
