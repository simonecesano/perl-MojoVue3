# Mojolicious::Plugin::Vue3::SFC

This Mojolicious plugin provides integration for Vue 3 Single File Components (SFCs) inside a Mojolicious app. It pseudo-compiles `.vue` SFC files into JavaScript on-the-fly and automatically generates routes for Vue components.

---

## Features and TODOs

- Auto-generate a Vue 404 page and add it to the app.js (TODO)
- Cache and save compiled JavaScript files (TODO)
- Dump everything to static files for production (TODO)
- Enhance the generated `index.js` page by adding meta attributes like "order" and "description" to components (TODO)

---

## Methods

### `dir_to_app($app, $conf)`

- Scans the base directory (`$conf->{base}`) for `.vue` files recursively.
- Parses each Vue SFC file to extract the `<meta>` tag attributes.
- Builds a list of route objects containing paths and dynamic import components.
- Prepends an index route component (`"/"`) if configured.
- Returns a JavaScript string defining the Vue router's `routes` array and exports it.

---

### `register($app, $conf)`

Registers the plugin with the Mojolicious app.

- Adds this plugin’s package to the app’s renderer classes.
- If `auto_routes` is enabled, adds a GET route `/app.js` serving the auto-generated routes from `dir_to_app`.
- Adds a route `/components/index.js` for a default Vue index component unless disabled.
- Adds a default index route `/` rendering the `vue_index` template unless disabled.
- Adds a dynamic route for serving compiled Vue components from the base directory unless disabled.
- Defines helper `sfc_to_js` to pseudo-compile Vue SFC content to JavaScript.
- Defines helper `serve_sfc` to serve either existing `.js` files or compile `.vue` files on demand.

---

## Helpers

### `sfc_to_js($c, $vue_code, $name)`

- Parses Vue SFC code using `Mojo::DOM`.
- Extracts:
  - `<template>` content (creates invisible div if missing).
  - `<script>` content (adds a default export if missing).
  - `<style>` content (scopes styles by adding a unique ID).
- Generates a unique scoped ID for the component based on the component name.
- Returns the compiled JavaScript as a string by rendering an embedded template (`component.js.ep`).

---

### `serve_sfc($c, $name)`

- Attempts to serve a static `.js` file if it exists.
- Otherwise, compiles the corresponding `.vue` file using `sfc_to_js` and serves it.
- Returns 404 if neither exists.

---

## Configuration Variables

| Variable            | Description                                                                                 |
|---------------------|---------------------------------------------------------------------------------------------|
| `base`              | Base directory where Vue SFC files are stored (components)                                 |
| `add_index`         | Adds a route `/` serving the `vue_index` HTML page with pre-configured Vue (default: true)  |
| `add_component_route` | Adds a dynamic route serving compiled components under the base directory (default: true)  |
| `add_index_component`| Adds an auto-generated `index.vue` component (default: true)                               |
| `auto_routes`       | Auto-generates an `/app.js` route with Vue router routes from components (default: true)    |

---

## Notes on Behavior

- Static routes take precedence over dynamic ones.
- If a `.js` file exists for a component, it will be served instead of compiling the `.vue` file.
- The plugin expects components to have a `<meta>` tag to be included in auto-generated routes.
- The `<meta>` tag can include a `route` attribute to specify the route path.
- Meta tag attributes `description` and `order` can be used to control display order and descriptions in the auto-generated index component.

---

## Embedded Templates

### `component.js.ep`

```js
const template = `<%== $vue->{template} %>`;
<%== $vue->{script} %>;

% if ($vue->{style}) {
if (!document.querySelector("#<%== $vue->{id} %>-styles")) {
      const style = document.createElement("style");
      style.id = "<%== $vue->{id} %>-styles";
      style.textContent = `
<%== $vue->{style} %>
`;
      document.head.appendChild(style);
}
% }
