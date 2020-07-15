import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { pipelinesPage } from '../pages/pipelines_page';
import { pipelineBuilderPage } from '../pages/pipelineBuilder_page';

Given('user able to see pipeline with git resources in pipeiles page', () => {
  pipelinesPage.createPipeline();
  pipelineBuilderPage.createPipelineWithGitresources();
});

Given('pipeline with git resources', () => {
  // TODO: implement step
});

Given('user is at Start Pipeline popup', () => {
  // TODO: implement step
});

When('clicks on Show Credentials link present in {string} popup', (a: string) => {
  // TODO: implement step
});

When('clicks on {string} link', (a: string) => {
  // TODO: implement step
});

When('the user enters URL, Revision as {string} and {string}', (a: string, b: string) => {
  // TODO: implement step
});

When('enters Secret Name as {string}', (a: string) => {
  // TODO: implement step
});

When('selects the {string} option from Access to drop down', (a: string) => {
  // TODO: implement step
});

When('enters the server url as {string}', (a: string) => {
  // TODO: implement step
});

When('selects the Authentication type as {string}', (a: string) => {
  // TODO: implement step
});

When('enters the Username, Password as {string}, {string}', (a: string, b: string) => {
  // TODO: implement step
});

When('clicks on tick mark', () => {
  // TODO: implement step
});

When('enters the SSH KEY as {string}', (a: string) => {
  // TODO: implement step
});

When('enters the Username, Password, email as {string}, {string}, {string}', (a: string, b: string, c: string) => {
  // TODO: implement step
});

Then('user able to see Create Source Secret section', () => {
  // TODO: implement step
});

Then('able to see {string}, {string}, {string} fields and authernication type sections', (a: string, b: string, c: string) => {
  // TODO: implement step
});

Then('{string} is added under secrets section', (a: string) => {
  // TODO: implement step
});
