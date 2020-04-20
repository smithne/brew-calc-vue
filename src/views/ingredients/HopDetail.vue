<template>
  <div>
    <h1 class="subtitle">{{ hop.name }}</h1>
    <p>Description: {{ hop.description }}</p>
    <p>Alpha Acids: {{ hop.alpha }}%</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["findHopById"]),
    hop() {
      return this.findHopById(this.$route.params.id);
    },
  },
};
</script>
