import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {
  pipelinesPage,
  startPipelineInPipelinsPage as startPipeline,
  pipelinesObj,
} from "../../pages/pipelines/pipelines-page";
import { pipelineBuilderPage } from "../../pages/pipelines/pipelineBuilder-page";
import {
  pipelineRunDetailsPage,
  pipelineRunsPage,
  pipelineRunDetailsObj,
} from "../../pages/pipelines/pipelineRun-details-page";
import { naviagteTo } from "../../pages/app";
import { devNavigationMenu } from "../../constants/global";
import { pipelineDetailsPage } from "../../pages/pipelines/pipelineDetails-page";
import { addPage } from "../../pages/add-flow/add-page";
import { addOptions } from "../../constants/add";
import { topologyPage, topologySidePane } from "../../pages/topology-page";

const store: Record<string, string> = {};

Given(
  "pipeline {string} consists of task {string} with one git resource",
  (pipelineName: string, taskName: string) => {
    pipelinesPage.clickOncreatePipeline();
    pipelineBuilderPage.createPipelineWithGitresources(pipelineName, taskName);
    store.pipelineWithOneGitResource = pipelineName;
  }
);

When("user fills the details in Start Pipeline popup", () => {
  cy.alertTitleShouldContain("Start Pipeline");
  startPipeline.addGitResource("https://github.com/sclorg/nodejs-ex.git");
  startPipeline.clickStart();
});

Then("page will be redirected to pipeline run details page", () => {
  pipelineRunDetailsPage.verifyTitle();
});

Then("Pipeline run status displays as {string}", (PipelineStatus: string) => {
  pipelineRunDetailsPage.fieldDetails("Status", PipelineStatus);
});

Then(
  "pipeline run details for {string} display in Pipelines page",
  (pipelineName: string) => {
    naviagteTo(devNavigationMenu.Pipelines);
    pipelinesPage.search(pipelineName);
    cy.get('[title="PipelineRun"]').should("be.visible");
  }
);

Given(
  "user started the pipeline {string} in pipelines page",
  (pipelineName: string) => {
    naviagteTo(devNavigationMenu.Pipelines);
    pipelinesPage.search(pipelineName);
    pipelinesPage.selectKebabMenu(pipelineName);
    cy.byTestActionID("Start").click();
    cy.alertTitleShouldContain("Start Pipeline");
    startPipeline.clickStart();
    pipelineRunDetailsPage.verifyTitle();
  }
);

Given(
  "pipeline run is displayed for {string} without resource",
  (pipelineName: string) => {
    pipelinesPage.clickOncreatePipeline();
    pipelineBuilderPage.createPipelineFromBuilderPage(pipelineName);
    store.pipelineWithOutResource = pipelineName;
    cy.clickBreadcrumbLink("Pipelines");
    pipelinesPage.selectKebabMenu(pipelineName);
    cy.byTestActionID("Start").click();
    pipelineRunDetailsPage.verifyTitle();
    naviagteTo(devNavigationMenu.Pipelines);
    pipelinesPage.search(pipelineName);
    cy.get('[title="PipelineRun"]').should("be.visible");
  }
);

Given(
  "pipeline run is displayed for {string} with resource",
  (pipelineName: string) => {
    pipelinesPage.clickOncreatePipeline();
    pipelineBuilderPage.createPipelineWithGitresources(pipelineName);
    store.pipelineWithResource = pipelineName;
    cy.clickBreadcrumbLink("Pipelines");
    pipelinesPage.selectKebabMenu(pipelineName);
    cy.byTestActionID("Start").click();
    cy.alertTitleShouldContain("Start Pipeline");
    startPipeline.addGitResource("https://github.com/sclorg/nodejs-ex.git");
    startPipeline.clickStart();
    pipelineRunDetailsPage.verifyTitle();
    naviagteTo(devNavigationMenu.Pipelines);
    pipelinesPage.search(pipelineName);
    cy.get('[title="PipelineRun"]').should("be.visible");
  }
);

When("user clicks Last Run value of {string}", (pipelineName: string) => {
  pipelinesPage.seelctPipelineRun(pipelineName);
});

When("user navigates to pipelineRuns page", () => {
  cy.byLegacyTestID("breadcrumb-link-0").click();
});

When("user selects the kebab menu in pipeline Runs page", () => {
  cy.get("tbody tr").eq(0).find("td:nth-child(6) button").click();
});

