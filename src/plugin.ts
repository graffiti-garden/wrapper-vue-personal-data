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
 * The provided component is {@link GraffitiPersonalData},
 * which is inspired by the [madata Vue component](https://madata.dev/components/vue/).
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
 * A Vue [renderless component](https://vuejs.org/guide/components/slots#renderless-components)
 * for reading and writing personal information using the Graffiti API.
 * Inspired by the [madata Vue component](https://madata.dev/components/vue/).
 *
 * The component takes the following props:
 * - `v-model`: A two-way binding to the personal data value.
 * - `name` (string): The name of the personal data to read or write.
 * - `session`: A Graffiti Session object from a successful login.
 * - `schema`: A [JSON Schema](https://json-schema.org/) object describing the personal data.
 * - `autosave` (boolean): Whether to automatically save changes to the personal data. Default is `false`.
 * - `public` (boolean): Whether the personal data is publicly available. Default is `false`.
 *
 * It exposes the following slots:
 * - `save` (()=> Promise<void>): A function to save the personal data.
 * - `isSaving` (Ref<boolean>): A reactive signal for whether the personal data is currently being saved.
 * - `poll` (()=> Promise<void>): A function to poll the personal data.
 * - `isPolling` (Ref<boolean>): A reactive signal for whether the personal data is currently being polled.
 */
export const GraffitiPersonalData = PersonalData;
