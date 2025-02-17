import "./assets/main.css";

import Aura from "@primevue/themes/aura";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

async function enableMocking() {
  // disable in prod
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("./api/mocks/browser.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    serviceWorker: {
      url: "/wordle-solver/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() => {
  app.mount("#app");
});
