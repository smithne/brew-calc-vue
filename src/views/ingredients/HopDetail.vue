<template>
  <div>
    <p>Hop detail for id: {{ $route.params.id }}</p>
    <h1 class="subtitle">{{ hop.name }}</h1>
    <p>Description: {{ hop.description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hop: null
    };
  },
  updated() {
    this.hop = this.$store.state.hops.find(
      obj => obj.id == this.$route.params.id
    );
  }
};
</script>
