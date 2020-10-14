import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { catalogPage, catalogPageObj } from "../../pages/add-flow/catalog-page";
import { addPage } from "../../pages/add-flow/add-page";
import { catalogTypes, addOptions } from "../../constants/add";
import { topologyPage } from "../../pages/topology-page";

let d = new Date();
const timestamp = d.getTime();

Given("Opeator Backed is selected on Developer Catalog page", () => {
  catalogPage.selectCatalogTypeCheckBox(catalogTypes.OperatorBacked);
});

Given(
  "user is at Developer Catalog page with OperatorBacked type selection",
  () => {
    addPage.selectCardFromOptions(addOptions.OperatorBacked);
  }
);

When("user selects knative Serving card", () => {
  catalogPage.selectknativeServingCard();
});

When("user clicks Create button in side bar", () => {
  catalogPage.clickButtonOnCatalogPageSidePane();
});

When(
  "user enters name as {string} in Create knative Serving page",
  (name: string) => {
    cy.get(catalogPageObj.createknativeServing.logo).should("be.visible");
    cy.get(catalogPageObj.createknativeServing.name)
      .clear()
      .type(`${name}-${timestamp}`);
  }
);

When("user clicks create button in Create knative Serving page", () => {
  cy.get('button[type="submit"]').click();
});

When("user clicks cancel button in Create knative Serving page", () => {
  cy.get(catalogPageObj.createknativeServing.logo).should("be.visible");
  cy.byButtonText("Cancel").click();
});

Then(
  "user is able to see workload {string} in topology page from knative Serving page",
  (name: string) => {
    topologyPage.verifyWorkloadInTopologyPage(`${name}-${timestamp}`);
  }
);
