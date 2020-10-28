import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import {
  upgradeHelmRelease,
  helmDetailsPage,
  rollBackHelmRelease,
  helmPage,
} from "../../pages/helm-page";
import { topologyPage } from "../../pages/topology-page";
import { editPodCount, modal } from "../../pages/modal";
import { naviagteTo } from "../../pages/app";
import { devNavigationMenu } from "../../constants/global";

When(
  "user right clicks on the Helm Release {string} to open the context menu",
  (nodeName: string) => {
    topologyPage.rightClickOnNode(nodeName);
  }
);

Then(
  "user is able to see the actions dropdown menu with actions Upgrade, Rollback and Uninstall Helm Release",
  () => {
    cy.byTestActionID("Upgrade").should("be.visible");
    cy.byTestActionID("Rollback").should("be.visible");
    cy.byTestActionID("Uninstall Helm Release").should("be.visible");
  }
);

Then(
  "user is able to see kebab menu with actions Upgrade, Rollback and Uninstall Helm Release",
  () => {
    cy.byTestActionID("Upgrade").should("be.visible");
    cy.byTestActionID("Rollback").should("be.visible");
    cy.byTestActionID("Uninstall Helm Release").should("be.visible");
  }
);

When("user clicks on the Actions drop down menu", () => {
  cy.byLegacyTestID("actions-menu-button").click();
});

Given(
  "user is on the Helm page with helm release {string}",
  (helmRelease: string) => {
    naviagteTo(devNavigationMenu.Helm);
    helmPage.search(helmRelease);
  }
);

When("user clicks on the Kebab menu", () => {
  helmPage.selectKebabMenu();
});

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

Then("pod status updated as {string}", (podStatus: string) => {
  cy.byLegacyTestID("base-node-handler")
    .find("text tspan")
    .eq(1)
    .should("contain.text", podStatus);
});

Then("pod will be displayed in helm release", () => {
  cy.byLegacyTestID("base-node-handler")
    .find("text tspan")
    .eq(1)
    .should("contain.text", "pod");
});

Then("Resume Rollout is displayed", () => {
  cy.byTestActionID("Resume Rollouts").should("be.visible");
});

When(
  "user updates the pod count as {string} in Edit Pod count modal",
  (podCount: string) => {
    editPodCount.enterPodCount(podCount);
  }
);

When("user clicks on Save in Edit Pod Count modal", () => {
  modal.clicKSave();
});

Then(
  "Pod count displays as {string} for helm release workload {string}",
  (podCount: string, helmReleaseWorkload: string) => {
    topologyPage.clickOnNode(helmReleaseWorkload);
    cy.byLegacyTestID("base-node-handler")
      .find("text tspan")
      .eq(0)
      .should("contain.text", podCount);
  }
);

When("user clicks Save button on Add Storage page", () => {
  topologyPage.addStorage.clickSave();
});

When(
  "user creates the new claim {string} with default storage class",
  (claim: string) => {
    topologyPage.addStorage.pvc.createNewClaim.clickCreateNewClaim();
    topologyPage.addStorage.pvc.createNewClaim.selectStorageClass();
    topologyPage.addStorage.pvc.createNewClaim.enterPVCName(claim);
  }
);

When(
  "user enters the storage capacity as {string} GiB",
  (storageCapacity: string) => {
    topologyPage.addStorage.pvc.createNewClaim.enterSize(storageCapacity);
  }
);

When("user enters the Mount Path as {string}", (mountPath: string) => {
  topologyPage.addStorage.enterMountPath(mountPath);
});

Then("user redirects to deployment config detils page", () => {
  cy.get('[data-test-section-heading="Deployment Config Details"]').should(
    "contain.text",
    "Deployment Config Details"
  );
});

Then("user redirects to Edit Health Checks page", () => {
  cy.pageTitleShouldContain("Edit Health Checks");
});

When("user clicks Save button on the Edit Labels modal", () => {
  modal.clicKSave();
});

When("user clicks Save button on the Edit Annotations modal", () => {
  modal.clicKSave();
});

Then(
  "user verifies the label in side pane of the Helm Release workload {string}",
  (workloadName: string) => {}
);

Then(
  "number of annotatoins increases in side pane of the Helm Release workload {string}",
  (workloadName: string) => {}
);

When("user clicks Save button on the Deployment Config details page", () => {});

When("user clicks Delete button on Delete Deployment Config modal", () => {
  modal.clicKDelete();
});
