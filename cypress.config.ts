import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'qchqi8',
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});
