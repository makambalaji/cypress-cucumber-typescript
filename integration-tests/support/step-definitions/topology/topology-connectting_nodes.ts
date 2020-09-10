import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { topologyPage, topologySidePane } from '../../pages/topology_page';

Given('user has creaeted two worloads {string} and {string}', (firstWorkload: string, secondWorkload: string) => {
  addPage.createGitWorkload('https://github.com/sclorsg/nodejs-ex.git', 'nodejs-ex-git-app', firstWorkload);
  addPage.createGitWorkload('https://github.com/sclorg/dancer-ex.git', 'dancer-ex-git-app', secondWorkload);
  // naviagteTo(devNavigationMenu.Topology);
  // topologyPage.componentNode(firstComponent).should('be.visible');
  // topologyPage.componentNode(secondComponent).should('be.visible');
});

When('user clicks node {string} to open the side bar', (componentNode) => {
  topologyPage.componentNode(componentNode).click();
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
