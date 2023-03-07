import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    "video": false,
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    "video": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
