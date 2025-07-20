// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
      // Add debugging to see what's happening
      cy.log(`Attempting to login with username: ${username}`);
      
      // Visit the login page with better error handling
      cy.visit('/#/login', { 
        timeout: 30000,
        failOnStatusCode: false // Don't fail on non-2xx status codes
      });
      
      // Wait for the page to be fully loaded
      cy.get('body', { timeout: 30000 }).should('be.visible');
      
      // Check if we're actually on the login page
      cy.url().should('include', '/login');
      
      // Wait for login form to be ready
      cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');
      cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible');
      
      // Fill in credentials
      cy.get('input[name="username"]').clear().type(username);
      cy.get('input[name="password"]').clear().type(password);
      
      // Submit the form
      cy.get('button[type="submit"]').should('be.visible').click();
      
      // Wait for redirect to complete - don't check URL immediately
      cy.wait(5000);
      
      // Now check if we're on the home page
      cy.url({ timeout: 30000 }).should('include', '/#/home');
      
      // Assertion: Ensure the dashboard page is loaded after login
      cy.contains('HELLO, HUMAN', { timeout: 30000 }).should('be.visible');
    }, {
      validate() {
        // Don't validate URL in session validation - just check if we can access the app
        cy.visit('/#/home');
        cy.contains('HELLO, HUMAN', { timeout: 30000 }).should('be.visible');
      },
      cacheAcrossSpecs: true
    });
  });

// Reusable logout command
Cypress.Commands.add('logout', () => {
  // Click the username button (with class pathfinder-items__item-label)
  cy.get('button[name="mysettings"]').should('be.visible').click();
  // Wait for the tray to appear and click the Log out button
  cy.contains('button', 'Log out', { timeout: 10000 }).should('be.visible').click();
});

// Get iframe body command
Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument')
    .should('exist')
    .its('body')
    .should('not.be.undefined')
    .then(($body) => {
      return $body;
    });
});