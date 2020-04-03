<template>
  <div class="container">
    <div class="field">
      <label for="hopName" class="label">Hop Name</label>
      <div class="control">
        <input class="input" type="text" v-model="hop.name" />
      </div>
    </div>
    <div class="field">
      <label for="hopAA" class="label">Alpha Acids</label>
      <div class="control">
        <input type="number" class="input" v-model="hop.aau" />
      </div>
    </div>
    <div class="field">
      <label for="hopDescripition" class="label">Description</label>
      <div class="control">
        <input type="text" class="input" v-model="hop.description" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="submitHop">Submit</button>
      </div>
    </div>
    <p>{{hop.name}}: {{hop.aau}} AA, description: {{hop.description}}</p>
  </div>
</template>

<script>
import axios from "axios";

const API_URL =
  "https://h9r17g8juh.execute-api.us-west-2.amazonaws.com/latest/";
export default {
  data() {
    return {
      hop: {
        name: "",
        aau: null,
        description: ""
      }
    };
  },
  methods: {
    submitHop() {
      axios
        .post(API_URL + "ingredients/hop/create", {
          name: this.hop.name,
          alpha_min: this.hop.aau,
          alpha_max: this.hop.aau,
          description: this.hop.description
        })
        .then(response => {
          this.hops = response.data.hops;
        });
    }
  }
};
</script>