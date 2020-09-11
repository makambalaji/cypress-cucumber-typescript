import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu as menu } from '../../constants/global';
import { addOptions } from '../../constants/add';
import { topologyPage, topologySidePane } from '../../pages/topology_page';
import { pipelinesPage } from '../../pages/pipelines/pipelines_page';
import { catalogPage } from '../../pages/add/catalog_page';

Given('user is at Add page', () => {
  naviagteTo(menu.Add);
});

When('user clicks From Git card on the +Add page', () => {
  addPage.selectCardFromOptions(addOptions.Git);
});

Then('user will be redirected to Import from git form', () => {
  addPage.verifyTitle('Import from git');
});

Then('user will be redirected to Import from Dockerfile form', () => {
  addPage.verifyTitle('Import from git');
});

Then('pipeline section is displayed with message {string}', (message: string) => {
  addPage.verifyPipelinesSection(message);
});

When('user clicks From Dockerfile card on the Add page', () => {
  addPage.selectCardFromOptions(addOptions.DockerFile);
});

Then('Add pipeline section is displayed', () => {
  addPage.verifyPipelineCheckBox();
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

When('user selects Add Pipeline checkbox in Pipelines section', () => {
  addPage.selectAddPipeline();
});

Then('user will be redirected to Topology page', () => {
  topologyPage.verifyTopologyPage();
});

Given('{string} component is added to namespace', (componentName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(componentName)
});

When('user searches for {string} in topology page', (name: string) => {
  topologyPage.search(name);
});

When('the user enters {string} into the search bar in pipelines page', (name: string) => {
  pipelinesPage.search(name);
});

When('clicks node {string} in topology page', (name: string) => {
  topologyPage.componentNode(name).click({force: true});
  // cy.byNodeName(name).click({force:true});
});

Then('side bar is displayed with pipeline name same as component name {string}', (appName: string) => {
  topologySidePane.verify();
  topologySidePane.verifyTitle(appName);
});

Then('pipeline name is displayed with the component name {string}', (pipelineName: string) => {
  pipelinesPage.verifyNameInPipelinesTable(pipelineName)
});

Given('workload {string} is created from add page with pipeline', (pipelineName: string) => {
  naviagteTo(menu.Add);
  addPage.selectCardFromOptions(addOptions.Git);
  addPage.enterGitUrl("https://github.com/sclorg/nodejs-ex.git");
  addPage.enterComponentName(pipelineName);
  addPage.selectAddPipeline();
  addPage.clicKCreate();
  topologyPage.verifyTopologyPage();
});

Given('user is at Developer Catalog form with builder images', () => {
  addPage.selectCardFromOptions(addOptions.Catalog);
});

When('user enters {string} into the Builder Image search bar', (searchItem: string) => {
  catalogPage.search(searchItem);
});

When('user creates the application with the selected builder image', () => {
  catalogPage.isCardsDisplayed();
  // To Do
});

When('user clicks Create button on Create Source-to-Image application', () => {
  addPage.clicKCreate();
});