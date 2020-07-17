import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { projectNameSpace, naviagteTo } from '../pages/app';
import { devNavigationMenu } from '../constants/global';
import { seelctCardFromOptions, gitPage, gitPageObj } from '../pages/add_page';
import { addOptions } from '../constants/add';
import { topologyPage } from '../pages/topology_page';

Given('user is at Import from git page', () => {
  seelctCardFromOptions(addOptions.Git);
});

When('user types Git Repo url as {string}', (gitUrl: string) => {
  gitPage.enterGitUrl(gitUrl);
});

Then('git url gets Validated', () => {
  gitPage.verifyValidatedMessage();
});

Then('builder image is detetced', () => {
  gitPage.verifyBuilderImageDetectedMessage();
});

Then('builder image version drop down is displayed', () => {
  gitPage.verifyBuilderImageVersion();
});

Then('Application name displays as {string}', (appName: string) => {
  cy.get(gitPageObj.appName, {timeout:3000}).should('have.value', appName);
});

Then('Name displays as {string}', (nodeName: string) => {
  cy.get(gitPageObj.nodeName).should('have.value', nodeName);
});

When('clicks Create button on Add page', () => {
  gitPage.createWorkload();
});

When('selects {string} resource type', (resourceType: string) => {
  gitPage.selectResource(resourceType);
});

When('click Create button on Add page', () => {
  gitPage.createWorkload();
});

Then('created workload {string} is present in topology page', (workloadName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(workloadName);
});

Then('created workload is linked to existing application', () => {
  
});

When('types Application name as {string}', (a: string) => {
  // TODO: implement step
});

When('types Name as {string}', (a: string) => {
  // TODO: implement step
});

When('unselect the advanced option {string}', (a: string) => {
  // TODO: implement step
});

When('type name as {string} in General section', (a: string) => {
  // TODO: implement step
});

When('click {string} link in Advanced Options section', (a: string) => {
  // TODO: implement step
});

When('type Hostname as {string}', (a: string) => {
  // TODO: implement step
});

When('type Path as {string}', (a: string) => {
  // TODO: implement step
});

When('select Target Port as {string}', (a: string) => {
  // TODO: implement step
});

When('user types name as {string} in General section', (a: string) => {
  // TODO: implement step
});

When('clicks {string} link in Advanced Options section', (a: string) => {
  // TODO: implement step
});

When('unselects {string} checkbox in build configuration section', (a: string) => {
  // TODO: implement step
});

When('type Name as {string} in Environment Variables (Build and Runtime) section', (a: string) => {
  // TODO: implement step
});

When('type Value as {string} in Environment Variables (Build and Runtime) section', (a: string) => {
  // TODO: implement step
});

When('verify {string} checkbox is seleceted', (a: string) => {
  // TODO: implement step
});

When('type Name as {string} in Environment Variables (Runtime only) section', (a: string) => {
  // TODO: implement step
});

When('type Value as {string} in Environment Variables (Runtime only) section', (a: string) => {
  // TODO: implement step
});

When('type CPU Request as {string} in CPU section', (a: string) => {
  // TODO: implement step
});

When('type CPU Limits as {string} in CPU section', (a: string) => {
  // TODO: implement step
});

When('type Memory Request as {string} in Memory section', (a: string) => {
  // TODO: implement step
});

When('type Memory Limit as {string} in Memory section', (a: string) => {
  // TODO: implement step
});

When('type number of replicas as {string} in Replicas section', (a: string) => {
  // TODO: implement step
});

When('type label as {string}', (a: string) => {
  // TODO: implement step
});

Then('user redirects to Add page', () => {
  // TODO: implement step
});

Then('public url is not created for node {string}', (a: string) => {
  // TODO: implement step
});

Then('the route of application contains {string}', (a: string) => {
  // TODO: implement step
});

Then('build doesnot get started', () => {
  // TODO: implement step
});

Then('verify the label in application node side pane', () => {
  // TODO: implement step
});
