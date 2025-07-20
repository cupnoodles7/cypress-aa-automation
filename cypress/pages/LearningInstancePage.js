class LearningInstancePage {
    getCreateLearningInstanceButton(iframeBody) {
        cy.wait(2000);
        return cy.wrap(iframeBody).find('div#create-learning-instance-button button').contains('Create Learning Instance');
    }

    getInstanceNameField(iframeBody) {
        return cy.wrap(iframeBody).find('input[name="name"][aria-label="Name"]');
    }

    getDocumentTypeDropdownToggle(iframeBody) {
        return cy.wrap(iframeBody).find('div[data-name="domainId"] button[data-path="RioSelectInputQuery.toggle-button"]');
    }

    getUserDefinedOption() {
        return cy.contains('.rio-select-input-dropdown-option-label', 'User-defined');
    }

    getNextButton(iframeBody) {
        return cy.wrap(iframeBody).find('button[name="submit"][aria-label="Next"]');
    }

    getAddAFieldButton(iframeBody) {
        return cy.wrap(iframeBody).find('button[data-text="Add a field"]');
    }

    getFieldNameField(iframeBody) {
        return cy.wrap(iframeBody).find('input[name="name"][placeholder="Field name"]');
    }

    getFieldLabelField(iframeBody) {
        return cy.wrap(iframeBody).find('input[name="displayName"][placeholder="Field label"]');
    }

    getCreateFieldButton(iframeBody) {
        return cy.wrap(iframeBody).find('div.command-button button[data-text="Create"]');
    }

    getFinalCreateButton(iframeBody) {
        return cy.wrap(iframeBody).find('button[aria-label="Create"][data-text="Create"]');
    }

    getLearningInstanceModal(iframeBody) {
        return cy.get('div[data-path="ModalForm"][data-modal-id*="learning-instance-create"]');
    }
    
    getLearningInstanceSuccessMessage() {
        return cy.contains('Learning instance created successfully');
    }

    clickCreateLearningInstance(iframeBody) {
        this.getCreateLearningInstanceButton(iframeBody).click();
        cy.wait(3000);
        cy.wait(3000);
    }

     fillLearningInstanceDetails(iframeBody, instanceName) {
        this.getInstanceNameField(iframeBody).type(instanceName);

        this.getDocumentTypeDropdownToggle(iframeBody).click();
        cy.wait(500);
        cy.wrap(iframeBody).find('.rio-select-input-dropdown-option-label').contains('User-defined').click();
        cy.wait(1000);

        this.getNextButton(iframeBody).should('be.visible').click({ force: true });
        cy.wait(2000);
    }

    addCustomField(iframeBody, fieldName, fieldLabel) {
        this.getAddAFieldButton(iframeBody).click();
        cy.wait(1000);
        cy.contains('Field Properties').should('be.visible');

        this.getFieldNameField(iframeBody).type(fieldName);
        this.getFieldLabelField(iframeBody).type(fieldLabel);
        this.getCreateFieldButton(iframeBody).click();
        cy.wait(1000);
        cy.contains('Add a Field').should('be.visible');
    }

    addCustomFieldFromData(iframeBody, fieldName, fieldLabel) {
        cy.wrap(iframeBody)
            .find('button[aria-label="Add a field"]:visible')
            .first()
            .click();
        cy.wait(1000);

        cy.wrap(iframeBody).find('input[name="name"][placeholder="Field name"]').type(fieldName);
        cy.wrap(iframeBody).find('input[name="displayName"][placeholder="Field label"]').type(fieldLabel);

        cy.wrap(iframeBody).find('form').first().click('topLeft', { force: true });
        cy.wait(500);

        cy.wrap(iframeBody).find('button[aria-label="Create"]').should('be.enabled').click();
        cy.wait(1000);
    }

    clickEmptySpace(iframeBody) {
        cy.wrap(iframeBody).find('div[data-path="ModalForm"]').click('topLeft', { force: true });
        cy.wait(500);
    }

    finalCreateLearningInstance(iframeBody) {
        this.getFinalCreateButton(iframeBody).click();
        cy.wait(2000);
        this.getLearningInstanceSuccessMessage().should('be.visible');
        cy.get('div[data-path="ModalForm"][data-modal-id*="learning-instance-create"]').should('not.exist');
    }

    verifyLearningInstanceExists(instanceName) {
        return cy.contains('.datatable-row a.rio-link__label', instanceName, { timeout: 20000 }).should('be.visible');
    }

    deleteLearningInstance(instanceName) {
        cy.contains('.datatable-row', instanceName)
            .find('button[aria-label="Actions"]').click({ force: true });
        cy.wait(2000);
        cy.contains('Delete').click();
        cy.wait(2000);
        cy.contains('button', 'Delete').click();
        this.getLearningInstanceSuccessMessage().should('be.visible');
        cy.reload();
        cy.wait(4000);
    }
}

export default new LearningInstancePage(); 