import { Then } from 'cypress-cucumber-preprocessor/steps';
import { eventSourcesPage } from '../../pages/add/eventSource_page';

Then('user redirects to page with header name {string}', (headerName: string) => {
  cy.titleShouldBe(headerName);
});

Then('able to see CamelSource event type', () => {
  eventSourcesPage.verifyEventSourceType('Camel Source');
});
