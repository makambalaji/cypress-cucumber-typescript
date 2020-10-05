import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { topologyPage, topologySidePane } from '../../pages/topology-page';
import { moveSink, modal } from '../../pages/modal';
import { eventSourcesPage } from '../../pages/add-flow/eventSource-page';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';

Given('event source {string} is higlighted on topology page', (eventSourceName: string) => {
  naviagteTo(devNavigationMenu.Add);
  eventSourcesPage.createSinkBinding(eventSourceName);
  topologyPage.search(eventSourceName);
  cy.get('.is-filtered').should('be.visible');
});

Given('knative service, event source and sink connector are present in topology page', () => {
  cy.get('[data-type="event-source"]').should('be.visible');
  cy.get('[data-type="knative-service"]').should('be.visible');
  cy.get('[data-type="event-source-link"]').should('be.visible');
});

When('user right clicks on the event source {string} to open context menu', (eventSourceName: string) => {
  topologyPage.search(eventSourceName);
  cy.get('[data-type="event-source"] text').eq(0).trigger('contextmenu', {force:true});
});

When('user selects {string} from context menu', (option: string) => {
  cy.byTestActionID(option).click();
});

Then('user can see options Edit Application Groupings, Move Sink, Edit Labels, Edit Annotations, Edit SinkBinding, Delete SinkBinding', () => {
  cy.byTestActionID('Edit Application Grouping').should('be.visible');
  cy.byTestActionID('Move Sink').should('be.visible');
  cy.byTestActionID('Edit Labels').should('be.visible');
  cy.byTestActionID('Edit Annotations').should('be.visible');
  cy.byTestActionID('Edit SinkBinding').should('be.visible');
  cy.byTestActionID('Delete SinkBinding').should('be.visible');
});

Then('user is able to see context menu', () => {
  cy.get('ul[role="menu"]').should('be.visible');
});

Then('modal displays with the header name {string}', (title: string) => {
  cy.alertTitleShouldContain(title);
});

When('user selects the Delete option on {string} modal', (modalTitle: string) => {
  cy.alertTitleShouldContain(modalTitle);
  modal.clicKDelete();
});

Then('event source {string} will not be displayed in topology page', (eventSourceName: string)=> {
  naviagteTo(devNavigationMenu.Topology);
  topologyPage.search(eventSourceName);
  cy.get('[data-type="event-source"]').should('not.be.visible');
});

Then('Resource dropdown is displayed in Move Sink modal', () => {
  moveSink.verifyResourceDropDown();
  modal.clickCancel();
});

When('user selects the knative service {string} from Resource dropdown', (knativeService: string) => {
  cy.alertTitleShouldContain("Move Sink");
  moveSink.verifyResourceDropDown();
  moveSink.selectResource(knativeService);
});

Then('user will see that event source {string} is sinked with knative Service {string}', (eventSourceName: string, knativeService: string) => {
  cy.log(`${eventSourceName} is linked with ${knativeService}`);
  cy.get('[data-type="event-source"] text').eq(0).click({force:true}).then(() => {
    topologySidePane.verify();
    topologySidePane.verifyResource(knativeService);
  });
});

When('user closes the side bar', () => {
  topologySidePane.close();
});

When('user clicks save on Move Sink modal', () => {
  modal.clicKSave();
});
