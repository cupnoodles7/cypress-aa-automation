# Cypress AA Automation

This project contains automated tests for Automation Anywhere web application using Cypress.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Setup Credentials
1. Copy the template file:
   ```bash
   cp cypress/fixtures/testData.template.json cypress/fixtures/testData.json
   ```

2. Edit `cypress/fixtures/testData.json` with your actual credentials:
   ```json
   {
     "login": {
       "username": "your-actual-email@example.com",
       "password": "your-actual-password"
     },
     "useCase2": {
       "learningInstanceName": "Test Learning Instance",
       "userDefinedFieldName": "testField",
       "userDefinedFieldLabel": "Test Field Label"
     }
   }
   ```

### Running Tests
```bash
# Run all tests
npm run cypress:run

# Open Cypress Test Runner
npm run cypress:open

# Run specific test
npx cypress run --spec "cypress/e2e/useCase2_createLearningInstance.cy.js"
```

## 📁 Project Structure
```
cypress-aa-automation/
├── cypress/
│   ├── e2e/                    # Test files
│   ├── fixtures/               # Test data
│   ├── pages/                  # Page Object Models
│   └── support/                # Custom commands
├── cypress.config.js           # Cypress configuration
└── package.json
```

## 🔒 Security Notes

- The `testData.json` file is excluded from git via `.gitignore`
- Use the `testData.template.json` as a reference for the required structure
- Consider using environment variables for production deployments

## 🧪 Test Cases

### Use Case 1: Create Message Box
- File: `cypress/e2e/useCase1_createMessageBox.cy.js`
- Creates a message box bot with custom message

### Use Case 2: Create Learning Instance
- File: `cypress/e2e/useCase2_createLearningInstance.cy.js`
- Creates a learning instance with user-defined fields

## 🛠️ Custom Commands

- `cy.login(username, password)` - Handles login with session caching
- `cy.logout()` - Handles logout
- `cy.getIframeBody(selector)` - Gets iframe body for iframe interactions

## 📝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## 📄 License

This project is for internal use only. 
