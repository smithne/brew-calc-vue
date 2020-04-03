<template>
  <b-navbar :shadow="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        <img src="../assets/hopIcon.svg" alt="Hop Icon" />
        <strong>Hoppier</strong>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }"
        >Home</b-navbar-item
      >
      <b-navbar-item tag="router-link" :to="{ name: 'recipes' }"
        >Recipes</b-navbar-item
      >
      <b-navbar-dropdown label="Ingredients" :hoverable="true">
        <b-navbar-item tag="router-link" :to="{ name: 'hops' }"
          >Hops</b-navbar-item
        >
        <b-navbar-item tag="router-link" to="#">Malts</b-navbar-item>
        <b-navbar-item tag="router-link" to="#">Yeasts</b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>
