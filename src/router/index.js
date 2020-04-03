import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/recipes",
    name: "recipes",
    component: () =>
      import(
        /* webpackChunkName: "recipes" */ "../views/recipes/RecipeHome.vue"
      )
  },
  {
    path: "/hops",
    name: "hops",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "hops" */ "../views/ingredients/Hops.vue"),
    children: [
      {
        path: "/hops/:id",
        component: () =>
          import(
            /* webpackChunkName: "hopDetail" */ "../views/ingredients/HopDetail.vue"
          )
      },
      {
        path: "/hop/new",
        name: "createHop",
        component: () =>
          import(
            /* webpackChunkName: "createHop", */ "../views/ingredients/CreateHop.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
