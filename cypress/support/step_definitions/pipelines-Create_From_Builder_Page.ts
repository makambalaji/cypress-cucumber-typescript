import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { pipelinesPage, pipelineBuilderPage, pipelineDetailspage } from '../pages/pipelines_page';
import { naviagteTo } from '../pages/app';
import { devNavigationMenu } from '../constants/global'

Given('user is at pipelines page', () => {
  naviagteTo(devNavigationMenu.Pipelines);
});

When('user clicks Create Pipeline button on Pipelines page', () => {
  pipelinesPage.createPipeline();
});

Then('user redirects to Pipeline Builder page', () => {
  pipelineBuilderPage.verifyTitle();
});

Then('Name displayed wtih default value new-pipeline', () => {
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
  pipelinesPage.createPipeline();
  pipelineBuilderPage.verifyTitle();
});

When('user types pipeline name as {string}', (pipelineName: string) => {
  pipelineBuilderPage.enterPipelineName(pipelineName);
});

When('select {string} from Task drop down', (taskName: string) => {
  pipelineBuilderPage.selectTask(taskName);
});

When('clicks Create button on Pipeline Builder page', () => {
  pipelineBuilderPage.create();
});

Then('user redirects to Pipeline Details page with header name {string}', (pipelineName: string) => {
  pipelineDetailspage.verifyTitle(pipelineName);
});

When('user adds another task {string} in parallel', (taskName: string) => {
  // add mouser hover on task to select + button
  pipelineBuilderPage.selectTask(taskName);
});

Then('tasks displayed parallel in pipelines section', () => {
  
});

When('user adds another task {string} in series', (a: string) => {
  // TODO: implement step
});

Then('tasks displayed serially in pipelines section', () => {
  // TODO: implement step
});
