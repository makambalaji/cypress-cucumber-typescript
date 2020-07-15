import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { pipelinesPage } from '../pages/pipelines_page';
import { pipelineBuilderPage } from '../pages/pipelineBuilder_page';

Given('pipeline {string} consists of task {string} with one git resource', (pipelineName: string, taskName: string) => {
  pipelinesPage.createPipeline();
  pipelineBuilderPage.createPipelineWithGitresources(pipelineName, taskName);
});

Given('pipeline run is displayed', () => {
  
});

Given('user is at the Pipeline Run Details page', () => {
  // TODO: implement step
});

Given('user is at the Pipeline Runs page', () => {
  // TODO: implement step
});

Given('user is at the Pipeline Details page', () => {
  // TODO: implement step
});

Given('one pipeline run is completed with the workload', () => {
  // TODO: implement step
});

Given('5 pipeline runs are completed with the workload', () => {
  // TODO: implement step
});

Given('pi[peline run is available with cancelled tasks', () => {
  // TODO: implement step
});

Given('pi[peline run is available with failed tasks', () => {
  // TODO: implement step
});

When('fills the necessary details in {string} popup', (a: string) => {
  // TODO: implement step
});

When('user clicks Last Run value of pipeline', () => {
  // TODO: implement step
});

When('user clicks Actions menu on the top right corner of the page', () => {
  // TODO: implement step
});

When('user selects {string} from the Actions menu', (a: string) => {
  // TODO: implement step
});

When('user clicks Last Run value of the pipeline {string}', (a: string) => {
  // TODO: implement step
});

Then('{string} popup displays with Git Resources, Advanced Options sections', (a: string) => {
  // TODO: implement step
});

Then('start button is disabled', () => {
  // TODO: implement step
});

Then('page redirects to {string} page', (a: string) => {
  // TODO: implement step
});

Then('Pipeline run status displays as {string}', (a: string) => {
  // TODO: implement step
});

Then('pipeline run details display in Pipelines page', () => {
  // TODO: implement step
});

Then('pipeline run details display in Topology page', () => {
  // TODO: implement step
});

Then('user redirects to Pipeline Run Details page', () => {
  // TODO: implement step
});

Then('user is able to see Details, YAML and Logs tabs', () => {
  // TODO: implement step
});

Then('Details tab is displayed with field names {string}, {string}, {string}, {string}, {string}, {string}, {string} and {string}', (a: string, b: string, c: string, d: string, e: string, f: string, g: string, h: string) => {
  // TODO: implement step
});

Then('Actions dropdown display on the top right corner of the page', () => {
  // TODO: implement step
});

Then('Actions menu display with the options {string}, {string}', (a: string, b: string) => {
  // TODO: implement step
});

Then('pipeline run details page heading name will change', () => {
  // TODO: implement step
});

Then('page redirects to pipeline run details page', () => {
  // TODO: implement step
});

Then('Pipeline Resources field will be displayed', () => {
  // TODO: implement step
});
