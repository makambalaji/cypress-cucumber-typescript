import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { pipelinesPage } from '../../pages/pipelines/pipelines_page';
import { pipelineBuilderPage, pipelineBuilderObj } from '../../pages/pipelines/pipelineBuilder_page';
import { pipelineDetailsPage } from '../../pages/pipelines/pipelineDetails_page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global'

When('user clicks Create Pipeline button on Pipelines page', () => {
  pipelinesPage.clickOncreatePipeline();
});

Then('user will be redirected to Pipeline Builder page', () => {
  pipelineBuilderPage.verifyTitle();
});

Then('Name displayed with default value new-pipeline', () => {
  pipelineBuilderPage.verifyDefaultPipelineName();
});

Then('Tasks, Paramters and Resources sections are displayed', () => {
  pipelineBuilderPage.verifySection();
});

Then('Edit Yaml link is enabled', () => {
  cy.byButtonText('Edit YAML').should('be.enabled');
});

Then('Create button is in disabled state', () => {
  cy.byLegacyTestID('submit-button').should('be.disabled');
});

Given('user is at Pipeline Builder page', () => {
  naviagteTo(devNavigationMenu.Pipelines);
  pipelinesPage.clickOncreatePipeline();
  pipelineBuilderPage.verifyTitle();
});

When('user enters pipeline name as {string}', (pipelineName: string) => {
  pipelineBuilderPage.enterPipelineName(pipelineName);
});

When('user selects {string} from Task drop down', (taskName: string) => {
  pipelineBuilderPage.selectTask(taskName);
});

When('user adds another task {string} in parallel', (taskName: string) => {
  // add mouser hover on task to select + button
  pipelineBuilderPage.seelctParallelTask(taskName);
  pipelineBuilderPage.addResource('git resource');
  pipelineBuilderPage.clickOnTask(taskName);
  cy.get(pipelineBuilderObj.sidePane.inputResource).click();
  cy.byTestDropDownMenu('git resource').click();
  pipelineBuilderPage.create();
});

When('user clicks Create button on Pipeline Builder page', () => {
  pipelineBuilderPage.create();
});

Then('user will be redirected to Pipeline Details page with header name {string}', (pipelineName: string) => {
  pipelineDetailsPage.verifyTitle(pipelineName);
});

Then('tasks displayed parallel in pipelines section', () => {
  
});

When('user adds another task {string} in series', (a: string) => {
  cy.log(a);
  // TODO: implement step
});

Then('tasks displayed serially in pipelines section', () => {
  // TODO: implement step
});

When('user adds {string} resource with name {string} to the {string}', (resourceType: string, resourceName: string, taskName: string) => {
  
});

When('user clicks {string} button on Pipeline Builder page', (buttonName: string) => {
  cy.log(buttonName);
});

When('user adds the parameter details like Name, Description and Default Value', () => {

});

Then('task details present in pipeline details section', () => {

});

Then('parameter details displayed in parameters section', () => {

});

When('user clicks Edit YAML button', () => {
  // manual step
});

When('user clicks Continue on Switch to YAML editor', () => {
  // manual step
});

When('user clicks Create button on Pipeline Yaml page', () => {
  // manual step  
});

Then('user will be redirected to Pipeline Details page', () => {
  // manual step
});