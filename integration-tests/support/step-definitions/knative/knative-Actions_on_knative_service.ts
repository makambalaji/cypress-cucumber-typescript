import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { resourceTypes } from '../../constants/add';
import { topologyPage, topologySidePane } from '../../pages/topology_page';
import { editLabels, editAnnotations, deleteservice, deleteRevision } from '../../pages/popupAlerts';

Given('knative service name {string} is higlighted on topology page', (kantiveServiceName: string) => {
  topologyPage.search(kantiveServiceName).then(() => {
    cy.get('body').then(($el) => {
      if($el.find('.is-filtered').length === 0) {
        addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',kantiveServiceName, resourceTypes.KnativeService);
      }
    });
  }) ;
});

When('user right click on the knative service {string}', (kantiveServiceName: string) => {
  topologyPage.componentNode(kantiveServiceName).should('be.visible').trigger('contextmenu', {force:true});
});

Then('user able to see the options like Edit Application Grouping, Set Traffic Distribution, Edit Health Checks, Edit Labels, Edit Annotations, Edit Service, Delete Service, {string}',(kantiveServiceName: string) => {
  cy.byTestActionID('Edit Application Grouping').should('be.visible');
  cy.byTestActionID('Set Traffic Distribution').should('be.visible');
  cy.byTestActionID(`Edit ${kantiveServiceName}`).should('be.visible');
  cy.byTestActionID('Edit Health Checks').should('be.visible');
  cy.byTestActionID('Edit Labels').should('be.visible');
  cy.byTestActionID('Edit Annotations').should('be.visible');
  cy.byTestActionID('Edit Service').should('be.visible');
  cy.byTestActionID('Delete Service').should('be.visible');
});

When('add the label {string} to exisitng labels list in Edit Labels popup', (labelName: string) => {
  editLabels.enterLabel(labelName);
});

When('clicks save button on the {string} popup', (popupTitle: string) => {
  cy.alertTitleShouldBe(popupTitle);
  editLabels.clicKSave();
});

Given('number of annotations are {string} present in side pane - details tab- annotation section', (a: string) => {
 cy.log(a)
});

Given('number of annotations are {string} present in side pane - details tab', (a: string) => {
 cy.log(a)
});

Given('service should have at least 1 revision', () => {
  // TODO: implement step
});

When('user selects {string} option from context menu of knative service {string}', (option: string, kantiveServiceName: string) => {
  topologyPage.componentNode(kantiveServiceName).click();
  topologyPage.selectContextMenuAction(option);
});

When('clicks Add button on the Edit Annotaions popup', () => {
 editAnnotations.add();
});

Given('number of annotations are {string} present in {string} service side pane details tab', (numOfAnnotations: string, servicename: string) => {
  topologyPage.componentNode(servicename).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
});

When('types annotation key as {string}', (key: string) => {
  editAnnotations.enterKey(key);
});

When('types annotation value as {string}', (value: string) => {
  editAnnotations.enterValue(value);
});

When('removes the label {string} from exisitng labels list in {string} popup', (a: string, b: string) => {
 cy.log(a, b,)
});

When('types {string} into the {string} text box', (a: string, b: string) => {
 cy.log(a, b,)
});

When('click on {string} icon for the annotation with key {string} present in {string} popup', (a: string, b: string, c: string) => {
 cy.log(a, b, c)
});

When('click {string} button on the {string} popup', (a: string, b: string) => {
 cy.log(a, b,)
});

When('modify the Yaml file of the Revision details pagex', () => {
  // TODO: implement step
});

When('click on {string} button', (a: string) => {
 cy.log(a)
});

When('select the {string} from {string} drop down present in {string} popup', (a: string, b: string, c: string) => {
 cy.log(a, b, c)
});

When('search for application name {string}', (a: string) => {
 cy.log(a)
});

When('click on {string} on topology page', (a: string) => {
 cy.log(a)
});

When(' select the {string} option from {string} drop down present in {string} popup', (a: string, b: string, c: string) => {
 cy.log(a, b, c)
});

When('select the {string} option from {string} drop down present in {string} popup', (a: string, b: string, c: string) => {
  cy.log(a, b, c);
});

When('type {string} into the {string} text box', (a: string, b: string) => {
  cy.log(a, b);
});

When('click on {string} button present in {string} popup', (a: string, b: string) => {
  cy.log(a, b);
});

When('type {string} into the {string} text box of new revision', (a: string, b: string) => {
  cy.log(a, b);
});

When('select the {string} option from {string} drop down', (a: string, b: string) => {
  cy.log(a, b);
});

When('click {string} buttonn on {string} popup', (a: string, b: string) => {
  cy.log(a, b);
});

When('', () => {
  // TODO: implement step
});

When('click on {string} button present in redirected page', (a: string) => {
  cy.log(a);
});

Then('popup displays with header name {string}', (a: string) => {
  cy.log(a);
});

Then('save button is disabled', () => {
  // TODO: implement step
});

Then('the label {string} display in {string} service side pane details', (label: string, serviceName: string) => {
  topologyPage.componentNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyLabel(label);
});

Then('the label {string} will not display in {string} service side pane details', (label: string, serviceName: string) => {
  topologyPage.componentNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifySection('Labels');
  // Add one more line to check the condition
});

Then('the label {string} will not display in side pane details', (a: string) => {
  cy.log(a);
});

Then('key, value columns are displayed with respecitve text fields', () => {
  // TODO: implement step
});

Then('Add more link is enabled', () => {
  // TODO: implement step
});

Then('number of annotaions increased to {string} in {string} service side pane details', (numOfAnnotations: string, serviceName: string) => {
  topologyPage.componentNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
});

When('click on remove icon for the annotation with key {string} present in Edit Annotaions popup', (key: string) => {
  editAnnotations.removeAnnotation(key);
});

Then('number of annotaions remains same in side pane details', () => {
  // TODO: implement step
});

Then('number of annotaions decreased to {string} in side pane details', (a: string) => {
  cy.log(a);
});

Then('message should display as {string}', (a: string) => {
  cy.log(a);
});

Then('another message should display as {string}', (a: string) => {
  cy.log(a);
});

Then('updated service is present in side pane', () => {
  // TODO: implement step
});

Then('updated service should not display in side pane', () => {
  // TODO: implement step
});

Then('error message displays as {string}', (errorMessage: string) => {
  // TODO: implement step
});

Then('number of routes should get increased in side pane - resources tab - routes section', () => {
  // TODO: implement step
});

Then('popup displayed with header name {string}', (headerName: string) => {
  cy.alertTitleShouldBe(headerName);
});

Then('modal get closed on clicking Delete button', () => {
  deleteservice.clicKDelete();
  cy.get('form').should('not.be.visible');
});

Then('modal should get closed on clicking OK button', () => {
  deleteRevision.clickOK();
});

Then('{string} service should not be displayed in project', (serviceName: string) => {
  topologyPage.search(serviceName);
  cy.get('.is-filtered', {timeout: 10000}).should('not.be.visible');
});

When('click save button on yaml page', () => {

});

When('click cancel button on {string} page', (buttonName: string) => {
  cy.log(buttonName);
});