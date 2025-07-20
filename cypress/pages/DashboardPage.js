export const dashboardPage = {
    // Try multiple selectors for the Create a bot button
    getCreateBotButton: () => {
        // First try the specific selector you found
        return cy.get('[style="padding-inline-start: 0px; clear: both; width: calc(25% - 11.25px);"] > .gridlayout-content > .homepage-block-links > .command-button > .rio-focus > .clipped-text > .clipped-text__string--for_presentation')
            .should('be.visible');
    },
    
    createTaskBotModal: {
        // Updated selector based on the actual HTML structure
        nameInput: () => {
            // Use the correct selector based on the provided HTML
            return cy.get('input.textinput-cell-input-control[name="name"]')
                .should('be.visible');
        },
        confirmCreateButton: () => {
            // Use the correct selector based on the provided HTML
            return cy.get('button[aria-label="Create & edit"]')
                .should('be.visible');
        }
    }
};