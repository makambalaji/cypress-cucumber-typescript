import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { catalogPage, catalogPageObj } from '../../pages/add/catalog_page';
import { topologyPage } from '../../pages/topology_page';
import { addPage } from '../../pages/add/add_page';

Given('Opeator Backed is selected on Developer Catalog page', () => {
  catalogPage.selectOperatorBackedCheckBox();
});

When('user selects knative Serving card', () => {
  catalogPage.selectknativeServingCard();
});

When('user clicks Create button in side bar', () => {
  catalogPage.clickCreateButtonOnSidePane();
});

When('user enters name as {string} in Create knative Serving page', (name: string) => {
  cy.get(catalogPageObj.createknativeServing.logo).should('be.visible');
  cy.get(catalogPageObj.createknativeServing.name).type(name);
});

When('user clicks create button in Create knative Serving page', () => {
  addPage.clicKCreate();
});

When('user clicks cancel button in Create knative Serving page', () => {
  addPage.clickCancel();
});
