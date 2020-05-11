import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import Main from "./main/index.js";
import redactor from "./redactor/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main: Main,
    redactor: redactor,
  },

  plugins: [
    createPersistedState({
      paths: ['main'],
    }),
  ],
});
