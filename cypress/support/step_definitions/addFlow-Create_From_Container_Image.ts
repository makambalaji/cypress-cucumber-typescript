import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { seelctCardFromOptions, containerImage, gitPage, gitPageObj } from '../pages/add_page';
import { addOptions } from '../constants/add';
import { topologyPage } from '../pages/topology_page';

Given('user is at Deploy Image page', () => {
  seelctCardFromOptions(addOptions.ContainerImage);
});

When('user types Image name from external registry as {string}', (imageName: string) => {
  containerImage.enterExternalRegistryImageName(imageName);
});

Then('git url gets Validated', () => {
  gitPage.verifyValidatedMessage();
});

Then('Application name displays as {string}', (appName: string) => {
  cy.get(gitPageObj.appName, {timeout:3000}).should('have.value', appName);
});

Then('Name displays as {string}', (nodeName: string) => {
  cy.get(gitPageObj.nodeName, {timeout:3000}).should('have.value', nodeName);
});

Then('advanced option Create a route to the application is selected', () => {
  cy.get(gitPageObj.advancedOptions.createRoute).should('be.checked');
});

When('user clicks Create button on Deploy Image page', () => {
  gitPage.createWorkload();
});

Then('node is displayed with name {string}', (nodeName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(nodeName);
});

When('user selects Projects as {string} from internal registry', (projectName: string) => {
  containerImage.selectProject(projectName)
});

When('user selects Image stream tag from internal registry ', () => {
  containerImage.selectInternalImageRegistry();
});

When('selects Image Stream as {string} from internal registry', (imageSrream: string) => {
  containerImage.selectImageStream(imageSrream);
});

When('selects tag as {string} from internal registry', (tag: string) => {
  containerImage.selectTag(tag);
});

When('user clicks Cancel button on Deploy Image page', () => {
    cy.get(gitPageObj.cancel).click();
});