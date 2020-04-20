import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";

//const API_URL =
//  "https://h9r17g8juh.execute-api.us-west-2.amazonaws.com/latest/";

// store modules
//import hops from "./modules/hops";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    hopsList: [],
  },
  getters: {
    findHopById: (state) => (hopId) => {
      return state.hopsList.find((hop) => hop.id == hopId);
    },
  },
  //modules: {
  //  hops
  //}
});
