import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { resourceTypes } from '../../constants/add';
import { topologyPage, topologySidePane } from '../../pages/topology_page';
import { editLabels, editAnnotations, deleteservice, deleteRevision } from '../../pages/popupAlerts';
import { naviagteTo, app } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';
import { eventSourcesPage } from '../../pages/add/eventSource_page';

Given('knative service named {string} is higlighted on topology page', (knativeServiceName: string) => {
  app.waitForLoad();
  cy.get('body').then(($el) => {
    if($el.find('.pf-c-card__title').length !== 0) {
      addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName, resourceTypes.knativeService);
      topologyPage.verifyTopologyPage();
    }
    else if($el.find('[data-test-id="item-filter"]').length !== 0) {
      topologyPage.search(knativeServiceName).then(() => {
        cy.get('body').then(($el) => {
          if($el.find('.is-filtered').length === 0) {
            addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName, resourceTypes.knativeService);
            topologyPage.verifyTopologyPage();
          }
        });
      }) ;
    }
  });
});

Given('user has created knative service {string}', (knativeServiceName: string) => {
  naviagteTo(devNavigationMenu.Add);
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName, resourceTypes.knativeService);
});

Given('user has created knative services {string} and {string}', (knativeServiceName: string, knativeServiceName1: string) => {
  naviagteTo(devNavigationMenu.Add);
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName, resourceTypes.knativeService);
  naviagteTo(devNavigationMenu.Add);
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName1, resourceTypes.knativeService);
});

Given('user has created {string} event source', (eventSourceName: string) => {
  naviagteTo(devNavigationMenu.Add);
  eventSourcesPage.createSinkBinding(eventSourceName);
});

Given('knative services named {string} and {string} are higlighted on topology page', (knativeServiceName: string, knativeServiceName1: string) => {
  app.waitForLoad();
  cy.get('body').then(($el) => {
    if($el.find('.pf-c-card__title').length !== 0) {
      addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName, resourceTypes.knativeService);
      topologyPage.verifyTopologyPage();
      addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName1, resourceTypes.knativeService);
      topologyPage.verifyTopologyPage();
    }
    else if($el.find('[data-test-id="item-filter"]').length !== 0) {
      topologyPage.search(knativeServiceName).then(() => {
        cy.get('body').then(($el) => {
          if($el.find('.is-filtered').length === 0) {
            addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName, resourceTypes.knativeService);
            topologyPage.verifyTopologyPage();
            addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git',knativeServiceName1, resourceTypes.knativeService);
            topologyPage.verifyTopologyPage();
          }
        });
      }) ;
    }
  });
});

When('user right clicks on the knative service {string}', (knativeServiceName: string) => {
  topologyPage.componentNode(knativeServiceName).should('be.visible').trigger('contextmenu', {force:true});
});

Then('user is able to see the options like Edit Application Grouping, Set Traffic Distribution, Edit Health Checks, Edit Labels, Edit Annotations, Edit Service, Delete Service, {string}',(knativeServiceName: string) => {
  cy.byTestActionID('Edit Application Grouping').should('be.visible');
  cy.byTestActionID('Set Traffic Distribution').should('be.visible');
  cy.byTestActionID(`Edit ${knativeServiceName}`).should('be.visible');
  cy.byTestActionID('Edit Health Checks').should('be.visible');
  cy.byTestActionID('Edit Labels').should('be.visible');
  cy.byTestActionID('Edit Annotations').should('be.visible');
  cy.byTestActionID('Edit Service').should('be.visible');
  cy.byTestActionID('Delete Service').should('be.visible');
});

When('user adds the label {string} to exisitng labels list in Edit Labels modal', (labelName: string) => {
  editLabels.enterLabel(labelName);
});

When('user clicks the save button on the {string} modal', (modalTitle: string) => {
  cy.alertTitleShouldBe(modalTitle);
  editLabels.clicKSave();
});

When('user clicks the cancel button on the {string} modal', (modalTitle: string) => {
  cy.alertTitleShouldBe(modalTitle);
  editLabels.clickCancel();
});

Given('number of annotations are {string} present in side bar - details tab- annotation section', (a: string) => {
 cy.log(a)
});

Given('number of annotations are {string} present in side bar - details tab', (a: string) => {
 cy.log(a)
});

Given('service should have at least 1 revision', () => {
  // TODO: implement step
});

When('user selects {string} context menu option of knative service {string}', (option: string, knativeServiceName: string) => {
  topologyPage.componentNode(knativeServiceName).click();
  topologyPage.selectContextMenuAction(option);
});

