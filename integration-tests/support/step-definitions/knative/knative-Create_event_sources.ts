import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage.selectCardFromOptions, eventSourcesPage, addPage, eventSourceObj } from '../../pages/add_page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';
import { addOptions } from '../../constants/add';
import { topologySidePane, topologyPage } from '../../pages/topology_page';

Given('knative service is not available for selected namespace', () => {
  // TODO: implement step
});

Given('user is on Event Sources page', () => {
  naviagteTo(devNavigationMenu.Add);
  addPage.selectCardFromOptions(addOptions.EventSource);
  eventSourcesPage.verifyTitle();
});

Given('knative service is available for selected namespace', () => {
  
});

When('user clicks on {string} card', (cardName: string) => {
  addPage.selectCardFromOptions(cardName);
});

When('user selects event source type {string}', (eventSourceType: string) => {
  eventSourcesPage.clickEventSourceType(eventSourceType);
});

When('type Resoruce APIVERSION as {string}', (apiVersion: string) => {
  cy.get(eventSourceObj.apiServerSource.apiVersion).type(apiVersion);
});

When('type Resource KIND as {string}', (version: string) => {
  cy.get(eventSourceObj.apiServerSource.kind).type(version);
});

When('selects {string} option from Service Account Name field', (serviceAccountName: string) => {
  eventSourcesPage.selectServiceType(serviceAccountName);
});

When('selects an {knativeService} option from Kantive service field', (knativeService: string) => {
  eventSourcesPage.selectKnativeService(knativeService);
});

When('user clicks on Create button', () => {
  eventSourcesPage.clickCreate();
});

When('type Container Image as {string}', (a: string) => {
 cy.log(a)
});

When('type schedule as {string}', (a: string) => {
 cy.log(a)
});

When('type Subject apiVersion as {string}', (a: string) => {
 cy.log(a)
});

When('type Subject Kind as {string}', (a: string) => {
 cy.log(a)
});

Then('user redirects to page with header name {string}', (pageTitle: string) => {
 eventSourcesPage.verifyTitle(pageTitle);
});

Then('able to see event source types like ApiServerSource, ContainerSource, CronJobSource, PingSource, SinkBinding', () => {
  eventSourcesPage.verifyEventSourceType('Api Server Source');
  eventSourcesPage.verifyEventSourceType('Container Source');
  eventSourcesPage.verifyEventSourceType('Cron Job Source');
  eventSourcesPage.verifyEventSourceType('Ping Source');
  eventSourcesPage.verifyEventSourceType('Sink Binding');
});

Then('user able to see {string} event source type', (eventSoruceType: string) => {
  eventSourcesPage.verifyEventSourceType(eventSoruceType);
}); 

Then('able to see Knative Eventing card', () => {
  addPage.verifyCard('Knative Eventing');
});

Then('able to see notifier with header {string}', (a: string) => {
 cy.log(a)
});

Then('message as {string}', (a: string) => {
 cy.log(a)
});

Then('page contains Resource, Mode, Service Account Name, Sink, General sections', () => {
  // TODO: implement step
});

Then('Resoruce contains App Version, Kind fields', () => {
  // TODO: implement step
});

Then('sink has Kantive service dropdown with defautl text {string}', (a: string) => {
 cy.log(a)
});

Then('Application Name, Name fields have defautl text as {string}, {string}', (a: string, b: string) => {
 cy.log(a, b,)
});

Then('Create button is disabled', () => {
  // TODO: implement step
});

Then('page contains Container, Environmental variables, Sink, General sections', () => {
  // TODO: implement step
});

Then('Container has Image, Name, Arguments text fields and Add args link', () => {
  // TODO: implement step
});

Then('Environmental variables has Name, Value fields and Add More link', () => {
  // TODO: implement step
});

Then('Application Name, Name fields will have defautl text as {string}, {string}', (a: string, b: string) => {
 cy.log(a, b,)
});

Then('page contains CronJobSource, Sink, General sections', () => {
  // TODO: implement step
});

Then('CronJobSource has Data, Scedule fields', () => {
  // TODO: implement step
});

Then('page contains PingSource, Sink, General sections', () => {
  // TODO: implement step
});

Then('PingSource has Data, Scedule fields', () => {
  // TODO: implement step
});

Then('page contains Subject, Sink, General sections', () => {
  // TODO: implement step
});

Then('Subject has apiVersion, Kind, Match Labels with Name, Value fields and Add Values link', () => {
  // TODO: implement step
});

Then('page contains CamelSource section', () => {
  // TODO: implement step
});

Then('Create button is enabled', () => {
  // TODO: implement step
});

Then('ApiServerSource event source is created and linked to selected kantive service {string}', (resourceName: string) => {
  topologyPage.componentNode(resourceName).click();
  topologySidePane.verifyResource(resourceName);
});

Then('ContainerSource event source is created and linked to selected kantive service', () => {
  // TODO: implement step
});

Then('CronJobSource event source is created and linked to selected kantive service', () => {
  // TODO: implement step
});

Then('PingSource event source is created and linked to selected kantive service', () => {
  // TODO: implement step
});

Then('SinkBinding event source is created and linked to selected kantive service', () => {
  // TODO: implement step
});

Then('CamelSource event source is created and linked to selected kantive service', () => {
  // TODO: implement step
});
