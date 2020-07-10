import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { gitPage, seelctCardFromOptions } from '../pages/add_page';
import { naviagteTo } from '../pages/app';
import { devNavigationMenu as menu, switchPerspective } from '../constants/global';
import { addOptions, resourceTypes } from '../constants/add';
import { topologyPage } from '../pages/topology_page';

Given('user is at Add page', () => {
  naviagteTo(menu.Add);
});

When('user clicks From Git card on the +Add page', () => {
  seelctCardFromOptions(addOptions.Git);
});

Then('user navigates to page with header name Import from git', () => {
  gitPage.verifyTitle('Import from git');
});

Then('pipeline section is displayed with message {string}', (message: string) => {
  gitPage.verifyPipelinesSection(message);
});

Given('user is at {string} form', (title: string) => {
  naviagteTo(menu.Add);
  seelctCardFromOptions(addOptions.Git);
  gitPage.verifyTitle(title);
});

When('user type Git Repo url as {string}', (gitUrl: string) => {
  gitPage.enterGitUrl(gitUrl);
});

Then('Add pipeline checkbox is displayed', () => {
  gitPage.verifyPipelineCheckBox();
});

When('type Name as {string} in General section', (name: string) => {
  gitPage.enterAppName(name);
});

When('select {string} radio button in Resources section', (resoruce: string) => {
  gitPage.selectResource(resoruce);
});

When('select Add Pipeline checkbox in Pipelines section', () => {
  gitPage.selectAddPipeline();
});

When('click Create button on Add page', () => {
  gitPage.createWorkload();
});

Then('user redirects to topology page', () => {
  topologyPage.verifyTopologyPage();
});

Then('created workload {string} is present in topology page', (name: string) => {
  topologyPage.verifyWorkloadInTopologyPage(name);
});

Given('user is at Topology page', () => {
  naviagteTo(menu.Topology);
  topologyPage.verifyTopologyPage();
});

Given('{string} component is added to namespace', (componentName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(name)
});

When('the user enters {string} into the search bar', (name: string) => {
  topologyPage.search(name);
});

When('clicks node {string} from results', (name: string) => {
  cy.byNodeName(name).click();
});

Then('side pane is displayed with pipeline name same as component name {string}', (a: string) => {
  topologyPage.verifySidePane();
});

Given('user is at Pipelines page', () => {
  naviagteTo(menu.Pipelines);
});

Then('pipeline name is displayed with the component name {string}', (a: string) => {
  // TODO: implement step
});