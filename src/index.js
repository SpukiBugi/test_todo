"use strict";

import "@babel/polyfill";
import "isomorphic-fetch";
import "classlist-polyfill";
import "regenerator-runtime";

import Vue from "vue";
import App from "@/vue/app.vue";
import VueRouter from "vue-router";

import "@/assets/scss/style.scss";

import store from "@/store/store.js"
import routes from "./routes.js"

Vue.use(VueRouter);


/** Дебаунс */
Vue.prototype.$debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  el: "#app",
  components: { App },
  store,
  router,
  render: h => h( App )
});
