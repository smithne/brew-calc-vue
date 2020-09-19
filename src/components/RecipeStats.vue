<template>
  <div>
    <h2 class="subtitle">Recipe Results</h2>
    <b-progress
      type="is-danger"
      :value="abv"
      show-value
      format="percent"
      max="15"
      >ABV: {{ abv.toFixed(1) }}%</b-progress
    >
    <b-progress type="is-success" :value="ibu" show-value max="100"
      >IBU: {{ ibu }}</b-progress
    >
    <b-progress type="is-info" :value="startingGravityPct" show-value
      >SG: {{ startingGravity.toFixed(3) }}</b-progress
    >
    <b-progress type="is-info" :value="finalGravityPct" show-value
      >FG: {{ finalGravity.toFixed(3) }}</b-progress
    >
    <b-progress :value="srmPct" show-value
      >SRM: {{ srm.toFixed(1) }}</b-progress
    >
  </div>
</template>

<script>
export default {
  props: {
    abv: Number,
    ibu: Number,
    startingGravity: Number,
    finalGravity: Number,
    srm: Number,
  },
  computed: {
    startingGravityPct() {
      const maxSG = 1.1;
      const minSG = 1;
      return ((this.startingGravity - minSG) / (maxSG - minSG)) * 100;
    },
    finalGravityPct() {
      const maxFG = 1.04;
      const minFG = 1;
      return ((this.finalGravity - minFG) / (maxFG - minFG)) * 100;
    },
    srmPct() {
      const minSRM = 0;
      const maxSRM = 40;
      return ((this.srm - minSRM) / (maxSRM - minSRM)) * 100;
    },
  },
};
</script>
