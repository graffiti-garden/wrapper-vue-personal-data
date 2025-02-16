# Graffiti Personal Data

[**Read the API documentation**](https://graffiti.garden/wrapper-vue-personal-data/).

## Installation

You must install this package along with [Vue.js](https://vuejs.org),
an implementation of the Graffiti API, and the [Graffiti Vue wrapper](https://vue.graffiti.garden/variables/GrafittiPlugin.html).

In this example, we will use the [local implementation](https://github.com/graffiti-garden/implementation-local)
of the Graffiti API, but any other would be similar.
In node.js, simply install them with npm:

```bash
npm install vue
npm install @graffiti-garden/implementation-local
npm install @graffiti-garden/wrapper-vue
npm install @graffiti-garden/wrapper-vue-personal-data
```

In the browser, you can use a CDN like
[jsDelivr](https://www.jsdelivr.com/).
Add an import map the the `<head>` of your HTML file:

```html
<head>
    <script type="importmap">
        {
            "imports": {
                "vue": "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.js",
                "@graffiti-garden/implementation-local": "https://cdn.jsdelivr.net/npm/@graffiti-garden/implementation-local/dist/index.browser.js",
                "@graffiti-garden/wrapper-vue": "https://cdn.jsdelivr.net/npm/@graffiti-garden/wrapper-vue/dist/plugin.mjs"
                "@graffiti-garden/wrapper-vue-personal-data": "https://cdn.jsdelivr.net/npm/@graffiti-garden/wrapper-vue-personal-data/dist/plugin.mjs"
            }
        }
    </script>
</head>
```

In ether case install the plugin in your Vue app as follows:

```typescript
import { createApp } from "vue";
import { GraffitiLocal } from "@graffiti-garden/implementation-local";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
import { GraffitiPersonalDataPlugin } from "@graffiti-garden/wrapper-vue-personal-data";

createApp({})
  .use(GraffitiPlugin, {
    graffiti: new GraffitiLocal(),
  })
  .use(GraffitiPersonalDataPlugin);
  .mount("#app");
```

[See a live example](https://graffiti.garden/wrapper-vue-personal-data/example).
