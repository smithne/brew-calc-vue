<template>
  <div class="section">
    <h1 class="title">Recipe Creator</h1>
    <div class="columns">
      <div class="column is-three-quarters">
        <h2 class="subtitle">Basics</h2>

        <b-field label="Batch Size" label-position="on-border">
          <b-input type="number" v-model="recipe.batchSize"></b-input>
          <p class="control">
            <span class="button is-static">Gallons</span>
          </p>
        </b-field>

        <b-field label="Efficiency" label-position="on-border">
          <b-input type="number" v-model="recipe.efficiency"></b-input>
          <p class="control">
            <span class="button is-static">%</span>
          </p>
        </b-field>

        <h2 class="subtitle">Fermentables</h2>

        <b-field grouped v-for="(malt, key) in recipe.fermentables" :key="key">
          <b-field label="Grain" label-position="on-border" expanded>
            <b-input placeholder="Search..." v-model="malt.name"></b-input>
          </b-field>
          <b-field label="PPG" label-position="on-border">
            <b-input v-model="malt.ppg"></b-input>
          </b-field>
          <b-field label="Weight" label-position="on-border">
            <b-input v-model="malt.amount"></b-input>
          </b-field>
          <button class="button is-small is-danger is-normal" @click="removeFermentable(key)">
            <b-icon icon="times" size="is-small"></b-icon>
          </button>
          <!-- ppg, amount -->
        </b-field>

        <!-- update to buefy -->
        <div class="control">
          <button class="button is-primary is-small" @click="addFermentable">Add Fermentable</button>
          <br />
          <br />
        </div>

        <h2 class="subtitle">Hops</h2>

        <b-field grouped>
          <b-field label="Hop" label-position="on-border">
            <b-autocomplete
              v-model="hopName"
              :data="filteredHopArray"
              field="name"
              placeholder="Find a hop"
              :open-on-focus="true"
              icon="search"
              clearable
              @select="(option) => (selectedHop = option)"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>
        </b-field>

        <h2 class="subtitle">Yeast</h2>
        <div class="field is-horizontal is-grouped-centered">
          <label class="field-label is-normal">Strain</label>
          <div class="control">
            <input type="text" class="input" v-model="recipe.yeast.strain" />
          </div>
          <label class="field-label is-normal">Attenuation</label>
          <div class="control">
            <input type="number" class="input" v-model="recipe.yeast.attenuation" />
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <h2 class="subtitle">Recipe Results</h2>
        <p>ABV: {{ abv.toFixed(1) }}%</p>
        <p>IBU: {{ ibu }}</p>
        <p>Starting Gravity: {{ startingGravity.toFixed(3) }}</p>
        <p>Final Gravity: {{ finalGravity.toFixed(3) }}</p>
        <p>Color (SRM): {{ srm }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      recipe: {
        batchSize: 5, // batch size in gallons
        efficiency: 80,
        hops: [{ name: "", ibu: null, amount: 0 }],
        fermentables: [{ name: "", ppg: null, amount: 0 }],
        yeast: { strain: "US-05", attenuation: 85 }
      },
      availableHops: [
        "Amarillo",
        "Citra",
        "Cascade",
        "Centennial",
        "Mt. Hood",
        "Nugget",
        "Saaz",
        "Simcoe",
        "Perle",
        "Northern Brewer"
      ],
      selectedHop: null,
      hopName: ""
    };
  },
  computed: {
    filteredHopArray() {
      return this.hops
        .filter(option => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.hopName.toLowerCase()) >= 0
          );
        })
        .slice(0, 5); // show max of 5 elements
    },
    ibu() {
      return 10;
    },
    abv() {
      // ABV =(76.08 * (og-fg) / (1.775-og)) * (fg / 0.794)
      return (
        ((76.08 * (this.startingGravity - this.finalGravity)) /
          (1.775 - this.startingGravity)) *
        (this.finalGravity / 0.794)
      );
    },
    startingGravity() {
      let points = 0;
      this.recipe.fermentables.forEach(item => {
        if (item.ppg) {
          points += item.ppg * item.amount;
        }
      });
      return (
        1 +
        (points / this.recipe.batchSize / 1000) * (this.recipe.efficiency / 100)
      );
    },
    finalGravity() {
      const originalPoints = this.startingGravity - 1;
      return 1 + originalPoints * (1 - this.recipe.yeast.attenuation / 100);
    },
    srm() {
      return 10.5;
    },
    hops() {
      return this.$store.state.hopsList;
    }
  },
  methods: {
    ...mapActions(["loadHops"]),
    addHop() {
      this.recipe.hops.push({ name: "", ibu: null, amount: 0 });
    },
    removeFermentable(index) {
      this.recipe.fermentables.splice(index, 1);
    },
    addFermentable() {
      this.recipe.fermentables.push({ name: "", ppg: null, amount: 0 });
    }
  },
  beforeMount() {
    this.loadHops();
  }
};
</script>
