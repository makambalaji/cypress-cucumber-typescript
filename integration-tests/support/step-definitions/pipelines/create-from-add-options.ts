import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add-flow/add-page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu as menu } from '../../constants/global';
import { addOptions } from '../../constants/add';
import { topologyPage, topologySidePane } from '../../pages/topology-page';
import { pipelinesPage } from '../../pages/pipelines/pipelines-page';
import { catalogPage } from '../../pages/add-flow/catalog-page';

Given('user is at Add page', () => {
  naviagteTo(menu.Add);
});

When('user clicks From Git card on the Add page', () => {
  addPage.selectCardFromOptions(addOptions.Git);
});

Then('user will be redirected to Import from git form', () => {
  addPage.verifyTitle('Import from Git');
});

Then('user will be redirected to Import from Dockerfile form', () => {
  addPage.verifyTitle('Import from Dockerfile');
});

Then('pipeline section is displayed with message {string}', (message: string) => {
  addPage.verifyPipelineInfoMessage(message);
  addPage.clickCancel();
});

When('user enters Git Repo url in docker file as {string}', (gitRepoUrl: string) => {
  addPage.enterGitUrl(gitRepoUrl);
  addPage.verifyValidatedMessage();
});

When('user enters Git Repo url in builder image as {string}',(gitRepoUrl: string) => {
  addPage.enterGitUrl(gitRepoUrl);
  addPage.verifyValidatedMessage();
});

When('user clicks From Dockerfile card on the Add page', () => {
  addPage.selectCardFromOptions(addOptions.DockerFile);
});

Then('Add pipeline section is displayed', () => {
  addPage.verifyPipelineCheckBox();
  addPage.clickCancel();
});

Given('user is at Import from git form', () => {
  addPage.selectCardFromOptions(addOptions.Git);
});

When('user enters Git Repo url as {string}', (gitUrl: string) => {
  addPage.enterGitUrl(gitUrl);
});

Then('Add pipeline checkbox is displayed', () => {
  addPage.verifyPipelineCheckBox();
});

When('user enters Name as {string} in General section', (name: string) => {
  addPage.enterComponentName(name);
});

When('user selects pipeline option', () => {
  addPage.selectAddPipeline();
});

Then('user will be redirected to Topology page', () => {
  topologyPage.verifyTopologyPage();
});

Given('workload {string} is added to namespace', (componentName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(componentName)
});

When('user searches for {string} in topology page', (name: string) => {
  topologyPage.search(name);
});

When('user searches for pipeline {string} in pipelines page', (name: string) => {
  pipelinesPage.search(name);
});

When('user clicks node {string} in topology page', (name: string) => {
  topologyPage.componentNode(name).click({force: true});
});

Then('pipeline name {string} is displayed in topology side bar', (appName: string) => {
  topologySidePane.verify();
  topologySidePane.verifyTitle(appName);
});

Then('pipeline {string} is displayed in pipelines page', (pipelineName: string) => {
  pipelinesPage.verifyNameInPipelinesTable(pipelineName)
});

Given('workload {string} is created from add page with pipeline', (pipelineName: string) => {
  naviagteTo(menu.Add);
  addPage.selectCardFromOptions(addOptions.Git);
  addPage.enterGitUrl("https://github.com/sclorg/nodejs-ex.git");
  addPage.enterComponentName(pipelineName);
  addPage.selectAddPipeline();
  addPage.clickCreate();
  topologyPage.verifyTopologyPage();
});

Given('user is at Developer Catalog form with builder images', () => {
  addPage.selectCardFromOptions(addOptions.DeveloperCatalog);
});

When('user searches builder image {string} in developer catalog', (searchItem: string) => {
  catalogPage.search(searchItem);
});

When('user creates the application with the selected builder image', () => {
  catalogPage.isCardsDisplayed();
  // To Do
});

When('user clicks Create button on Create Source-to-Image application', () => {
  addPage.clickCreate();
});

Then('Start LastRun button is disabled', () => {

});