Then(
  "user is able to see kebab menu options Rerun, Delete Pipeline Run",
  () => {
    cy.byTestActionID("Rerun").should("be.visible");
    cy.byTestActionID("Delete Pipeline Run").should("be.visible");
  }
);

Then("user is able to see Details, YAML and Logs tabs", () => {
  pipelineRunDetailsPage.verifyTabs();
});

Then(
  "Details tab is displayed with field names Name, Namespace, Labels, Annotations, Created At, Owner, Status, Pipeline and Triggered by",
  () => {
    pipelineRunDetailsPage.verifyFields();
  }
);

Then("Actions dropdown display on the top right corner of the page", () => {
  pipelineRunDetailsPage.verifyActionsDropdown();
});

When("user selects the Pipeline Run for {string}", (pipelineName: string) => {
  naviagteTo(devNavigationMenu.Pipelines);
  pipelinesPage.seelctPipelineRun(pipelineName);
  cy.clickBreadcrumbLink("Pipeline Runs");
  pipelineRunsPage.verifyTitle();
});

When(
  "user selects Rerun option from kebab menu of {string}",
  (pipelineName: string) => {
    pipelineRunsPage.selectKebabMenu(pipelineName);
    cy.byTestActionID("Rerun").click();
  }
);

Given("user is at the Pipeline Run Details page", () => {
  naviagteTo(devNavigationMenu.Pipelines);
  pipelinesPage.search(store.pipelineWithOutResource);
  pipelinesPage.seelctPipelineRun(store.pipelineWithOutResource);
  pipelineRunDetailsPage.verifyTitle();
});

Given("5 pipeline runs are completed with the git workload", () => {
  // TODO: implement step
});

When("user selects {string} option from Actions menu", (option: string) => {
  pipelineRunDetailsPage.selectFromActionsDropdown(option);
});

When(
  "user selects {string} option from pipeline Details Actions menu",
  (option: string) => {
    pipelineDetailsPage.selectActionFromActionsDropdown(option);
  }
);

When("user selects Rerun option from the Actions menu", () => {
  pipelineRunDetailsPage.selectFromActionsDropdown("Rerun");
});

Then(
  "status displays as {string} in pipeline run details page",
  (PipelineStatus: string) => {
    pipelineRunDetailsPage.fieldDetails("Status", PipelineStatus);
  }
);

Then("page will be redirected to pipeline run details page", () => {
  pipelineRunDetailsPage.verifyTitle();
});

Then("page will be redirected to pipeline runs page", () => {
  pipelineRunsPage.verifyTitle();
});

Then("side bar is displayed with the pipelines section", () => {
  topologySidePane.verifyTab("Resources");
  topologySidePane.verifySection("Pipeline Runs");
});

Then(
  "3 pipeline runs are displayed under pipelines section of topology page",
  () => {
    cy.get("li.odc-pipeline-run-item").should("not.be.greaterThan", 3);
  }
);

Then("View all link is displayed", () => {
  cy.get("a.sidebar__section-view-all").should("contain.text", "View all");
});

Given(
  "pipeline run is available with cancelled tasks for pipeline {string}",
  (pipelineName: string) => {
    // TODO: implement step
    cy.log(pipelineName);
  }
);

Given(
  "pipeline run is available with failed tasks for pipeline {string}",
  (pipelineName: string) => {
    // TODO: implement step
    cy.log(pipelineName);
  }
);

Given("user is at the Pipeline Details page", () => {
  // TODO: implement step
});

Given("pipeline {string} is executed for 3 times", (pipelineName: string) => {
  pipelinesPage.clickOncreatePipeline();
  pipelineBuilderPage.createPipelineFromBuilderPage(pipelineName);
  pipelineDetailsPage.clickActionMenu();
  cy.byTestActionID("Start").click();
  pipelineRunDetailsPage.verifyTitle();
  pipelineRunDetailsPage.waitForTaskRunToComplete();
  cy.selectActionsMenuOption("Rerun");
  pipelineRunDetailsPage.waitForTaskRunToComplete();
  cy.selectActionsMenuOption("Rerun");
  pipelineRunDetailsPage.verifyTitle();
  cy.get(pipelineRunDetailsObj.pipelineRunStatus).contains("Succeeded", {
    timeout: 50000,
  });
});

