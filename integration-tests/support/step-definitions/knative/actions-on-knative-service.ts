import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { addPage } from "../../pages/add-flow/add-page";
import { resourceTypes } from "../../constants/add";
import { topologyPage, topologySidePane } from "../../pages/topology-page";
import {
  editLabels,
  editAnnotations,
  deleteRevision,
  modal,
  setTrafficDistribution,
  editApplicationGrouping,
} from "../../pages/modal";
import { naviagteTo } from "../../pages/app";
import { devNavigationMenu } from "../../constants/global";
import { eventSourcesPage } from "../../pages/add-flow/eventSource-page";

Given(
  "user has created knative service {string}",
  (knativeServiceName: string) => {
    naviagteTo(devNavigationMenu.Add);
    addPage.createGitWorkload(
      "https://github.com/sclorg/nodejs-ex.git",
      knativeServiceName,
      resourceTypes.knativeService
    );
    topologyPage.verifyWorkloadInTopologyPage(knativeServiceName);
  }
);

Given(
  "user has created another knative service {string}",
  (knativeServiceName: string) => {
    naviagteTo(devNavigationMenu.Add);
    addPage.createGitWorkload(
      "https://github.com/sclorg/nodejs-ex.git",
      knativeServiceName,
      resourceTypes.knativeService
    );
    topologyPage.verifyWorkloadInTopologyPage(knativeServiceName);
  }
);

Given(
  "user has created knative services {string} and {string}",
  (knativeServiceName: string, knativeServiceName1: string) => {
    naviagteTo(devNavigationMenu.Add);
    addPage.createGitWorkload(
      "https://github.com/sclorg/nodejs-ex.git",
      knativeServiceName,
      resourceTypes.knativeService
    );
    topologyPage.verifyWorkloadInTopologyPage(knativeServiceName);
    naviagteTo(devNavigationMenu.Add);
    addPage.createGitWorkload(
      "https://github.com/sclorg/nodejs-ex.git",
      knativeServiceName1,
      resourceTypes.knativeService
    );
    topologyPage.verifyWorkloadInTopologyPage(knativeServiceName1);
  }
);

Given("user has created {string} event source", (eventSourceName: string) => {
  naviagteTo(devNavigationMenu.Add);
  eventSourcesPage.createSinkBinding(eventSourceName);
});

When(
  "user right clicks on the knative service {string}",
  (knativeServiceName: string) => {
    topologyPage.rightClickOnNode(knativeServiceName);
  }
);

Then(
  "user is able to see the options like Edit Application Grouping, Set Traffic Distribution, Edit Health Checks, Edit Labels, Edit Annotations, Edit Service, Delete Service, {string}",
  (knativeServiceName: string) => {
    cy.byTestActionID("Edit Application Grouping").should("be.visible");
    cy.byTestActionID("Set Traffic Distribution").should("be.visible");
    cy.byTestActionID(`Edit ${knativeServiceName}`).should("be.visible");
    cy.byTestActionID("Edit Health Checks").should("be.visible");
    cy.byTestActionID("Edit Labels").should("be.visible");
    cy.byTestActionID("Edit Annotations").should("be.visible");
    cy.byTestActionID("Edit Service").should("be.visible");
    cy.byTestActionID("Delete Service").should("be.visible");
  }
);

When(
  "user adds the label {string} to exisitng labels list in Edit Labels modal",
  (labelName: string) => {
    editLabels.enterLabel(labelName);
  }
);

When(
  "user clicks the save button on the {string} modal",
  (modalTitle: string) => {
    cy.alertTitleShouldContain(modalTitle);
    modal.clicKSave();
  }
);

When(
  "user clicks the cancel button on the {string} modal",
  (modalTitle: string) => {
    cy.alertTitleShouldContain(modalTitle);
    modal.clickCancel();
  }
);

When("user searches for application name {string}", (appName: string) => {
  topologyPage.search(appName);
});

