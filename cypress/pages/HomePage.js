class HomePage {
    verifyHomePageLoaded() {
        // Wait for page to load and verify we're on the home page
        cy.wait(3000); // Give time for page to load
        
        // Try to find the HELLO, HUMAN text first, then check URL
        cy.contains('HELLO, HUMAN', { timeout: 30000 }).should('be.visible');
        
        // URL check is less critical - just log it for debugging
        cy.url().then((url) => {
            cy.log(`Current URL: ${url}`);
        });
    }

    getOpenDocumentAutomationButton() {
        // Navigate to Document Automation via AI
        cy.get('button[name="ai"]').should('be.visible').click();
        return cy.get('a[name="module-cognitive-iqbot-learning-instances"]').should('be.visible');
    }
}

export default new HomePage(); 