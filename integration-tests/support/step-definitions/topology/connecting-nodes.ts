import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add-flow/add-page';
import { topologyPage, topologySidePane } from '../../pages/topology-page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';

Given('user has creaeted two workloads {string} and {string}', (firstWorkload: string, secondWorkload: string) => {
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git', firstWorkload,'deployment');
  topologyPage.verifyWorkloadInTopologyPage(firstWorkload);
  naviagteTo(devNavigationMenu.Add);
  addPage.createGitWorkload('https://github.com/sclorg/dancer-ex.git', secondWorkload,'deployment');
  topologyPage.verifyWorkloadInTopologyPage(secondWorkload);
});

When('user clicks node {string} to open the side bar', (componentNode) => {
  cy.get('g.odc-base-node__label').should('be.visible').contains(componentNode).click({force:true});
  topologySidePane.verify();
});

When('user selects {string} option from Action menu', (actionMenuOption: string) => {
  topologySidePane.selectNodeAction(actionMenuOption);
});

When('user enters key as {string}', (key: string) => {
  cy.get('[data-test-id="pairs-list__add-btn"]').click();
  cy.get('input[placeholder="key"][value=""]').type(key);
});

When('user enters value as name of the node {string} to which it will be associated', (secondComponent: string) => {
  cy.get('input[placeholder="value"][value=""]').type(secondComponent);
  cy.byTestID('confirm-action').click();
});

Then('user can see that two nodes are connected with dotted arrow', () => {
  cy.get('[data-test-id="edge-handler"]').should('be.visible');
});

When('user scrolls over a node to see the arrow', () => {
  // manual step
});

When('user click on the front of arrow and drag it on to the other node and drop it', () => {
  // manual step
});

Then('user can see the arrow connecting them with head pointing to the node where the arrow is dropped', () => {
  // manual step
});
