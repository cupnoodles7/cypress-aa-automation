export const botEditorPage = {
    // Updated selector based on the actual HTML structure
    searchActionsInput: () => cy.get('input.editor-palette-search__input[placeholder="Search actions"]'),
    
    dragActionToFlow(actionName) {
        // Double-click the action to add it to the flow (workaround for pointer-events issue)
        cy.get('div.editor-palette-item__child--is_draggable')
          .contains(actionName)
          .dblclick();
    },

    messageBoxPanel: {
        titleInput: () => cy.get('input[aria-label="Enter the message box window title"]'),
        // Target the contenteditable div within the specific field label
        messageInput: () => cy.get('div[data-label="Enter the message to display"] div.textinput-cell-input-content[contenteditable="true"]')
    },
    
    // Updated selector based on the actual HTML structure
    getSaveButton: () => cy.get('button[name="save"]'),
    getCloseButton: () => cy.contains('button', 'Close', { timeout: 10000 }).should('be.visible').click(),

    assertBotSave() {
        // Check for the visually disabled class instead of the disabled attribute
        cy.get('button[name="save"]').should('have.class', 'command-button__button--is_disabled');
    }
};