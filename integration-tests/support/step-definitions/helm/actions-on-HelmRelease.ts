import { When, Then } from "cypress-cucumber-preprocessor/steps";
import {
  upgradeHelmRelease,
  helmDetailsPage,
  rollBackHelmRelease,
  helmPage,
} from "../../pages/helm-page";
import { topologyPage } from "../../pages/topology-page";

When(
  "user right clicks on the Helm Release {string} to open the context menu",
  (nodeName: string) => {
    topologyPage.rightClickOnNode(nodeName);
  }
);

When(
  "user right clicks on the workload of Helm Release {string} to open the context menu",
  (nodeName: string) => {
    cy.log(`Workload of helm release ${nodeName}`);
    topologyPage.rightClickOnHelmWorkload();
  }
);

When("user clicks on the {string} action", (actionName: string) => {
  cy.byTestActionID(actionName).click();
});

When("user upgrades the chart Version", () => {
  upgradeHelmRelease.upgradeChartVersion();
});

When("user clicks on the upgrade button", () => {
  upgradeHelmRelease.clickOnUpgrade();
});

Then("the helm release should get upgradaed", () => {
  helmDetailsPage.verifyTitle();
  helmDetailsPage.verifyFieldValue("Chart Version", "0.1.1");
});

When("user selects the version to Rollback", () => {
  rollBackHelmRelease.selectRevision();
});

When("user clicks on the rollback button", () => {
  rollBackHelmRelease.clickOnRollBack();
});

Then("the helm release rollbacks to the version", () => {
  helmDetailsPage.verifyFieldValue("Revision", "2");
});

When("user enters the release name", () => {
  helmDetailsPage.enterReleaseNameInUninstallPopup();
});

When("user clicks on the Uninstall button", () => {
  helmDetailsPage.uninstallHelmRelease();
});

Then("Helm release gets uninstalled", () => {
  helmPage.verifyMessage();
});

Then("user will be redirected to Topology page with no workloads", () => {
  topologyPage.verifyTitle();
  topologyPage.verifyNoWorkLoadsText("No resources found");
});

Then(
  "user is able to see the context menu with actions Start Rollout, Pause Rollouts, Edit Pod Count, Add Storage, Edit Health Checks, Edit Labels, Edit Annotations, Edit Deployment Config and Delete Deployment Config",
  () => {
    cy.get('ul[role="menu"]').should("be.visible");
    cy.byTestActionID("Start Rollout").should("be.visible");
    cy.byTestActionID("Pause Rollouts").should("be.visible");
    cy.byTestActionID("Edit Pod Count").should("be.visible");
    cy.byTestActionID("Add Storage").should("be.visible");
    cy.byTestActionID("Edit Health Checks").should("be.visible");
    cy.byTestActionID("Edit Labels").should("be.visible");
    cy.byTestActionID("Edit Annotations").should("be.visible");
    cy.byTestActionID("Edit Deployment Config").should("be.visible");
    cy.byTestActionID("Delete Deployment Config").should("be.visible");
  }
);

Then("pod status updated as {string}", (podStatus: string) => {});

Then("pod will be displayed in helm release", () => {});

Then("Resume Rollout is displayed", () => {
  cy.byTestActionID("Resume Rollout").should("be.visible");
});

When("user updates the pod count as {string} in Edit Pod count modal", (podCount: string) => {
  
});