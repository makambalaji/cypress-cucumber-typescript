import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { topologyPage, topologySidePane } from '../../pages/topology_page';
import { catalogPage } from '../../pages/add/catalog_page';

Given('helm release {string} is present in topology page', (workloadName: string) => {
  catalogPage.createHelmChartFromAddPage(workloadName);
  // cy.get('body div').then(($el) => {
  //   if($el.find('h2.co-hint-block__title h4').length === 0) {
  //     catalogPage.createHelmChartFromAddPage(workloadName);
  //   }
  //   else {
  //     cy.log('helm release is available');
  //   }
  // });
  // topologyPage.searchHelmRelease(workloadName);
});

Given('user is on the topology sidebar of the helm release {string}', (helmReleaseName: string) => {
  cy.get('g.odc-base-node__label').should('be.visible').contains(helmReleaseName).click({force:true});
  topologySidePane.verify();
});

Then('user will see the actions on context menu', () => {
  cy.byTestActionID('Upgrade').should('be.visible');
  cy.byTestActionID('Rollback').should('be.visible');
  cy.byTestActionID('Uninstall Helm Release').should('be.visible');
});

When('user clicks on the helm release {string}', (helmReleaseName: string) => {
  cy.get('g.odc-base-node__label').should('be.visible').contains(helmReleaseName).click({force:true});
});

Then('user will see the sidebar for the helm release', () => {
  topologySidePane.verify();
});

Then('user will see the Details, Resources, Release Notes tabs', () => {
  topologyPage.verifyHelmReleaseSidePaneTabs();
});

When('user clicks on the Actions drop down menu', () => {
  cy.byLegacyTestID('actions-menu-button').click();
});

Then('user will see the {string} action item', (actionItem: string) => {
  cy.byTestActionID(actionItem).should('be.visible');
});

When('user switches to the Resources tab', () => {
  // TODO: implement step
});

When('user clicks on the link for the deployment config of helm release', () => {
  // TODO: implement step
});

When('user clicks on the link for the build config of helm release', () => {
  // TODO: implement step
});

When('user clicks on the link for the services of helm release', () => {
  // TODO: implement step
});

When('user clicks on the link for the image stream of helm release', () => {
  // TODO: implement step
});

When('user clicks on the link for the routes of helm release', () => {
  // TODO: implement step
});

Then('user is redirected to the Deployment Config Details page for the helm release', () => {
  // TODO: implement step
});

Then('user is redirected to the Build Config Details page for the helm release', () => {
  // TODO: implement step
});

Then('user is redirected to the Service Details page for the helm release', () => {
  // TODO: implement step
});

Then('user is redirected to the Image Stream Details page for the helm release', () => {
  // TODO: implement step
});

Then('user is redirected to the Route Details page for the helm release', () => {
  // TODO: implement step
});
