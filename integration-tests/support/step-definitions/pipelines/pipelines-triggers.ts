import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {
  pipelinesPage,
  pipelinesObj,
} from "../../pages/pipelines/pipelines-page";
import { pipelineBuilderPage } from "../../pages/pipelines/pipelineBuilder-page";
import {
  pipelineDetailsPage,
  triggerTemplateDetailsPage,
  eventListenerDetailsPage,
  clusterTriggerBindingDetailsPage,
} from "../../pages/pipelines/pipelineDetails-page";
import { naviagteTo } from "../../pages/app";
import { devNavigationMenu } from "../../constants/global";

const store: Record<string, string> = {};

Given(
  "pipeline {string} is available with git resource",
  (pipelineName: string) => {
    pipelinesPage.clickOncreatePipeline();
    pipelineBuilderPage.createPipelineWithGitresources(pipelineName);
    store.pipelineName = pipelineName;
    cy.get('[data-test-id="breadcrumb-link-0"]').click();
  }
);

When(
  "user selects {string} from the kebab menu for {string}",
  (option: string, pipelineName: string) => {
    pipelinesPage.selectKebabMenu(pipelineName);
    cy.byTestActionID(option).click();
  }
);

Then("Git provider type field is enabled", () => {
  cy.get(pipelinesObj.addTrigger.gitProviderType).should("be.enabled");
});

Then("Add button is disabled", () => {
  cy.get(pipelinesObj.addTrigger.add).should("be.disabled");
  cy.get(pipelinesObj.addTrigger.cancel).click();
});

Given("user is at Add Trigger modal", () => {
  pipelinesPage.selectKebabMenu(store.pipelineName);
  cy.byTestActionID("Add Trigger").click();
});

When("user clicks on {string} link", (linkName: string) => {
  cy.get(pipelinesObj.addTrigger.variablesLink).contains(linkName).click();
});

Then(
  "user should be able to see {string} link with varaibles section",
  (linkName: string) => {
    cy.get(pipelinesObj.addTrigger.variablesLink).contains(linkName).click();
  }
);

Then("variables section displayed with message {string}", (text: string) => {
  cy.get(pipelinesObj.addTrigger.variablesMessage).should("contain.text", text);
});

Then("Add button is enabled", () => {
  cy.get(pipelinesObj.addTrigger.add).should("be.enabled");
  cy.get(pipelinesObj.addTrigger.cancel).click();
});

Given("{string} is displayed on pipelines page", (pipelineName: string) => {
  pipelinesPage.clickOncreatePipeline();
  pipelineBuilderPage.createPipelineFromBuilderPage(pipelineName);
  cy.get('[data-test-id="breadcrumb-link-0"]').click();
  pipelinesPage.verifyNameInPipelinesTable(pipelineName);
});

When(
  "user selects the {string} from Git Provider Type field",
  (gitProviderType: string) => {
    cy.get(pipelinesObj.addTrigger.gitProviderType).click();
    cy.get(`[id$="${gitProviderType}-link"]`).click({ force: true });
  }
);

When("user clicks on Add button present in Add Trigger modal", () => {
  cy.get(pipelinesObj.addTrigger.add).click();
});

Then("pipelines page is displayed", () => {
  cy.pageTitleShouldContain("Pipelines");
});

Then(
  "{string} is displayed in kebab menu for {string}",
  (option: string, pipelineName: string) => {
    pipelinesPage.selectKebabMenu(pipelineName);
    pipelinesPage.verifyOptionInKebabMenu(option);
  }
);

Given(
  "pipeline {string} with trigger in pipelines page",
  (pipelineName: string) => {
    pipelinesPage.clickOncreatePipeline();
    pipelineBuilderPage.createPipelineFromBuilderPage(pipelineName);
    cy.get('[data-test-id="breadcrumb-link-0"]').click();
    pipelinesPage.verifyNameInPipelinesTable(pipelineName);
    pipelinesPage.selectKebabMenu(pipelineName);
    cy.byTestActionID("Add Trigger").click();
    pipelinesPage.addTrigger();
  }
);

When("user clicks pipeline {string}", (pipelineName: string) => {
  pipelinesPage.selectPipeline(pipelineName);
});

Then(
  "pipeline Details page is displayed with header name {string}",
  (pipelineName: string) => {
    pipelineDetailsPage.verifyTitle(pipelineName);
  }
);

Then("Trigger Templates section is displayed", () => {
  pipelineDetailsPage.verifyTriggerTemplateSection();
});

Given(
  "Trigger is added to the pipeline {string} present in pipeline details page",
  (pipelineName: string) => {
    pipelinesPage.clickOncreatePipeline();
    pipelineBuilderPage.createPipelineFromBuilderPage(pipelineName);
    cy.get('[data-test-id="breadcrumb-link-0"]').click();
    pipelinesPage.verifyNameInPipelinesTable(pipelineName);
    pipelinesPage.selectKebabMenu(pipelineName);
    cy.byTestActionID("Add Trigger").click();
    pipelinesPage.addTrigger();
    store.pipeline1 = pipelineName;
  }
);

