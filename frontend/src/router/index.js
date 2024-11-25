import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlanetasView from "../views/PlanetasView.vue";
import ClimaView from "../views/ClimaView.vue";
import GravidadeView from "../views/GravidadeView.vue";
import CategoriaView from "../views/CategoriaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/planeta",
      name: "planeta",
      component: PlanetasView,
    },
    {
      path: "/clima",
      name: "clima",
      component: ClimaView,
    },
    {
      path: "/gravidade",
      name: "gravidade",
      component: GravidadeView,
    },
    {
      path: "/categoria",
      name: "categoria",
      component: CategoriaView,
    },
  ],
});

export default router;
