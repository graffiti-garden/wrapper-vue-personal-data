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
 * The provided component is [GraffitiPersonalData](./GraffitiPersonalData.html#graffiti-personal-data-vue-component)
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
 * # Graffiti Personal Data Vue Component
 *
 * A Vue component for reading and writing personal information using the [Graffiti API](https://api.graffiti.garden/classes/Graffiti.html).
 * Inspired by the [madata Vue component](https://madata.dev/components/vue/).
 *
 * The component takes the following props:
 * - `v-model`: A two-way binding to the personal data value.
 * - `name` (string): The name of the personal data to read or write. Similar to a file name: different names refer to different personal data.
 * - `session`: A Graffiti Session object from a successful login. This component can't be used while logged out.
 * - `autosave` (boolean, optional): Whether to automatically save changes to the personal data. Default is `false`.
 * - `public` (boolean, optional): Whether the personal data is publicly available. Default is `false`.
 *
 * It exposes the following slots:
 * - `save` (()=> Promise<void>): A function to save the personal data.
 * - `isSaving` (Ref<boolean>): A reactive signal for whether the personal data is currently being saved.
 * - `poll` (()=> Promise<void>): A function to poll the personal data.
 * - `isPolling` (Ref<boolean>): A reactive signal for whether the personal data is currently being polled.
 *
 * See [a live example](../example) or the [example's source code](https://github.com/graffiti-garden/wrapper-vue-personal-data/tree/main/example).
 */
export const GraffitiPersonalData = PersonalData;