When('user clicks Add button on the Edit Annotaions modal', () => {
 editAnnotations.add();
});

Given('number of annotations are {string} present in {string} service side bar details tab', (numOfAnnotations: string, servicename: string) => {
  topologyPage.componentNode(servicename).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
});

When('user enters annotation key as {string}', (key: string) => {
  editAnnotations.enterKey(key);
});

When('user enters annotation value as {string}', (value: string) => {
  editAnnotations.enterValue(value);
});

When('user removes the label {string} from exisitng labels list in {string} modal', (a: string, b: string) => {
 cy.log(a, b,)
});

When('user clicks on {string} icon for the annotation with key {string} present in {string} modal', (a: string, b: string, c: string) => {
 cy.log(a, b, c)
});

When('user clicks {string} button on the {string} modal', (a: string, b: string) => {
 cy.log(a, b,)
});

When('user modifies the Yaml file of the Revision details pagex', () => {
  // TODO: implement step
});

When('user clicks on {string} button', (a: string) => {
 cy.log(a)
});

When('user selects the {string} from {string} drop down present in {string} modal', (a: string, b: string, c: string) => {
 cy.log(a, b, c)
});

When('user searches for application name {string}', (a: string) => {
 cy.log(a)
});

When('user clicks on {string} on topology page', (a: string) => {
 cy.log(a)
});

When('user selects the {string} option from {string} drop down present in {string} modal', (a: string, b: string, c: string) => {
 cy.log(a, b, c)
});

When('user selects the {string} option from {string} drop down present in {string} modal', (a: string, b: string, c: string) => {
  cy.log(a, b, c);
});

When('user enters {string} into the {string} text box', (a: string, b: string) => {
  cy.log(a, b);
});

When('user clicks on {string} button present in {string} modal', (a: string, b: string) => {
  cy.log(a, b);
});

When('user enters {string} into the {string} text box of new revision', (a: string, b: string) => {
  cy.log(a, b);
});

When('user selects the {string} option from {string} drop down', (a: string, b: string) => {
  cy.log(a, b);
});

When('user clicks {string} buttonn on {string} modal', (a: string, b: string) => {
  cy.log(a, b);
});

When('user clicks on {string} button present in redirected page', (a: string) => {
  cy.log(a);
});

Then('save button is disabled', () => {
  // TODO: implement step
});

Then('the label {string} display in {string} service side bar details', (label: string, serviceName: string) => {
  topologyPage.componentNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyLabel(label);
});

Then('the label {string} will not display in {string} service side bar details', (label: string, serviceName: string) => {
  cy.log(label);
  topologyPage.componentNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifySection('Labels');
  // Add one more line to check the condition
});

Then('user will not see the label {string} in the Details tab of the Sidebar of {string}', (label: string, serviceName: string) => {

});

Then('key, value columns are displayed with respecitve text fields', () => {
  // TODO: implement step
});

Then('Add more link is enabled', () => {
  // TODO: implement step
});

Then('number of annotaions increased to {string} in {string} service side bar details', (numOfAnnotations: string, serviceName: string) => {
  topologyPage.componentNode(serviceName).click();
  topologySidePane.selectTab('Details');
  topologySidePane.verifyNumberOfAnnotations(numOfAnnotations);
});

When('user clicks on remove icon for the annotation with key {string} present in Edit Annotaions modal', (key: string) => {
  editAnnotations.removeAnnotation(key);
});

Then('number of annotaions remains same in side bar details', () => {
  // TODO: implement step
});

Then('number of annotaions decreased to {string} in side bar details', (a: string) => {
  cy.log(a);
});

Then('message should display as {string}', (a: string) => {
  cy.log(a);
});

Then('another message should display as {string}', (a: string) => {
  cy.log(a);
});

Then('updated service is present in side bar', () => {
  // TODO: implement step
});

Then('updated service should not display in side bar', () => {
  // TODO: implement step
});

Then('error message displays as {string}', (errorMessage: string) => {
  // TODO: implement step
});

Then('number of routes should get increased in side bar - resources tab - routes section', () => {
  // TODO: implement step
});

Then('modal displayed with header name {string}', (headerName: string) => {
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
  cy.get('.is-filtered').should('not.be.visible');
});

When('user clicks save button on yaml page', () => {

});

When('user clicks cancel button on {string} page', (buttonName: string) => {
  cy.log(buttonName);
});