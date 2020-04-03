<template>
  <div class="section">
    <h1 class="title">Recipe Creator</h1>
    <div class="columns">
      <div class="column is-three-quarters">
        <h2 class="subtitle">Basics</h2>
        <div class="field has-addons">
          <label class="field-label is-normal">Batch Size</label>
          <div class="control">
            <input type="number" class="input" v-model="recipe.batchSize" />
          </div>
          <p class="control"><a class="button is-static">Gallons</a></p>
        </div>
        <div class="field has-addons">
          <label class="field-label is-normal">Efficiency</label>
          <div class="control">
            <input type="number" class="input" v-model="recipe.efficiency" />
          </div>
          <p class="control">
            <a class="button is-static">
              %
            </a>
          </p>
        </div>
        <h2 class="subtitle">Fermentables</h2>
        <div
          class="field is-horizontal is-grouped-centered is-grouped-multiline"
          v-for="(malt, key) in recipe.fermentables"
          :key="key"
        >
          <label class="field-label is-normal">Grain</label>
          <div class="control">
            <input type="text" class="input" v-model="malt.name" />
          </div>
          <label class="field-label is-normal">PPG</label>
          <div class="control">
            <input type="number" class="input" v-model.lazy="malt.ppg" />
          </div>
          <label class="field-label is-normal">Weight</label>
          <div class="control">
            <input type="number" class="input" v-model.lazy="malt.amount" />
          </div>
          <div class="control">
            <button
              class="button is-small is-danger  is-normal"
              @click="removeFermentable(key)"
            >
              <b-icon icon="times" size="is-small"></b-icon>
            </button>
          </div>
        </div>
        <div class="control">
          <button class="button is-primary is-small" @click="addFermentable">
            Add Fermentable
          </button>
          <br /><br />
        </div>
        <h2 class="subtitle">Hops</h2>

        <h2 class="subtitle">Yeast</h2>
        <div class="field is-horizontal is-grouped-centered">
          <label class="field-label is-normal">Strain</label>
          <div class="control">
            <input type="text" class="input" v-model="recipe.yeast.strain" />
          </div>
          <label class="field-label is-normal">Attenuation</label>
          <div class="control">
            <input
              type="number"
              class="input"
              v-model="recipe.yeast.attenuation"
            />
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
export default {
  data() {
    return {
      recipe: {
        batchSize: 5, // batch size in gallons
        efficiency: 80,
        hops: [{ name: "", ibu: null, amount: 0 }],
        fermentables: [{ name: "", ppg: null, amount: 0 }],
        yeast: { strain: "US-05", attenuation: 85 }
      }
    };
  },
  computed: {
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
    }
  },
  methods: {
    addHop() {
      this.recipe.hops.push({ name: "", ibu: null, amount: 0 });
    },
    removeFermentable(index) {
      this.recipe.fermentables.splice(index, 1);
    },
    addFermentable() {
      this.recipe.fermentables.push({ name: "", ppg: null, amount: 0 });
    }
  }
};
</script>
