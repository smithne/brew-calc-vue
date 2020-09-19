<template>
  <div class="section">
    <h1 class="title">Recipe Creator</h1>
    <div class="columns">
      <div class="column is-three-quarters">
        <!------------ RECIPE BASICS ------------>
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

        <!------------ FERMENTABLES ------------>
        <h2 class="subtitle">Fermentables</h2>

        <b-field
          grouped
          group-multiline
          v-for="(malt, key) in recipe.fermentables"
          :key="key"
        >
          <b-field label="Grain" label-position="on-border" expanded>
            <b-input placeholder="Search..." v-model="malt.name"></b-input>
          </b-field>
          <b-field label="PPG" label-position="on-border">
            <b-input v-model="malt.ppg"></b-input>
          </b-field>
          <b-field label="Amount" label-position="on-border">
            <b-input v-model="malt.amount"></b-input>
            <p class="control">
              <span class="button is-static">Pounds</span>
            </p>
          </b-field>

          <button
            class="button is-small is-danger is-normal"
            @click="removeFermentable(key)"
          >
            <b-icon icon="times" size="is-small"></b-icon>
          </button>
        </b-field>

        <b-field>
          <p class="control">
            <button class="button is-primary is-small" @click="addFermentable">
              Add Fermentable
            </button>
          </p>
        </b-field>

        <!------------ HOPS ------------>
        <h2 class="subtitle">Hops</h2>

        <b-field
          grouped
          group-multiline
          v-for="(hop, key) in recipe.hops"
          :key="key"
        >
          <b-field label="Hop" label-position="on-border">
            <b-autocomplete
              v-model="hop.name"
              :data="filteredHopArray"
              field="name"
              placeholder="Find a hop"
              :open-on-focus="true"
              icon="search"
              clearable
              @select="(option) => selectHop(option, key)"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>
          <b-field label="AA%" label-position="on-border">
            <b-input type="number" v-model="hop.alpha"></b-input>
          </b-field>
          <b-field label="Amount" label-position="on-border">
            <b-input type="number" v-model="hop.amount"></b-input>
            <p class="control">
              <span class="button is-static">Ounces</span>
            </p>
          </b-field>
        </b-field>

        <b-field>
          <p class="control">
            <button class="button is-primary is-small" @click="addHop">
              Add Hop
            </button>
          </p>
        </b-field>

        <!------------ YEAST ------------>
        <h2 class="subtitle">Yeast</h2>
        <b-field grouped>
          <b-field label="Strain" label-position="on-border">
            <b-input type="text" v-model="recipe.yeast.strain"></b-input>
          </b-field>
          <b-field label="Attenuation" label-position="on-border">
            <b-input type="number" v-model="recipe.yeast.attenuation"></b-input>
            <p class="control">
              <span class="button is-static">%</span>
            </p>
          </b-field>
        </b-field>
      </div>

      <div class="column is-one-quarter">
        <App-Recipe-Stats
          :abv="abv"
          :ibu="ibu"
          :startingGravity="startingGravity"
          :finalGravity="finalGravity"
          :srm="srm"
        ></App-Recipe-Stats>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import RecipeStats from "../../components/RecipeStats";

export default {
  components: {
    AppRecipeStats: RecipeStats,
  },
  data() {
    return {
      recipe: {
        // recipe defaults
        batchSize: 5, // batch size in gallons
        efficiency: 80,
        hops: [{ name: "", alpha: null, amount: 0 }],
        fermentables: [{ name: "", ppg: null, amount: 0 }],
        yeast: { strain: "US-05", attenuation: 85 },
      },
      availableHops: [],
      selectedHop: null,
      hopName: "",
    };
  },
  computed: {
    filteredHopArray() {
      return this.hops
        .filter((option) => {
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
      this.recipe.fermentables.forEach((item) => {
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
    },
  },
  methods: {
    ...mapActions(["loadHops"]),
    addHop() {
      console.log("hop added");
      this.recipe.hops.push({ name: "", ibu: null, amount: 0 });
    },
    removeHop(index) {
      this.recipe.hops.splice(index, 1);
    },
    addFermentable() {
      this.recipe.fermentables.push({ name: "", ppg: null, amount: 0 });
    },
    removeFermentable(index) {
      this.recipe.fermentables.splice(index, 1);
    },
    selectHop(option, key) {
      //console.log(option);
      //console.log(key);
      this.recipe.hops[key].name = option.name;
      this.recipe.hops[key].alpha = option.alpha;
    },
  },
  beforeMount() {
    this.loadHops();
  },
};
</script>
