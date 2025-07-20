/// <reference types="cypress" />

import HomePage from '../pages/HomePage';
import LearningInstancePage from '../pages/LearningInstancePage';

describe('Use Case 2: Create a Learning Instance with User-defined fields', () => {
    let testData;

    before(() => {
        cy.fixture('testData.json').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Setup API interception for learning instances list
        cy.intercept('POST', '**/v2/iqbot/learning-instances/list').as('getLearningInstanceList');

        // Login and navigate to home page
        cy.login(testData.login.username, testData.login.password);
        cy.visit('/#/home');
        cy.wait(3000);

        // Verify home page and navigate to Document Automation
        HomePage.verifyHomePageLoaded();
        HomePage.getOpenDocumentAutomationButton().should('be.visible').click({ force: true });
        
        // Verify navigation and wait for iframe to load
        cy.url().should('include', 'modules/cognitive/iqbot/pages/learning-instances');
        cy.wait(5000);
    });

    it('should successfully create a new Learning Instance with a user-defined field', () => {
        // Extract test data
        const { learningInstanceName: instanceName, userDefinedFieldName: fieldName, userDefinedFieldLabel: fieldLabel } = testData.useCase2;

        // Clean up existing instance if it exists
        cy.getIframeBody('iframe.modulepage-frame').then((iframeBody) => {
            if (iframeBody.find(`.datatable-row a.rio-link__label:contains("${instanceName}")`).length) {
                cy.log(`Learning Instance "${instanceName}" already exists. Attempting to delete.`);
                LearningInstancePage.deleteLearningInstance(instanceName);
                cy.wait('@getLearningInstanceList', { timeout: 30000 });
                cy.wait(3000);
            }
        });

        // Create learning instance with custom field
        cy.getIframeBody('iframe.modulepage-frame').then((iframeBody) => {
            LearningInstancePage.clickCreateLearningInstance(iframeBody);
            LearningInstancePage.fillLearningInstanceDetails(iframeBody, instanceName);
            LearningInstancePage.addCustomFieldFromData(iframeBody, fieldName, fieldLabel);
        });
      
        // Wait for operations to complete before logout
        cy.wait(5000);
        cy.log('Waiting 5 seconds before logout to ensure all operations are complete');
        cy.logout();
    });
}); 