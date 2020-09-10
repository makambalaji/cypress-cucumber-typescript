import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { topologyPage, topologySidePane } from '../../pages/topology_page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';

let gitUrl = 'https://github.com/sclorg/nodejs-ex.git';
let appName = '';

Given('user has created a workload named {string}', (componentName: string) => {
  appName = componentName;
  naviagteTo(devNavigationMenu.Add);
  addPage.createGitWorkload(gitUrl, componentName);
  topologyPage.verifyTopologyPage();
});

When('user clicks on an applicaton grouping {string}', (appName: string) => {
  topologyPage.appNode(appName).should('be.visible').click({force: true});
});

When('user right clicks on Application {string} to open context menu', (appName: string) => {
  topologyPage.appNode(appName).trigger('contextmenu', {force: true});
  // .invoke('show').should('be.visible').invoke('trigger', 'contextmenu');
});

Then('user can see application sidebar', () => {
  topologySidePane.verify();
});

Then('user can confirm the workload information present under resources tab in the sidebar', () => {
  topologySidePane.verifyWorkload();
}); 

Then('user can see Add to Application and Delete Application in the Action menu', () => {
  topologySidePane.verify();
  cy.byLegacyTestID('actions-menu-button').click();
  topologySidePane.verifyActions('Add to Application', 'Delete Application');
});

Then('user can view Add to Application and Delete Application options', () => {
    topologyPage.verifyContextMenuOptions('Add to Application', 'Delete Application');
});
