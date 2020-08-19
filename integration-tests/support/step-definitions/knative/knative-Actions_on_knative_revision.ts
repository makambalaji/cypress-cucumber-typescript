import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { editLabels, deleteRevision } from '../../pages/popupAlerts';
import { topologyPage, topologySidePane } from '../../pages/topology_page';

Given('number of annotations are {string} present in revision side pane details of service {string}', (numOfAnnotations: string, serviceName: string) => {
  topologyPage.revisionNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
});

Given('number of annotations are {string} present in side pane - details tab- annotation section', (a: string) => {
  cy.log(a);
});

Given('number of annotations are {string} present in side pane - details tab', (a: string) => {
  cy.log(a);
});

Given('service should contain multiple revisions', () => {
  // TODO: implement step
});

When('user right click on the revision of knative service {string}', (serviceName: string) => {
  topologyPage.revisionNode(serviceName).trigger('contextmenu', {force: true});
});

When('user selects {string} option from knative revision context menu', (option: string) => {
  cy.byTestActionID(option).click();
});

When('removes the label {string} from exisitng labels list in Edit Labels popup', (labelName: string) => {
  editLabels.removeLabel(labelName);
});

When('removes the label {string} from exisitng labels list in {string} popup', (a: string, b: string) => {
  cy.log(a, b);
});

When('types {string} into the {string} text box', (a: string, b: string) => {
  cy.log(a, b);
});

When('click on {string} icon for the annotation with key {string} present in {string} popup', (a: string, b: string, c: string) => {
  cy.log(a, b, c);
});

When('clicks cancel button on the {string} popup', (popupTitle: string) => {
  cy.alertTitleShouldBe(popupTitle);
  editLabels.clickCancel();
});

When('user clicks on Details tab', () => {
  // TODO: implement step
});

When('modify the Yaml file of the Revision details page', () => {
  // TODO: implement step
});

When('user clicks {string} button on Revision Yaml page', (a: string) => {
  cy.log(a);
});

Then('user able to see context menu with options Edit Labels, Edit Annotations, Edit Revision, Delete Revision', () => {
  cy.byTestActionID('Edit Labels').should('be.visible');
  cy.byTestActionID('Edit Annotations').should('be.visible');
  cy.byTestActionID('Edit Revision').should('be.visible');
  cy.byTestActionID('Delete Revision').should('be.visible');
});

Then('popup displays with header name {string}', (a: string) => {
  cy.log(a);
});

Then('save button is disabled', () => {
  // TODO: implement step
});

Then('the label {string} display in side pane details', (a: string) => {
  cy.log(a);
});

Then('the label {string} display in {string} revision side pane details', (label: string, serviceName: string) => {
  topologyPage.revisionNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyLabel(label);
});

Then('key, value columns are displayed with respecitve text fields', () => {
  // TODO: implement step
});

Then('Add more link is enabled', () => {
  // TODO: implement step
});

Then('number of annotaions increased to {string} in revision side pane details of service {string}', (numOfAnnotations: string, serviceName: string) => {
  topologyPage.revisionNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
});

Then('verify the number of annotaions equal to {string} in side pane details', (a: string) => {
  cy.log(a);
});

Then('verify the number of annotaions decreased to {string} in side pane details', (a: string) => {
  cy.log(a);
});

Then('details tab displayed with Revision Details and Conditions sections', () => {
  // TODO: implement step
});

Then('Revision details contains fields like Name, Namespace, Labels, Annotations, Created At, Owner', () => {
  // TODO: implement step
});

Then('the message display as {string}', (a: string) => {
  cy.log(a);
});

Then('another message display as {string}', (a: string) => {
  cy.log(a);
});

Then('popup displayed with message as {string}', (a: string) => {
  cy.log(a);
});

Then('popup displayed with header name Unable to delete revision and message as {string}', (message: string) => {
  cy.alertTitleShouldBe('Unable to delete revision');
  deleteRevision.verifyMessage(message);
});