Given("user is at pipeline Details page", () => {
  pipelinesPage.selectPipeline(store.pipeline1);
  pipelineDetailsPage.verifyPage();
});

When("user clicks on trigger template", () => {
  pipelineDetailsPage.selectTriggerTemplateLink();
});

Then("user will be redirected to Trigger Template Details page", () => {
  triggerTemplateDetailsPage.verifyPage();
});

Then("user is able to see Details, YAML tabs", () => {
  triggerTemplateDetailsPage.verifyTabs();
});

Then(
  "Details tab is displayed with field names Name, Namespace, Labels, Annotations, Created At, Owner, Pipelines and Event Listeners",
  () => {
    triggerTemplateDetailsPage.verifyFields();
  }
);

Then("Actions dropdown display on the top right corner of the page", () => {
  triggerTemplateDetailsPage.verifyActionsDropdown();
});

Given("user is at Trigger Template Details page", () => {
  pipelinesPage.selectPipeline(store.pipeline1);
  pipelineDetailsPage.verifyPage();
  pipelineDetailsPage.selectTriggerTemplateLink();
  triggerTemplateDetailsPage.verifyPage();
});

When("user clicks on Event listener", () => {
  triggerTemplateDetailsPage.selectEventListener();
});

Then("user will be redirected to Event Listener Details page", () => {
  eventListenerDetailsPage.verifyPage();
});

Then(
  "Details tab is displayed with field names Name, Namespace, Labels, Annotations, Created At, Owner, Trigger Templates and Trigger Bindings",
  () => {
    eventListenerDetailsPage.verifyFields();
  }
);

Given("user is at Event Listener Details page", () => {
  pipelinesPage.selectPipeline(store.pipeline1);
  pipelineDetailsPage.verifyPage();
  pipelineDetailsPage.selectTriggerTemplateLink();
  triggerTemplateDetailsPage.verifyPage();
  triggerTemplateDetailsPage.selectEventListener();
  eventListenerDetailsPage.verifyPage();
});

When("user clicks on Trigger Binding", () => {
  eventListenerDetailsPage.selectTriggerBindingLink();
});

Then("user will be redirected to Cluster Trigger Binding Details page", () => {
  clusterTriggerBindingDetailsPage.verifyPage();
});

Then(
  "Details tab is displayed with field names Name, Labels, Annotations, Created At, Owner",
  () => {
    clusterTriggerBindingDetailsPage.verifyFields();
  }
);

Then("Actions dropdown display on Cluster Trigger Binding page", () => {
  clusterTriggerBindingDetailsPage.verifyActionsDropdown();
  naviagteTo(devNavigationMenu.Pipelines);
});

When(
  "user selects the first option from the Trigger Template drop down field",
  () => {
    cy.get(pipelinesObj.removeTrigger.triggerTemplate)
      .should("be.enabled")
      .click();
    cy.get('[data-test-id="dropdown-menu"]').click();
  }
);

When("user clicks on Remove button", () => {
  cy.get(pipelinesObj.removeTrigger.remove).should("be.enabled").click();
});

Then(
  "modal is displayed with header message {string}",
  (headerName: string) => {
    cy.alertTitleShouldContain(headerName);
  }
);

Then(
  "trigger template dropdown displayed with help text Select Trigger Template",
  () => {
    cy.get(pipelinesObj.removeTrigger.triggerTemplate).should(
      "have.text",
      "Select Trigger Template"
    );
  }
);

Then("Remove button will be disabled", () => {
  cy.get(pipelinesObj.removeTrigger.remove).should("be.disabled");
  cy.get(pipelinesObj.removeTrigger.cancel).click();
});

Then(
  "option {string} is not availale in kebab menu for {string}",
  (option: string, pipelineName: string) => {
    pipelinesPage.selectKebabMenu(pipelineName);
    cy.byTestActionID(option).should("not.be.visible");
  }
);

Given(
  "Trigger is added to the pipeline {string} present in pipeline details page",
  (a: string) => {
    // Manual step
  }
);

Given(
  "user is at pipeline trigger template page for pipeline {string}",
  (a: string) => {
    // Manual step
  }
);

When("user navigates to github repo url", () => {
  // Manual step
});

When("user selects webhooks from github settings page", () => {
  // Manual step
});

When("user clicks Add Webhook", () => {
  // Manual step
});

When("user enters payload url as trigger template url", () => {
  // Manual step
});

When("user enters content type as {string}", (a: string) => {
  // Manual step
});

When("user clicks on Add Webhook", () => {
  // Manual step
});

When("update the content in ReadMe file", () => {
  // Manual step
});

When("user navigates to pipelines page", () => {
  // Manual step
});

When("user enters the secret authentication key", () => {
  // Manual step
});

Then(
  "user is able to see new pipeline run for {string} in pipelines page",
  (a: string) => {
    // Manual step
  }
);

Then("user is able to see new pipeline in pipelines page", () => {
  // Manual step
});
