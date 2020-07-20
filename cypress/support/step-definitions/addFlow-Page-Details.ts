import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { projectNameSpace, naviagteTo } from '../pages/app';
import { devNavigationMenu } from '../constants/global';

Given('user is at the new project namespace {string}', (namespace: string) => {
  projectNameSpace.createNewProject(namespace);
});

When('user selects Add option from left side navigation menu', () => {
  naviagteTo(devNavigationMenu.Add);
});

Then('page contains From Git, Container Image, From Dockerfile, YAML, From Catalog, Database, Helm Chart cards', () => {
  
});

Given('cluster is not installed with any operators', () => {
  // TODO: implement step
});

Given('cluster is installed with pipeline operator', () => {
  // TODO: implement step
});

Given('cluster is installed with serverless operator', () => {
  // TODO: implement step
});

When('user selects Add option from left side navigation men', () => {
  // TODO: implement step
});

Then('message displays as {string}', (a: string) => {
  // TODO: implement step
});

Then('page contains Pipeline card', () => {
  // TODO: implement step
});

Then('page contains Operator Backed card', () => {
  // TODO: implement step
});