Given("user is at the Pipeline Runs page", () => {
  cy.clickBreadcrumbLink("Pipeline Runs");
  pipelineRunsPage.verifyTitle();
});

When(
  "user filters the pipeline runs of pipeline {string} based on the {string}",
  (pipelineName: string, status: string) => {
    naviagteTo(devNavigationMenu.Pipelines);
    pipelinesPage.seelctPipelineRun(pipelineName);
    cy.clickBreadcrumbLink("Pipeline Runs");
    pipelineRunsPage.filterByStatus(status);
  }
);

Then("user is able to see the pipelineruns with {string}", (status: string) => {
  pipelineRunsPage.verifyPipelineRunsTableDisplay();
  pipelineRunsPage.verifyStatusInPipelineRunsTable(status);
});

Then(
  "Last Run status of the {string} displays as {string}",
  (pipelineName: string, lastRunStatus: string) => {
    pipelinesPage.search(pipelineName);
    pipelinesPage.verifyLastRunStatusInPipelinesTable(lastRunStatus);
  }
);

When("user navigates to Pipelines page", () => {
  naviagteTo(devNavigationMenu.Pipelines);
});

Given("one pipeline run is completed with the workload", () => {
  // TODO: implement step
});

Given("pipeline {string} is created from git page", (name: string) => {
  naviagteTo(devNavigationMenu.Add);
  addPage.selectCardFromOptions(addOptions.Git);
  addPage.verifyTitle("Import from Git");
  addPage.enterGitUrl("https://github.com/sclorg/nodejs-ex.git");
  addPage.enterComponentName(name);
  addPage.selectAddPipeline();
  addPage.clickCreate();
  topologyPage.verifyTopologyPage();
});

Given(
  "pipeline run is displayed for {string} in pipelines page",
  (name: string) => {
    naviagteTo(devNavigationMenu.Pipelines);
    pipelinesPage.search(name);
    pipelinesPage.selectKebabMenu(name);
    cy.byTestActionID("Start").click();
    cy.alertTitleShouldContain("Start Pipeline");
    startPipeline.addGitResource("https://github.com/sclorg/dancer-ex.git");
    startPipeline.clickStart();
    pipelineRunDetailsPage.verifyTitle();
    naviagteTo(devNavigationMenu.Pipelines);
    pipelinesPage.search(name);
    cy.get('[title="PipelineRun"]').should("be.visible");
  }
);

Then(
  "Last Run status of the {string} displays as {string} in topology page",
  (name: string, status: string) => {
    topologyPage.search(name);
    topologyPage.clickOnNode(name);
    topologySidePane.verify();
    topologyPage.verifyPipelineRunStatus(status);
  }
);

Given("pi[peline run is available with cancelled tasks", () => {
  // TODO: implement step
});

Given("pi[peline run is available with failed tasks", () => {
  // TODO: implement step
});

When("user clicks Actions menu on the top right corner of the page", () => {
  pipelineDetailsPage.clickActionMenu();
});

When(
  "user clicks Last Run value of the pipeline {string}",
  (pipelineName: string) => {
    pipelinesPage.seelctPipelineRun(pipelineName);
  }
);

Then(
  "Start Pipeline modal displays with Git Resources, Advanced Options sections",
  () => {
    startPipeline.verifySections();
  }
);

Then("start button is disabled", () => {
  cy.get(pipelinesObj.startPipeline.start).should("be.disabled");
  startPipeline.clicKCancel();
});

Then(
  "Actions menu display with the options {string}, {string}",
  (option1: string, option2: string) => {
    cy.byTestActionID(option1).should("be.visible");
    cy.byTestActionID(option2).should("be.visible");
  }
);

Then("Pipeline Resources field will be displayed", () => {
  // TODO: implement step
});

When("user navigates to pipelineRun logs tab", () => {
  pipelineRunDetailsPage.selectTab("Logs");
});

When("user clicks on Download button", () => {
  pipelineRunDetailsPage.clickOnDownloadLink();
});

When("user clicks on Expand button", () => {
  pipelineRunDetailsPage.clickOnExpandLink();
});

Then("user is able to see expanded logs page", () => {
  cy.byButtonText("Collapse").should("be.visible");
});

Then("user is able to see the downloaded file", () => {
  // Manual step
});

When("user clicks Start LastRun from topology side bar", () => {
  topologySidePane.clickStartLastRun();
});

Then("logs contains tasks with details of execution", () => {
  // Manual step
});
