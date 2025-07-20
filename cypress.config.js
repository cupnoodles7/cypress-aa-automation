const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://community.cloud.automationanywhere.digital/',
    defaultCommandTimeout: 30000, // Increased timeout for a more stable test run
    requestTimeout: 30000, // Timeout for requests
    responseTimeout: 30000, // Timeout for responses
    pageLoadTimeout: 60000, // Timeout for page loads
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Add retry configuration for flaky tests
    retries: {
      runMode: 2,
      openMode: 0
    },
    // Handle uncaught exceptions
    experimentalModifyObstructiveThirdPartyCode: true
  },
});