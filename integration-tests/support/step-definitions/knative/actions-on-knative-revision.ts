import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {
  editLabels,
  deleteRevision,
  modal,
  editAnnotations,
} from "../../pages/modal";
import { topologyPage, topologySidePane } from "../../pages/topology-page";

Given(
  "number of annotations are {string} present in revision side bar details of service {string}",
  (numOfAnnotations: string, serviceName: string) => {
    cy.byLegacyTestID("base-node-handler")
      .find("g.odc-resource-icon")
      .click({ force: true });
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
  }
);

Given(
  "number of annotations are {string} present in side bar - details tab- annotation section",
  (a: string) => {
    cy.log(a);
  }
);

Given(
  "number of annotations are {string} present in side bar - details tab",
  (a: string) => {
    cy.log(a);
  }
);

Given("service should contain multiple revisions", () => {
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
  (a: string, b: string) => {
    cy.log(a, b);
  }
);

When("types {string} into the {string} text box", (a: string, b: string) => {
  cy.log(a, b);
});

When(
  "user clicks on {string} icon for the annotation with key {string} present in {string} modal",
  (a: string, b: string, c: string) => {
    cy.log(a, b, c);
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
  // TODO: implement step
});

When("user modifies the Yaml file of the Revision details page", () => {});

When("user clicks {string} button on Revision Yaml page", (a: string) => {
  cy.log(a);
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

Then("save button is disabled", () => {
  modal.verifySaveButtonIsDisabled();
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
    cy.byLegacyTestID("base-node-handler")
      .find("g.odc-resource-icon")
      .click({ force: true });
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyLabel(label);
  }
);

Then("key, value columns are displayed with respecitve text fields", () => {
  cy.get('input[placeholder="key"]').should("be.greaterThan", 1);
  cy.get('input[placeholder="value"]').should("be.greaterThan", 1);
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
    // TODO: implement step
  }
);

Then(
  "Revision details contains fields like Name, Namespace, Labels, Annotations, Created At, Owner",
  () => {
    // TODO: implement step
  }
);

Then("the message display as {string}", (a: string) => {
  cy.log(a);
});

Then("another message display as {string}", (a: string) => {
  cy.log(a);
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
