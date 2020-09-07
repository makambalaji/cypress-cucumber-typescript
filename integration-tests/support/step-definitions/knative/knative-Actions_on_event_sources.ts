import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { topologyPage } from '../../pages/topology_page';
import { moveSink } from '../../pages/popupAlerts';
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

When('user right clicks on the event source', () => {
  cy.get('[data-type="event-source"] text').eq(0).trigger('contextmenu', {force:true});
});

When('selects {string} from context menu', (option: string) => {
  cy.byTestActionID(option).click();
});

Then('user able to see context menu with options Edit Application Grouping, Move Sink, Edit Labels, Edit Annotations, Edit SinkBinding, Delete SinkBinding', () => {
  cy.byTestActionID('Edit Application Grouping').should('be.visible');
  cy.byTestActionID('Move Sink').should('be.visible');
  cy.byTestActionID('Edit Labels').should('be.visible');
  cy.byTestActionID('Edit Annotations').should('be.visible');
  cy.byTestActionID('Edit SinkBinding').should('be.visible');
  cy.byTestActionID('Delete SinkBinding').should('be.visible');
});

Then('modal displays with the header name {string}', (title: string) => {
  cy.alertTitleShouldBe(title);
});

Then('knative service dropdown is displayed in Move Sink modal', () => {
  moveSink.verifyKnativeServiceDropDown();
});
