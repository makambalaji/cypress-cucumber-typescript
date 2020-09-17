import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { topologyPage, topologySidePane } from '../../pages/topology-page';
import { moveSink, deleteSinkBinding } from '../../pages/popupAlerts';
import { eventSourcesPage } from '../../pages/add/eventSource_page';
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
  cy.alertTitleShouldBe(title);
});

When('user selects the Delete option on {string} modal', (modalTitle: string) => {
  cy.alertTitleShouldBe(modalTitle);
  deleteSinkBinding.clicKDelete();
});

Then('event source {string} will not be displayed in topology page', (eventSourceName: string)=> {
  topologyPage.search(eventSourceName);
  cy.get('[data-type="event-source"] text').should('not.be.visible');
});

Then('Resource dropdown is displayed in Move Sink modal', () => {
  moveSink.verifyResourceDropDown();
});

When('user selects the knative service {string} from Resource dropdown', (knativeService: string) => {
  cy.alertTitleShouldBe("Move Sink");
  moveSink.verifyResourceDropDown();
  moveSink.selectResource(knativeService);
});

Then('user will see that event source {string} is sinked with knative Service {string}', (eventSourceName: string, knativeService: string) => {
  cy.log(eventSourceName);
  cy.get('[data-type="event-source"] text').eq(0).click({force:true});
  topologySidePane.verifyResource(knativeService);
});