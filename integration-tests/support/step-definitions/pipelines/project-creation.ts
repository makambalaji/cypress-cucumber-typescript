import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { projectNameSpace } from '../../pages/app';
import { addPageObj } from '../../pages/add/add_page';

When('user selects the Create Project option from Projects dropdown on top navigation bar', () => {
  projectNameSpace.selectCreateProjectOption();
});

When('type Name as {string} in Create Project popup', (projectName: string) => {
  projectNameSpace.enterProjectName(projectName);
});

When('click Create button present in Create Project popup', () => {
  projectNameSpace.clickCreateButton();
});
  
Then('popup should get closed', () => {
  projectNameSpace.verifyPopupClosed();
});

Then('page displays with message {string}', (message: string) => {
  projectNameSpace.verifyMessage(message);
});

Then('topology page have cards from Add page', () => {
  cy.get(addPageObj.cardTitle).should('be.visible');
});
