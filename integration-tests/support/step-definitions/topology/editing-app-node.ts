import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage, addPageObj } from '../../pages/add/add_page';
import { topologyPage } from '../../pages/topology-page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';

Given('user has created workload {string}', (workloadName: string) => {
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git', workloadName, 'deployment');
});

Given('user has created knative workload {string}', (workloadName: string) => {
  naviagteTo(devNavigationMenu.Add);
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git', workloadName, 'knative');
});

When('user selects option {string} from context menu', (menuOption: string) => {
  topologyPage.clickContextMenuOption(menuOption);
});

When('user can see Edit form', () => {
  cy.contains('Save').should('be.visible');
});

When('user verifies that name of the node and route option is not editable', () => {
  cy.get(addPageObj.nodeName).should('be.disabled');
  cy.get(addPageObj.advancedOptions.createRoute).should('be.disabled');
});

When('user verifies that Application grouping, git url, builder image version and advanced option can be edited', () => {
  cy.get(addPageObj.appName).should('be.enabled');
  cy.get(addPageObj.gitRepoUrl).should('be.enabled');
  cy.get(addPageObj.builderSection.builderImageVersion).should('be.enabled');
});

When('user edits Application name as {string}', (appName: string) => {
  cy.get(addPageObj.appName).click();
  cy.get('[id="#CREATE_APPLICATION_KEY#-link"]').click();
  cy.get('input[id$=application-name-field]').type(appName);
});

When('user clicks on save', () => {
  cy.contains('Save').click();
});

When('user verifies that name of service and route option is not editable', () => {
  // TODO: implement step
});

Then('user can see the change of node to the new Application {string}', (appName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(appName);
});

Then('user can see the change of knative service to the new Application defined above', () => {
  // TODO: implement step
});
