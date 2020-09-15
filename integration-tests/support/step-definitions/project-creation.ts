import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { projectNameSpace } from '../pages/app';
import { addPageObj } from '../pages/add/add_page';

When('user selects the Create Project option from Projects dropdown on top navigation bar', () => {
  projectNameSpace.selectCreateProjectOption();
});

When('user enters project name as {string} in Create Project modal', (projectName: string) => {
  projectNameSpace.enterProjectName(projectName);
});

When('user clicks Create button present in Create Project modal', () => {
  projectNameSpace.clickCreateButton();
});
  
Then('modal will get closed', () => {
  projectNameSpace.verifyPopupClosed();
});

Then('page displays with message {string}', (message: string) => {
  projectNameSpace.verifyMessage(message);
});

Then('topology page have cards from Add page', () => {
  cy.get(addPageObj.cardTitle).should('be.visible');
});
