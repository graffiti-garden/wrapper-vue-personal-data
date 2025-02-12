import { createApp } from "vue";
import App from "./App.vue";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
import { GraffitiLocal } from "@graffiti-garden/implementation-local";
import { GraffitiPersonalDataPlugin } from "../src/plugin";

createApp(App)
  .use(GraffitiPlugin, {
    graffiti: new GraffitiLocal(),
  })
  .use(GraffitiPersonalDataPlugin)
  .mount("#app");
