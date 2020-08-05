import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../pages/add_page';
import { topologyPage } from '../pages/topology_page';

Given('topology has application name with nodes', () => {
  addPage.createGitWorkload();
  topologyPage.verifyTopologyPage();
});

When('user clicks on an applicaton grouping', () => {
  topologyPage.appNode().click();
});

When('user right click on Application to open context menu', () => {
  topologyPage.appNode().trigger('contextmenu');
});

Then('user can see application sidebar', () => {
  topologyPage.verifySidePane();
});

Then('user can confirm the workload information present under resources in the sidebar', () => {
  topologyPage.verifyWorkloadInSidePane();
}); 

Then('user can see Add to Application and Delete Application in the Action menu', () => {
  topologyPage.verifySidePane();
  cy.byLegacyTestID('actions-menu-button').click();
  topologyPage.verifyActionsInSidePane('Add to Application', 'Delete Application');
});

Then('user can view Add to Application and Delete Application options', () => {
    topologyPage.verifyContextMenuOptions('Add to Application', 'Delete Application');
});
