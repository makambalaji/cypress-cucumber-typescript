import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { topologyPage, topologyObj } from '../../pages/topology_page';

Given('user created workload {string} with resource type {string}', (componentName: string) => {
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git', 'nodejs-ex-git-app', componentName, 'Deployment');
});

When('user clicks on List view button', () => {
  topologyPage.verifyTopologyPage();
  cy.get(topologyObj.switcher).click();
});

When('user verifies the G roup by filter on top', () => {
  cy.get('div.pf-m-filter-group button').contains('Display Options').as('DisplayOptions');
  cy.get('@DisplayOptions').click();
  // cy.get('input[aria-label="Show Groups"]').should('be.visible');
  // cy.get('input[aria-label="Collapse Groups"]').should('be.enabled');
  cy.get('[id$="expand-app-groups"]').should('be.visible').and('be.checked');
  cy.get('@DisplayOptions').click();
});

Then('user sees nodes are present divided by applications groupings', () => {
  cy.get('section[id^="group:"]').should('be.visible');
});
