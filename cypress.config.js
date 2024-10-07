const { defineConfig } = require("cypress");
const webpackConfig = require("./webpack.config.js");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
    supportFile: "cypress/support/component.js",
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
