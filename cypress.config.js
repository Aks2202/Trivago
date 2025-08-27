const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 60000 ,
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
