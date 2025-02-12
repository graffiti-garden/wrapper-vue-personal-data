import type { App, Plugin } from "vue";
import PersonalData from "./PersonalData.vue";

declare module "vue" {
  export interface GlobalComponents {
    GraffitiPersonalData: typeof PersonalData;
  }
}

/**
 * This plugin provides a Vue component
 * for reading and writing personal data
 * over [Graffiti](https://api.graffiti.garden/classes/Graffiti.html)
 * It must be installed along with the
 * Vue [GraffitiPlugin](https://vue.graffiti.garden/variables/GraffitiPlugin.html)
 * and an implementation of Graffiti.
 *
 * @example
 * ```ts
 * import { createApp } from "vue";
 * import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
 * import { GraffitiLocal } from "@graffiti-garden/implementation-local";
 * import { GraffitiPersonalDataPlugin } from "@graffiti-garden/wrapper-vue-personal-data";
 * import App from "./App.vue";
 *
 * createApp(App)
 *   .use(GraffitiPlugin, {
 *     graffiti: new GraffitiLocal(),
 *   })
 *   .use(GraffitiPersonalDataPlugin)
 *   .mount("#app");
 */
export const GraffitiPersonalDataPlugin: Plugin = {
  install(app: App) {
    app.component("GraffitiPersonalData", PersonalData);
  },
};

/**
 *
 */
export const GraffitiPersonalData = PersonalData;