Given("service should have at least 2 revisions", () => {
  cy.get('[data-test-id="base-node-handler"]', { timeout: 150000 }).should(
    "be.visible"
  );
});

Given(
  "user created another revision {string} for knative Service {string",
  (revisionName: string, knativeServiceName: string) => {
    naviagteTo(devNavigationMenu.Add);
    addPage.createGitWorkload(
      "https://github.com/sclorg/nodejs-ex.git",
      revisionName,
      resourceTypes.knativeService,
      knativeServiceName
    );
    topologyPage.verifyWorkloadInTopologyPage(knativeServiceName);
    cy.get('[data-test-id="base-node-handler"]', { timeout: 150000 }).should(
      "have.length",
      2
    );
  }
);

When(
  "user selects {string} context menu option of knative service {string}",
  (option: string, knativeServiceName: string) => {
    topologyPage.rightClickOnNode(knativeServiceName);
    topologyPage.selectContextMenuAction(option);
  }
);

When("user clicks Add button on the Edit Annotations modal", () => {
  editAnnotations.add();
});

Given(
  "user created another revision {string} for knative Service {string}",
  (revisionName: string, serviceName: string) => {
    topologyPage.waitForKnativeRevision();
    naviagteTo(devNavigationMenu.Add);
    addPage.createGitWorkload(
      "https://github.com/sclorg/nodejs-ex.git",
      revisionName,
      resourceTypes.knativeService,
      serviceName
    );
  }
);

Given(
  "number of annotations are {string} present in {string} service side bar details tab",
  (numOfAnnotations: string, serviceName: string) => {
    topologyPage.clickOnNode(serviceName);
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
    topologySidePane.close();
  }
);

When("user enters annotation key as {string}", (key: string) => {
  editAnnotations.enterKey(key);
});

When("user enters annotation value as {string}", (value: string) => {
  editAnnotations.enterValue(value);
});

When(
  "user enters {string} into the Split text box",
  (splitPercentage: string) => {
    cy.get('[id$="percent-field"]').last().type(splitPercentage);
  }
);

When(
  "user clicks on Add Revision button present in Set Traffic Distribution modal",
  (a: string, b: string) => {
    setTrafficDistribution.add();
  }
);

When(
  "user enters {string} into the Split text box of new revision",
  (splitPercentage: string) => {
    cy.get('[id$="percent-field"]').last().type(splitPercentage);
  }
);

When("user selects another revision from Revision drop down", () => {
  cy.byLegacyTestID("dropdown-button").click();
  cy.byLegacyTestID("dropdown-menu").last().click();
});

Then(
  "user will see the label {string} in {string} service side bar details",
  (label: string, serviceName: string) => {
    topologyPage.clickOnNode(serviceName);
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyLabel(label);
  }
);

Then(
  "user will not see the label {string} in {string} service side bar details",
  (label: string, serviceName: string) => {
    topologyPage.clickOnNode(serviceName);
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    cy.get('[data-test-selector="details-item-label__Labels"]').should('be.visible');
    cy.get('[data-test="label-list"] a')
      .contains(label)
      .should("not.be.visible");
  }
);

Given(
  "label {string} is added to the knative service {string}",
  (labelName: string, knativeServiceName: string) => {
    topologyPage.rightClickOnNode(knativeServiceName);
    topologyPage.selectContextMenuAction("Edit Labels");
    modal.isDisplayed();
    editLabels.enterLabel(labelName);
    modal.clicKSave();
  }
);

Then(
  "number of Annotations increased to {string} in {string} service side bar details",
  (numOfAnnotations: string, serviceName: string) => {
    topologyPage.clickOnNode(serviceName);
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
  }
);

Then(
  "number of Annotations display as {string} in {string} service side bar details",
  (numOfAnnotations: string, serviceName: string) => {
    topologyPage.clickOnNode(serviceName);
    topologySidePane.verify();
    topologySidePane.selectTab("Details");
    topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
  }
);

