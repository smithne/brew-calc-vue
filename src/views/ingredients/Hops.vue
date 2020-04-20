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
    <router-view :activeHop="activeHop" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeHop: null,
    };
  },
  computed: {
    hops() {
      return this.$store.state.hopsList;
    },
  },
  beforeMount() {
    this.$store.dispatch("loadHops");
  },
};
</script>
