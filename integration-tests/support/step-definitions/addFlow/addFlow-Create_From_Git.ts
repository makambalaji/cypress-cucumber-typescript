import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage, addPageObj } from '../../pages/add/add_page';
import { addOptions } from '../../constants/add';
import { topologyPage, topologySidePane, addHealthChecksPage } from '../../pages/topology_page';

Given('user is at Import from git page', () => {
  addPage.selectCardFromOptions(addOptions.Git);
});

When('user enters Git Repo url as {string}', (gitUrl: string) => {
  addPage.enterGitUrl(gitUrl);
});

Then('git url gets Validated', () => {
  addPage.verifyValidatedMessage();
});

Then('builder image is detetced', () => {
  addPage.verifyBuilderImageDetectedMessage();
});

Then('builder image version drop down is displayed', () => {
  addPage.verifyBuilderImageVersion();
});

Then('Application name displays as {string}', (appName: string) => {
  cy.get(addPageObj.appName).should('have.value', appName);
});

Then('Name displays as {string}', (nodeName: string) => {
  cy.get(addPageObj.nodeName).should('have.value', nodeName);
});

When('user selects resource type as {string}', (resourceType: string) => {
  addPage.selectResource(resourceType);
});

Then('created workload is linked to existing application', () => {
  
});

When('user enters Application name as {string}', (appName: string) => {
  addPage.enterAppName(appName);
});

When('user enters Name as {string}', (name: string) => {
  addPage.enterComponentName(name);
});

When('user unselects the advanced option Create a route to the application', () => {
  addPage.unselectRoute();
});

When('user enters name as {string} in General section', (name: string) => {
  addPage.enterComponentName(name);
});

When('user clicks {string} link in Advanced Options section', (linkName: string) => {
  cy.byButtonText(linkName).click();
});

When('user enters Hostname as {string}', (hostName: string) => {
  cy.get(addPageObj.advancedOptions.routing.hostname).type(hostName);
});

When('user enters Path as {string}', (path: string) => {
  cy.get(addPageObj.advancedOptions.routing.path).type(path);
});

When('select default Target Port', () => {
  cy.get(addPageObj.advancedOptions.routing.targetPort).click();
  cy.get('[data-test-dropdown-menu="8080-tcp"]').click();
  // cy.get('li button[data-test-id="dropdown-menu"]').eq(0).click();
});

When('user enters name as {string} in General section', (name: string) => {
  addPage.enterComponentName(name);
});

When('unselects {string} checkbox in build configuration section', (checkBoxName: string) => {
  cy.get('div.pf-c-check label').contains(checkBoxName).should('be.visible');
  switch (checkBoxName) {
    case 'Configure a webhook build trigger':
      cy.get('#form-checkbox-build-triggers-webhook-field').uncheck();
      break;
    case 'Automatically build a new image when the builder image changes':
      cy.get('#form-checkbox-build-triggers-image-field').uncheck();
      break;
    case 'Launch the first build when the build configuration is created':
      cy.get('#form-checkbox-build-triggers-config-field').uncheck();
      break;
    default:
      throw new Error(`Unable to find the "${checkBoxName}" checbox in Build Configuration Section`);
  }
});

When('user enters Name as {string} in Environment Variables section', (envName: string) => {
  cy.get(addPageObj.advancedOptions.buildConfig.envName).type(envName);
});

When('user enters Value as {string} in Environment Variables section', (envValue: string) => {
  cy.get(addPageObj.advancedOptions.buildConfig.envValue).type(envValue);
});

Then('build does not get started for {string}', (nodeName: string) => {
  // topologyPage.getBuild(nodeName).should('not.be.visible');
  topologyPage.componentNode(nodeName).click({force:true});
  topologySidePane.verify();
  cy.get('div.build-overview li.list-group-item > span').should('contain.text', 'No Builds found for this Build Config.');
});

When('verify {string} checkbox is seleceted', (checkBoxName: string) => {
  if(checkBoxName === 'Auto deploy when new image is available') {
    cy.get('#form-checkbox-deployment-triggers-image-field').should('be.checked');
  }
//  cy.get('div.pf-c-check label').contains(checkBoxName).next('input').should('be.checked');
});

When('user enters Name as {string} in Environment Variables Runtime only section', (envName: string) => {
  cy.get(addPageObj.advancedOptions.deployment.envName).type(envName);
});

When('user enters Value as {string} in Environment Variables Runtime only section', (envValue: string) => {
  cy.get(addPageObj.advancedOptions.deployment.envName).type(envValue);
});

When('user enters CPU Request as {string} in CPU section', (cpuResquestValue: string) => {
  cy.get(addPageObj.advancedOptions.resourceLimit.cpuRequest).type(cpuResquestValue);
});

When('user enters CPU Limits as {string} in CPU section', (cpuLimitValue: string) => {
  cy.get(addPageObj.advancedOptions.resourceLimit.cpuLimit).type(cpuLimitValue);
});

When('user enters Memory Request as {string} in Memory section', (memoryRequestValue: string) => {
  cy.get(addPageObj.advancedOptions.resourceLimit.memoryRequest).type(memoryRequestValue);
});

When('user enters Memory Limit as {string} in Memory section', (memoryLimitValue: string) => {
  cy.get(addPageObj.advancedOptions.resourceLimit.memoryLimit).type(memoryLimitValue);
});

When('user enters number of replicas as {string} in Replicas section', (replicaCount: string) => {
  cy.get(addPageObj.advancedOptions.scaling.replicaCount).type(replicaCount)
});

When('user fills the Readiness Probe details', () => {
  addHealthChecksPage.addReadinessProbe();
});

When('user fills the Liveness Probe details', () => {

});

When('user fills the Startup Probe details', () => {

});

When('user enters label as {string}', (labelName: string) => {
  cy.get(addPageObj.advancedOptions.labels).type(labelName);
});

Then('public url is not created for node {string}', (nodeName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(nodeName);
  // topologyPage.getRoute(nodeName).should('not.be.visible');
  topologyPage.componentNode(nodeName).click({force:true});
  topologySidePane.selectTab('Resources');
  topologySidePane.verifySection('Routes').should('be.visible');
  cy.get('[role="dialog"] h2').contains('Routes').next('span').should('contain.text', 'No Routes found for this resource.');
});

Then('the route of application {string} contains {string}', (nodeName: string, routeName: string) => {
  // topologyPage.getRoute(nodeName).should('contain.text', routeName);
  topologyPage.verifyWorkloadInTopologyPage(nodeName);
  // topologyPage.getRoute(nodeName).should('not.be.visible');
  topologyPage.componentNode(nodeName).click({force:true});
  topologySidePane.selectTab('Resources');
  topologySidePane.verifySection('Routes').should('be.visible');
  cy.get('[role="dialog"] h2').contains('Routes').next('span').should('contain.text', routeName);
});

Then('verify the label {string} in side bar of application node {string}', (labelName: string, nodeName: string) => {
  topologyPage.componentNode(nodeName).click({force:true});
  topologySidePane.selectTab('Details');
  topologySidePane.verifyLabel(labelName);
});