When(
  "user clicks on remove icon for the annotation with key {string} present in Edit Annotations modal",
  (key: string) => {
    editAnnotations.removeAnnotation(key);
  }
);

Then("error message displays as {string}", (errorMessage: string) => {
  cy.get('div[aria-label="Danger Alert"] div.co-pre-line').should(
    "contain.text",
    errorMessage
  );
});

Then(
  "number of routes should get increased in side bar - resources tab - routes section",
  () => {
    topologyPage.clickOnNode("nodejs-ex-git-1");
    topologySidePane.verify();
    topologySidePane.verifyTab("Resources");
    cy.get('[title="Route"]').should("have.length", 2);
  }
);

Then("modal displayed with header name {string}", (headerName: string) => {
  cy.alertTitleShouldContain(headerName);
});

Then("modal get closed on clicking Delete button", () => {
  modal.clicKDelete();
  cy.get("form").should("not.be.visible");
});

Then("modal should get closed on clicking OK button", () => {
  deleteRevision.clickOK();
});

Then(
  "{string} service should not be displayed in project",
  (serviceName: string) => {
    topologyPage.verifyNoWorkLoadsText("No resources found").then(() => {
      cy.log(`${serviceName} is removed from the project namespace`);
    });
  }
);

When("user clicks save button on yaml page", () => {
  cy.get("#save-changes").click();
});

When("user clicks cancel button on {string} page", (pageName: string) => {
  cy.pageTitleShouldContain(pageName);
  cy.byLegacyTestID("reset-button").click();
});

When("user selects the {string} option from Application drop down", () => {
  // TODO: implement step
});

When("user modifies the Yaml file of the Service details page", () => {
  // TODO: implement step
});

When(
  "user enters {string} into the Application Name text box",
  (appName: string) => {
    // TODO: implement step
  }
);

Given(
  "number of annotations are {string} present in side bar - details tab- annotation section",
  (a: string) => {
    cy.log(a);
    // TODO: implement step
  }
);

Given(
  "number of annotations are {string} present in side bar - details tab",
  (a: string) => {
    cy.log(a);
    // TODO: implement step
  }
);

When(
  "user removes the label {string} from exisitng labels list in {string} modal",
  (labelName: string, modalHeader: string) => {
    cy.alertTitleShouldContain(modalHeader);
    editLabels.removeLabel(labelName);
  }
);

When(
  "user clicks on {string} icon for the annotation with key {string} present in {string} modal",
  (a: string, b: string, c: string) => {
    cy.log(a, b, c);
    // TODO: implement step
  }
);

When(
  "user clicks {string} button on the {string} modal",
  (a: string, b: string) => {
    cy.log(a, b);
    // TODO: implement step
  }
);

When("user modifies the Yaml file of the Revision details pagex", () => {
  // TODO: implement step
});

When("user clicks save button on the Edit Service Page", () => {
  // TODO: implement step
});

When(
  "user selects the {string} option from application drop down present in {string} modal",
  (option: string, modalHeader: string) => {
    cy.alertTitleShouldContain(modalHeader);
    editApplicationGrouping.selectApplication(option);
  }
);

Then(
  "number of Annotations decreased to {string} in side bar details",
  (num: string) => {
    topologySidePane.verifyNumberOfAnnotations(num);
  }
);

Then("message should display as {string}", (message: string) => {
  cy.log(message);
  // TODO: implement step
});

Then("another message should display as {string}", (message: string) => {
  cy.log(message);
  // TODO: implement step
});

Then("updated service {string} is present in side bar of application {string}", (serviceName: string, applicationName: string) => {
  topologySidePane.verifyResourcesForApplication(applicationName, serviceName);
});

Then("updated service {string} should not display in side bar of application {string}", (serviceName: string, applicationName: string) => {
  topologyPage.clickOnApplicationNode(applicationName);
  cy.byLegacyTestID(serviceName).should('not.be.visible');
});
