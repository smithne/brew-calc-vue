import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const API_URL =
  "https://h9r17g8juh.execute-api.us-west-2.amazonaws.com/latest/";

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
  mutations: {
    setHops: (state, hops) => {
      state.hopsList = hops;
    },
  },
  actions: {
    loadHops: (context) => {
      if (context.state.hopsList.length == 0) {
        axios.get(API_URL + "ingredients/hops").then((response) => {
          context.commit("setHops", response.data.hops);
        });
      }
    },
  },
  //modules: {
  //  hops
  //}
});
