import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { catalogPage, catalogPageObj } from '../../pages/add-flow/catalog-page';
import { addPage } from '../../pages/add-flow/add-page';
import { catalogTypes, addOptions } from '../../constants/add';

Given('Opeator Backed is selected on Developer Catalog page', () => {
  catalogPage.selectCatalogTypeCheckBox(catalogTypes.OperatorBacked);
});

Given('user is at Developer Catalog page with OperatorBacked type selection', () => {
  addPage.selectCardFromOptions(addOptions.OperatorBacked);
});

When('user selects knative Serving card', () => {
  catalogPage.selectknativeServingCard();
});

When('user clicks Create button in side bar', () => {
  catalogPage.clickButtonOnCatalogPageSidePane();
});

When('user enters name as {string} in Create knative Serving page', (name: string) => {
  cy.get(catalogPageObj.createknativeServing.logo).should('be.visible');
  cy.get(catalogPageObj.createknativeServing.name).clear().type(name);
});

When('user clicks create button in Create knative Serving page', () => {
  cy.get('button[type="submit"]').click();
});

When('user clicks cancel button in Create knative Serving page', () => {
  cy.byButtonText('Cancel').click();
});
