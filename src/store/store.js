import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import undoRedo from "undo-redo-vuex";

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

    undoRedo({
      // The config object for each store module is defined in the 'paths' array
      paths: [
        {
          namespace: "redactor",
          ignoreMutations: ["loadNote"],
        },
      ],
    }),
  ],
});
