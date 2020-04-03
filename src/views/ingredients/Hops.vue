<template>
  <div class="section">
    <h1 class="title">All Hops</h1>
    <ul class="list is-hoverable">
      <router-link
        v-for="hop in hops"
        :key="hop._id"
        :to="'/hops/' + hop._id"
        tag="li"
        class="list-item"
        active-class="is-active"
        >{{ hop.name }}</router-link
      >
    </ul>
    <br />

    <!-- <appHopDetail :activeHop="activeHop" v-if="activeHop" /> -->
    <router-view :activeHop="activeHop" />
  </div>
</template>

<script>
//import HopDetail from "./HopDetail.vue";
import axios from "axios";

const API_URL =
  "https://h9r17g8juh.execute-api.us-west-2.amazonaws.com/latest/";

export default {
  data() {
    return {
      hops: [],
      activeHop: null
    };
  },
  // components: {
  //   appHopDetail: HopDetail
  // },
  mounted() {
    axios.get(API_URL + "ingredients/hops").then(response => {
      this.hops = response.data.hops;
      console.log(this);
      this.$store.state.hops = this.hops;
    });
  }
};
</script>
