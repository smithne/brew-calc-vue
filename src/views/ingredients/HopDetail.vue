<template>
  <div>
    <h1 class="subtitle">{{ hop.name }}</h1>
    <p>Description: {{ hop.description }}</p>
    <p>Alpha Acids: {{ hop.alpha }}%</p>
  </div>
</template>

<script>
export default {
  computed: {
    hop() {
      return this.$store.getters.findHopById(this.$route.params.id);
    },
  },
};
</script>
