import { When, Then } from "cypress-cucumber-preprocessor/steps";
import {
  topologyPage,
  topologySidePane,
  topologyObj,
} from "../../pages/topology-page";

When("user clicks on workload {string}", (workloadName: string) => {
  topologyPage.componentNode(workloadName).click({ force: true });
});

Then(
  "user can see sidebar opens with Resources tab selected by default",
  () => {
    topologySidePane.verifySelectedTab("Resources");
  }
);

Then("user can see sidebar Details, Resources and Monitoring tabs", () => {
  topologySidePane.verifyTab("Resources");
  topologySidePane.verifyTab("Details");
  topologySidePane.verifyTab("Monitoring");
});

Then(
  "user verifies name of the node {string} and Action drop down present on top of the sidebar",
  (nodeName: string) => {
    topologySidePane.verifyTitle(nodeName);
    cy.byLegacyTestID("actions-menu-button").should("be.visible");
  }
);

Then("user is able to see health check notifiation", () => {
  cy.get('[role="dialog"] h4').contains("Health Checks").should("be.visible");
});

Then("user can see close button", () => {
  cy.get(topologyObj.sidePane.close).should("be.visible");
});
