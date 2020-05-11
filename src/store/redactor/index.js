import Mutations from './mutations';
import State from './state';

// import { scaffoldStore } from "undo-redo-vuex";

export default {
  namespaced: true,
  mutations: Mutations,
  state: State,
}