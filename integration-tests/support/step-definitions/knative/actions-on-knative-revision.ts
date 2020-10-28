import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {
  editLabels,
  deleteRevision,
  modal,
  editAnnotations,
} from "../../pages/modal";
import { topologyPage, topologySidePane } from "../../pages/topology-page";
import { addPage } from "../../pages/add-flow/add-page";

Given(
  "number of annotations are {string} present in revision side bar details of service {string}",
  (numOfAnnotations: string, serviceName: string) => {
    cy.log(`click on knative Revision of knative service ${serviceName}`);
    topologyPage.waitForKnativeRevision();
    topologyPage.clickOnKnativeRevision();
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
  }
);

Given("service should contain multiple revisions", () => {
  addPage.createGitWorkload(
    "https://github.com/sclorg/nodejs-ex.git",
    "nodejs-ex-git-1",
    "Knative"
  );
  // TODO: implement step
});

When(
  "user right clicks on the revision of knative service {string} to open the context menu",
  (serviceName: string) => {
    cy.log(`Right click on the knative revision of service ${serviceName}`);
    topologyPage.waitForKnativeRevision();
    topologyPage.rightClickOnKnativeRevision();
  }
);

Given(
  "user added label {string} to the revision of knative service {string}",
  (labelName: string, serviceName: string) => {
    cy.log(
      `Add the label ${labelName} to knative revision of service ${serviceName}`
    );
    topologyPage.waitForKnativeRevision();
    topologyPage.rightClickOnKnativeRevision();
    cy.byTestActionID("Edit Labels").click();
    editLabels.enterLabel(labelName);
    modal.clicKSave();
  }
);

When(
  "user selects {string} option from knative revision context menu",
  (option: string) => {
    cy.byTestActionID(option).click();
  }
);

When(
  "user removes the label {string} from existing labels list in Edit Labels modal",
  (labelName: string) => {
    editLabels.removeLabel(labelName);
  }
);

When(
  "user adds the label {string} to existing labels list in Edit Labels modal",
  (labelName: string) => {
    editLabels.enterLabel(labelName);
  }
);

When(
  "removes the label {string} from existing labels list in {string} modal",
  (labelName: string, modalHeader: string) => {
    cy.alertTitleShouldContain(modalHeader);
    editLabels.removeLabel(labelName);
  }
);

When(
  "user clicks on remove icon for the annotation with key {string} present in {string} modal",
  (annotationKey: string, modalHeader: string) => {
    cy.alertTitleShouldContain(modalHeader);
    editAnnotations.removeAnnotation(annotationKey);
  }
);

When(
  "user clicks cancel button on the {string} modal",
  (modalTitle: string) => {
    cy.alertTitleShouldContain(modalTitle);
    modal.clickCancel();
  }
);

When("user clicks on Details tab", () => {
  topologyPage.revisionDetails.clickOnDetailsTab();
});

When("user modifies the Yaml file of the Revision details page", () => {});

When("user clicks save button on Revision Yaml page", () => {
  topologyPage.revisionDetails.yaml.clickOnSave();
});

Then(
  "user is able to see Edit Labels, Edit Annotations, Edit Revision, Delete Revision options in context menu",
  () => {
    cy.byTestActionID("Edit Labels").should("be.visible");
    cy.byTestActionID("Edit Annotations").should("be.visible");
    cy.byTestActionID("Edit Revision").should("be.visible");
    cy.byTestActionID("Delete Revision").should("be.visible");
  }
);

Then("save button is displayed", () => {
  modal.verifySaveButtonIsDisplayed();
  modal.clickCancel();
});

Then("save, cancel buttons are displayed", () => {
  modal.verifyCancelButtonIsDisplayed();
  modal.verifySaveButtonIsDisplayed();
  modal.clickCancel();
});

Then(
  "user can see the label {string} in the Details tab of the Sidebar of {string}",
  (label: string, serviceName: string) => {
    cy.log(`knative revision of service ${serviceName}`);
    cy.byLegacyTestID("base-node-handler")
      .find("g.odc-resource-icon")
      .click({ force: true });
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyLabel(label);
  }
);

Then("key, value columns are displayed with respecitve text fields", () => {
  cy.get('input[placeholder="key"]').its("length").should("be.gte", 1);
  cy.get('input[placeholder="value"]').its("length").should("be.gte", 1);
});

Then("Add more link is enabled", () => {
  editAnnotations.add();
});

Then(
  "user can see the annotation {string} in the Details tab of the Sidebar of {string}",
  (numOfAnnotations: string, serviceName: string) => {
    cy.byLegacyTestID("base-node-handler")
      .find("g.odc-resource-icon")
      .click({ force: true });
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
  }
);

Then(
  "verify the number of Annotations equal to {string} in side bar details",
  (a: string) => {
    cy.log(a);
  }
);

Then(
  "verify the number of Annotations decreased to {string} in side bar details",
  (a: string) => {
    cy.log(a);
  }
);

Then(
  "details tab displayed with Revision Details and Conditions sections",
  () => {
    topologyPage.revisionDetails.details.verifyRevisionSummary();
    topologyPage.revisionDetails.details.verifyConditionsSection();
  }
);

Then(
  "Revision details contains fields like Name, Namespace, Labels, Annotations, Created At, Owner",
  () => {
    cy.get('[data-test-selector="details-item-label__Name"]').should(
      "be.visible"
    );
    cy.get('[data-test-selector="details-item-label__Namespace"]').should(
      "be.visible"
    );
    cy.get('[data-test-selector="details-item-label__Labels"]').should(
      "be.visible"
    );
    cy.get('[data-test-selector="details-item-label__Annotations"]').should(
      "be.visible"
    );
    cy.get('[data-test-selector="details-item-label__Created at"]').should(
      "be.visible"
    );
    cy.get('[data-test-selector="details-item-label__Owner"]').should(
      "be.visible"
    );
  }
);

Then("the message display as {string}", (message: string) => {
  cy.log(message);
  // TODO: implement step
});

Then("another message display as {string}", (message: string) => {
  cy.log(message);
  // TODO: implement step
});

Then("modal contains message as {string}", (message: string) => {
  deleteRevision.verifyMessage(message);
});

Then(
  "number of Annotations increased to {string} in revision side bar details of service {string}",
  (numOfAnnotations: string, serviceName: string) => {
    cy.byLegacyTestID("base-node-handler")
      .find("g.odc-resource-icon")
      .click({ force: true });
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
  }
);
