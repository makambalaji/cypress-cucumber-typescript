import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { topologyPage, topologyObj } from '../../pages/topology-page';

Given('user created workload {string} with resource type {string}', (componentName: string, resourceType: string = "Deployment") => {
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git', componentName, resourceType, 'nodejs-ex-git-app');
});

When('user clicks on List view button', () => {
  topologyPage.verifyTopologyPage();
  cy.get(topologyObj.switcher).click();
});

When('user verifies the Group by filter on top', () => {
  cy.get('div.pf-m-filter-group button').contains('Display Options').as('DisplayOptions');
  cy.get('@DisplayOptions').click({force:true});
  // cy.get('input[aria-label="Show Groups"]').should('be.visible');
  // cy.get('input[aria-label="Collapse Groups"]').should('be.enabled');
  cy.get('[id$="expand-app-groups"]').should('be.visible').and('be.checked');
  cy.get('@DisplayOptions').click({force:true});
});

Then('user will see workloads are segregated by applications groupings', () => {
  cy.get('section[id^="group:"]').should('be.visible');
});
