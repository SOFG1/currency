import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./pages/MainPage.vue";
import ConverterPage from "./pages/ConverterPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/converter", component: ConverterPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
