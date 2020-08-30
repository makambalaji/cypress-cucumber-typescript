import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage, addPageObj } from '../../pages/add/add_page';
import { addOptions } from '../../constants/add';
import { topologyPage } from '../../pages/topology_page';

Given('user is at Import from git page', () => {
  addPage.selectCardFromOptions(addOptions.Git);
});

When('user types Git Repo url as {string}', (gitUrl: string) => {
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
  cy.get(addPageObj.appName, {timeout:3000}).should('have.value', appName);
});

Then('Name displays as {string}', (nodeName: string) => {
  cy.get(addPageObj.nodeName).should('have.value', nodeName);
});

When('clicks Create button on Add page', () => {
  addPage.clicKCreate();
});

When('selects {string} resource type', (resourceType: string) => {
  addPage.selectResource(resourceType);
});

When('click Create button on Add page', () => {
  addPage.clicKCreate();
});

Then('created workload {string} is present in topology page', (workloadName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(workloadName);
});

Then('created workload is linked to existing application', () => {
  
});

When('types Application name as {string}', (appName: string) => {
  addPage.enterAppName(appName);
});

When('types Name as {string}', (name: string) => {
  addPage.enterComponentName(name);
});

When('unselect the advanced option Create a route to the application', () => {
  addPage.unselectRoute();
});

When('type name as {string} in General section', (name: string) => {
  addPage.enterComponentName(name);
});

When('click {string} link in Advanced Options section', (linkName: string) => {
  cy.byButtonText(linkName).click();
});

When('type Hostname as {string}', (hostName: string) => {
  cy.get(addPageObj.advancedOptions.routing.hostname).type(hostName);
});

When('type Path as {string}', (path: string) => {
  cy.get(addPageObj.advancedOptions.routing.path).type(path);
});

When('select Target Port as {string}', (targetPort: string) => {
  cy.get(addPageObj.advancedOptions.routing.targetPort).click();
  cy.contains(targetPort).should('be.visible');
  cy.get('li button[data-test-id="dropdown-menu"]').eq(0).click();
});

When('user types name as {string} in General section', (name: string) => {
  addPage.enterComponentName(name);
});

When('clicks {string} link in Advanced Options section', (linkName: string) => {
  cy.byButtonText(linkName).click();
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

When('type Name as {string} in Environment Variables section', (envName: string) => {
  cy.get(addPageObj.advancedOptions.buildConfig.envName).type(envName);
});

When('type Value as {string} in Environment Variables section', (envValue: string) => {
  cy.get(addPageObj.advancedOptions.buildConfig.envValue).type(envValue);
});

Then('build does not get started', () => {

});

When('verify {string} checkbox is seleceted', (checkBoxName: string) => {
  if(checkBoxName === 'Auto deploy when new image is available') {
    cy.get('#form-checkbox-deployment-triggers-image-field').should('be.checked');
  }
//  cy.get('div.pf-c-check label').contains(checkBoxName).next('input').should('be.checked');
});

When('type Name as {string} in Environment Variables Runtime only section', (envName: string) => {
  cy.get(addPageObj.advancedOptions.deployment.envName).type(envName);
});

When('type Value as {string} in Environment Variables Runtime only section', (envValue: string) => {
  cy.get(addPageObj.advancedOptions.deployment.envName).type(envValue);
});

When('type CPU Request as {string} in CPU section', (cpuResquestValue: string) => {
  cy.get(addPageObj.advancedOptions.resourceLimit.cpuRequest).type(cpuResquestValue);
});

When('type CPU Limits as {string} in CPU section', (cpuLimitValue: string) => {
  cy.get(addPageObj.advancedOptions.resourceLimit.cpuLimit).type(cpuLimitValue);
});

When('type Memory Request as {string} in Memory section', (memoryRequestValue: string) => {
  cy.get(addPageObj.advancedOptions.resourceLimit.memoryRequest).type(memoryRequestValue);
});

When('type Memory Limit as {string} in Memory section', (memoryLimitValue: string) => {
  cy.get(addPageObj.advancedOptions.resourceLimit.memoryLimit).type(memoryLimitValue);
});

When('type number of replicas as {string} in Replicas section', (replicaCount: string) => {
  cy.get(addPageObj.advancedOptions.scaling.replicaCount).type(replicaCount)
});

When('fill the Readiness Probe details', () => {

});

When('fill the Liveness Probe details', () => {

});

When('fill the Startup Probe details', () => {

});

When('type label as {string}', (labelName: string) => {
  cy.get(addPageObj.advancedOptions.labels).type(labelName);
});

Then('public url is not created for node {string}', (a: string) => {
    // TODO: implement step
    cy.log(a)
});

Then('the route of application contains {string}', (a: string) => {
  cy.log(a)
  // TODO: implement step
});

Then('build doesnot get started', () => {
  // TODO: implement step
});

Then('verify the label in application node side pane', () => {
  // TODO: implement step
});
