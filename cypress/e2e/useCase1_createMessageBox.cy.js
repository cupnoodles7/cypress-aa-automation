import { dashboardPage } from '../pages/DashboardPage';
import { botEditorPage } from '../pages/BotEditorPage';

describe('Use Case 1: Create Message Box Task', () => {
  
  beforeEach(() => {
    // Load credentials from the fixture file
    cy.fixture('testData').then((data) => {
      cy.login(data.username, data.password);
    });
    // Navigate to the dashboard before each test
    cy.visit('/#/home');
  });

  it('should create a bot with a message box and assert its creation', () => {
    const botName = `MessageBoxBot-${Cypress._.random(1000, 9999)}`;
    const messageText = 'Test Message';

    // 1. Click 'Create a bot' on the dashboard
    dashboardPage.getCreateBotButton().click();

    // 2. Fill in the bot name and create it
    dashboardPage.createTaskBotModal.nameInput().type(botName);
    dashboardPage.createTaskBotModal.confirmCreateButton().click();

    // 3. In the editor, search for 'Message box'
    botEditorPage.searchActionsInput().type('Message box');

    // 4. Double-click the action to add it to the flow
    botEditorPage.dragActionToFlow('Message box');
    
    // 5. Fill in the message to display
    botEditorPage.messageBoxPanel.messageInput().type(messageText);
    
    // 6. Save the bot
    botEditorPage.getSaveButton().click();

    // 7. Assert that the bot was saved successfully (Save button becomes disabled)
    botEditorPage.assertBotSave();

    // 8. Wait for the 'Close' button to appear, then click it
    cy.contains('button', 'Close', { timeout: 30000 }).should('be.visible').click();

    // 9. Log out at the end of the test
    cy.logout();
  });
});
