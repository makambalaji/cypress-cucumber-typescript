import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {
  pipelineBuilderPage,
  pipelineBuilderObj,
} from "../../pages/pipelines/pipelineBuilder-page";
import { naviagteTo } from "../../pages/app";
import { devNavigationMenu } from "../../constants/global";
import { pipelinesObj } from "../../pages/pipelines/pipelines-page";

When(
  "user enters yaml content {string} in editor",
  (pipelineYamlFile: string) => {
    cy.fixture(`pipelines/pipelines-workspaces/${pipelineYamlFile}`).then(
      (yaml) => {
        cy.log(yaml);
        cy.get('[data-mode-id="yaml"]')
          .click()
          .focused()
          .type("{ctrl}a")
          .type(yaml);
      }
    );
  }
);

When("user clicks on create button in Edit Yaml file", () => {
  cy.get(pipelineBuilderObj.yamlCreatePipeline.create).click();
});

Given("user is at Edit Yaml page", () => {
  pipelineBuilderPage.editYaml();
});

Given("user created pipeline with workspace", () => {
  pipelineBuilderPage.editYaml();
  cy.fixture(
    `pipelines/pipelines-workspaces/pipeline-with-workspace.yaml`
  ).then((yaml) => {
    cy.log(yaml);
    cy.get('[data-mode-id="yaml"]')
      .click()
      .focused()
      .type("{ctrl}a")
      .type(yaml);
  });
  cy.get(pipelineBuilderObj.yamlCreatePipeline.create).click();
  naviagteTo(devNavigationMenu.Pipelines);
});

Then(
  "user is able to see different shared workspaces like Empty Directory, Config Map, Secret, PVC",
  () => {
    cy.byTestDropDownMenu("EmptyDirectory").should("be.visible");
    cy.byTestDropDownMenu("ConfigMap").should("be.visible");
    cy.byTestDropDownMenu("Secret").should("be.visible");
    cy.byTestDropDownMenu("PVC").should("be.visible");
  }
);

When("user selects shared workspaces drop down", () => {
  cy.get(pipelinesObj.startPipeline.sharedWorkspace).click();
});
