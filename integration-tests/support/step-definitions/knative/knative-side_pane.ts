import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { topologyPage, topologySidePane } from '../../pages/topology_page';

// Given('side pane is displayed for revision of kantive service {string} in topology page', (a: string) => {
  
// });

When('user clicks on the revision of knative service {string}', (serviceName: string) => {
 topologyPage.revisionNode(serviceName).click();
});

When('user clicks on Resoruces section', () => {
  // TODO: implement step
});

When('user clicks on Actions dropdown in top right corner of side pane', () => {
  
});

When('user clicks on the knative serivce {string}', (serviceName: string) => {
  topologyPage.componentNode(serviceName).click();
});

When('user click on the knative revision name {string}', (a: string) => {
 cy.log(a)
});

Then('side pane is displayed with heading name as {string}', (serviceName: string) => {
 topologySidePane.verifyTitle(serviceName);
});

Then('user able to see pods status as {string} by default', (podStatus: string) => {
 cy.log(podStatus);
});

// Then('name displays as {string}', (a: string) => {
//  cy.log(a)
// });

// Then('namespace displays as {string}', (a: string) => {
//  cy.log(a)
// });

// Then('Labels section contain n number of Labels', () => {
//   // TODO: implement step
// });

// Then('Annotations section contain {string}', (a: string) => {
//  cy.log(a)
// });

// Then('{string} field the date in format {string}', (a: string, b: string) => {
//  cy.log(a, b)
// });

Then('user able to see the options {string}, {string}, {string}, {string}', (a: string, b: string, c: string, d: string) => {
  cy.log(a, b, c, d)
});

Then('side pane is displayed with heading name same as kantive service name {string}', (serviceName: string) => {
  topologySidePane.verifyTitle(serviceName);
});

Then('side pane is displayed', () => {
  topologySidePane.verify();
});

When('user click on the knative service name {string}', (serviceName: string) => {
  topologyPage.componentNode(serviceName).click();
});

// Then('Name should display as {string} in topology details', (name: string) => {
  
// });

// Then('Namespace should display as {string} in topology details', (namespace: string) => {
//  cy.log(namespace);
// });

// Then('Labels section should contain n number of Labels in topology details', () => {
  
// });

// Then('Annotations section should contain {string} in topology details', (a: string) => {
//  cy.log(a)
// });

// Then('{string} field display the date in format {string} in topology details', (a: string, b: string) => {
//  cy.log(a, b,)
// });

// Then('owner field should be displayed in topology details', () => {
//   // TODO: implement step
// });

Then('Name, Namespace, Labels, Annotations, Created on, Owner fields displayed  in topology details', () => {
  topologySidePane.selectTab('Details');
  topologySidePane.verifyFieldinDetailsTab('Name');
  topologySidePane.verifyFieldinDetailsTab('Namespace');
  topologySidePane.verifyFieldinDetailsTab('Labels');
  topologySidePane.verifyFieldinDetailsTab('Annotations');
  topologySidePane.verifyFieldinDetailsTab('Created on');
  topologySidePane.verifyFieldinDetailsTab('Owner');
});

Then('user able to see the options Edit Labels, Edit Annotations, Edit Revision, Delete Revision', () => {

});

Then('user able to see the options like Edit Application Grouping, Set Traffic Distribution, Edit NameOfWorkLoad, Edit Health Checks, Edit Labels, Edit Annotations, Edit Service, Delete Service', () => {

});