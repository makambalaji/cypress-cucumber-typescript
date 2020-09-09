import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { eventSourcesPage, eventSourceObj } from '../../pages/add/eventSource_page';
import { naviagteTo, app } from '../../pages/app';
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
  eventSourcesPage.selectEventSourceType(eventSourceType);
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

When('selects {string} option from Mode field', (mode: string) => {
  eventSourcesPage.selectMode(mode);
}); 

When('selects an {string} option from Kantive service field', (knativeService: string) => {
  eventSourcesPage.selectKnativeService(knativeService);
});

When('user clicks on Create button', () => {
  eventSourcesPage.clickCreate();
});

When('type event source name as {string}', (eventSourceName: string) => {
  eventSourcesPage.enterEventSourceName(eventSourceName);
 });
 
When('type Container Image as {string}', (containerImageName: string) => {
 cy.log(containerImageName);
});

When('type schedule as {string}', (schedule: string) => {
 cy.log(schedule);
});

When('type Subject apiVersion as {string}', (subjectApiVersion: string) => {
 cy.log(subjectApiVersion);
});

When('type Subject Kind as {string}', (subjectKind: string) => {
 cy.log(subjectKind);
});

Then('user will be redirected to page with header name {string}', (pageTitle: string) => {
 eventSourcesPage.verifyTitle(pageTitle);
});

Then('able to see event source enters like ApiServerSource, ContainerSource, CronJobSource, PingSource, SinkBinding', () => {
  app.waitForLoad();
  eventSourcesPage.verifyEventSourceType('Api Server Source');
  eventSourcesPage.verifyEventSourceType('Container Source');
  eventSourcesPage.verifyEventSourceType('Ping Source');
  eventSourcesPage.verifyEventSourceType('Sink Binding');
  // eventSourcesPage.verifyEventSourceType('Cron Job Source');  - Cron Job Source is removed change
});

Then('user able to see {string} event source type', (eventSoruceType: string) => {
  eventSourcesPage.verifyEventSourceType(eventSoruceType);
}); 

Then('able to see Knative Eventing card', () => {
  addPage.verifyCard('Knative Eventing');
});

Then('able to see notifier with header {string}', (headerName: string) => {
 cy.log(headerName);
});

Then('message as {string}', (message: string) => {
 cy.log(message);
});

Then('page contains Resource, Mode, Service Account Name, Sink, General sections', () => {
  // TODO: implement step
});

Then('Resoruce contains App Version, Kind fields', () => {
  // TODO: implement step
});

Then('sink has Kantive service dropdown with defautl text {string}', (text: string) => {
 cy.log(text);
});

Then('Application Name, Name fields have defautl text as {string}, {string}', (appName: string, name: string) => {
 cy.log(appName, name)
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

Then('Application Name, Name fields will have defautl text as {string}, {string}', (appName: string, name: string) => {
 cy.log(appName, name)
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

Then('ApiServerSource event source {string} is created and linked to selected kantive service {string}', (eventSource: string, resourceName: string) => {
  topologyPage.getEventSource(eventSource).click({force: true});
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
