import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { pipelineBuilderPage } from "../../pages/pipelines/pipelineBuilder-page";
import { pipelineRunDetailsPage } from "../../pages/pipelines/pipelineRun-details-page";
import { pipelinesPage } from "../../pages/pipelines/pipelines-page";
import { naviagteTo } from "../../pages/app";
import { devNavigationMenu } from "../../constants/global";

Given("user is at pipeline Runs page", () => {
  pipelineRunDetailsPage.verifyTitle();
});

When(
  "user selects {string} option from kebab menu for pipeline {string}",
  (option: string, pipelineName: string) => {
    naviagteTo(devNavigationMenu.Pipelines);
    pipelinesPage.selectKebabMenu(pipelineName);
    cy.byTestActionID(option).click();
  }
);

Then("user is at the Pipeline Builder page", () => {
  pipelineBuilderPage.verifyTitle();
});

Then("user will be redirected to Pipeline Run Details page", () => {
  pipelineRunDetailsPage.verifyTitle();
});
