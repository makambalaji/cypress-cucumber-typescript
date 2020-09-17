import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage, addPageObj } from '../../pages/add-flow/add-page';
import { containerImagePage } from '../../pages/add-flow/containerImage-page';
import { catalogPage } from '../../pages/add-flow/catalog-page';
import { addOptions } from '../../constants/add';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';

Given('user is on {string} form', (formName: string) => {
  naviagteTo(devNavigationMenu.Add);
  addPage.selectCardFromOptions(formName);
});

Given('builder images are displayed', () => {
  // TODO: implement step
});

When('user clicks on From git card', () => {
  addPage.selectCardFromOptions(addOptions.Git);
});

When('user clicks on Container Image card', () => {
  addPage.selectCardFromOptions(addOptions.ContainerImage);
});

When('user clicks on From Dockerfile card', () => {
  addPage.selectCardFromOptions(addOptions.DockerFile);
});

When('user clicks on From Catalog card', () => {
  addPage.selectCardFromOptions(addOptions.DeveloperCatalog);
});

When('create the application with s2i builder image', () => {
  // TODO: implement step
});

When('user type {string} into the Image name from External registry text box', (imageName: string) => {
  containerImagePage.enterExternalRegistryImageName(imageName);
});

When('user selects {string} radio button on Add page', (resourceType: string) => {
 addPage.selectResource(resourceType)
});

When('user searches and selects the {string} card', (cardName: string) => {
 catalogPage.search(cardName);
});

When('user creates the application with the selected builder image', () => {
  // TODO: implement step
});

When('user enters name as {string}', (workloadName: string) => {
  addPage.enterComponentName(workloadName)
});

Then('user will be redirected to page with header name {string}', (headerName: string) => {
  addPage.verifyTitle(headerName);
});

Then('Knative Service option is displayed under Resources section', () => {
  cy.get(addPageObj.resources.knative).scrollIntoView().should('be.visible');
});
