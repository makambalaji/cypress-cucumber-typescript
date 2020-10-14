import { When, Then } from "cypress-cucumber-preprocessor/steps";
import { addPage } from "../../pages/add-flow/add-page";
import { catalogPage, catalogPageObj } from "../../pages/add-flow/catalog-page";
import { addOptions } from "../../constants/add";
import { topologyPage } from "../../pages/topology-page";

Then("user can see Helm Chart card on the Add page", () => {
  addPage.verifyCard("Helm Chart");
});

When("user clicks on the Helm Chart card on the Add page", () => {
  addPage.verifyCard("Helm Chart");
  addPage.selectCardFromOptions(addOptions.HelmChart);
});

Then("user will get redirected to Developer Catalog page", () => {
  catalogPage.verifyTitle();
});

Then(
  "user is able to see Helm Chart option is selected in Developer Catalog page",
  () => {
    catalogPage.isCheckBoxSelected("Helm Charts");
  }
);

Then("user is able to see Helm Charts cards", () => {
  catalogPage.isCardsDisplayed();
});

When("user searches for the {string} helm chart", (helmChartName: string) => {
  catalogPage.search(helmChartName);
});

When("user clicks on the {string} helm chart card", (helmChartName: string) => {
  catalogPage.selectHelmChartCard(helmChartName);
});

When("user enters Release Name as {string}", (releaseName: string) => {
  catalogPage.enterReleaseName(releaseName);
});

When("user clicks on the Install Helm Chart button on side bar", () => {
  catalogPage.verifyDialog();
  cy.get(catalogPageObj.sidePane.installHelmChart).click({ force: true });
});

When("user clicks on the Install button in Install Helm chart page", () => {
  catalogPage.verifyInstallHelmChartPage();
  catalogPage.clickOnInstallButton();
});

Then(
  "Topology page have the helm chart workload {string}",
  (nodeName: string) => {
    topologyPage.verifyWorkloadInTopologyPage(nodeName);
  }
);

When("user clicks on the Developer Catalog card on the Add page", () => {
  addPage.selectCardFromOptions(addOptions.DeveloperCatalog);
});

When("user checks the Helm Charts checkbox", () => {
  cy.get('input[title="Helm Charts"]').check();
});

When(
  "user right clicks on the helm release {string}",
  (helmReleaseName: string) => {
    topologyPage.rightClickOnNode(helmReleaseName);
  }
);

Then(
  "user is able to see the context menu with actions Upgrade, Rollback and Uninstall Helm Release",
  () => {
    cy.get('ul[role="menu"]').should("be.visible");
    cy.byTestActionID("Upgrade").should("be.visible");
    cy.byTestActionID("Rollback").should("be.visible");
    cy.byTestActionID("Uninstall Helm Release").should("be.visible");
  }
);
