import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage, addPageObj } from '../../pages/add/add_page';
import { containerImage } from '../../pages/add/containerImage_page';
import { addOptions } from '../../constants/add';
import { topologyPage } from '../../pages/topology_page';

Given('user is at Deploy Image page', () => {
  addPage.selectCardFromOptions(addOptions.ContainerImage);
});

When('user enters Image name from external registry as {string}', (imageName: string) => {
  containerImage.enterExternalRegistryImageName(imageName);
});

Then('git url gets Validated', () => {
  addPage.verifyValidatedMessage();
});

Then('image name gets Validated', () => {
  cy.get('#form-input-searchTerm-field-helper').should('have.text', 'Validated');
});

Then('application name displays as {string}', (appName: string) => {
  cy.get(addPageObj.appName).should('have.value', appName);
});

Then('name displays as {string} in Import from Docker file page', (nodeName: string) => {
  cy.get(addPageObj.nodeName).should('have.value', nodeName);
  cy.get(addPageObj.cancel).click();
});

Then('name displays as {string}', (nodeName: string) => {
  cy.get(addPageObj.nodeName).should('have.value', nodeName);
});

Then('advanced option Create a route to the application is selected', () => {
  cy.get(addPageObj.advancedOptions.createRoute).scrollIntoView().should('be.visible').and('be.checked');
  cy.get(addPageObj.cancel).click();
});

When('user clicks Create button on Deploy Image page', () => {
  addPage.clicKCreate();
});

Then('node is displayed with name {string}', (nodeName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(nodeName);
});

When('user selects Project as {string} from internal registry', (projectName: string) => {
  containerImage.selectProject(projectName)
});

When('user selects Image stream tag from internal registry', () => {
  containerImage.selectInternalImageRegistry();
});

When('user selects Image Stream as {string} from internal registry', (imageSrream: string) => {
  containerImage.selectImageStream(imageSrream);
});

When('user selects tag as {string} from internal registry', (tag: string) => {
  containerImage.selectTag(tag);
});

When('user clicks Cancel button on Deploy Image page', () => {
    cy.get(addPageObj.cancel).click();
});