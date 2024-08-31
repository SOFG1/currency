import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Ripple from 'primevue/ripple';
import Aura from "@primevue/themes/aura";
import 'primeicons/primeicons.css'
import "./style.css";
import App from "./App.vue";
import { router } from "./router";

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .directive("ripple", Ripple)
  .use(pinia)
  .use(router)
  .mount("#app");
