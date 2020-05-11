"use strict";

import "@babel/polyfill";
import "regenerator-runtime";

import Vue from "vue";
import App from "@/vue/app.vue";
import VueRouter from "vue-router";

import "@/assets/scss/style.scss";

import store from "@/store/store.js"
import routes from "./routes.js"

Vue.use(VueRouter);

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
