import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { store } from "./store/store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faSearch,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes, faSearch, faTimesCircle);

Vue.component("vue-fontawesome", FontAwesomeIcon);

import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
