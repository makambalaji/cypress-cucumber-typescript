import { Then } from 'cypress-cucumber-preprocessor/steps';
import { eventSourcesPage } from '../../pages/add/eventSource_page';

Then('user will be redirected to page with header name {string}', (headerName: string) => {
  cy.titleShouldBe(headerName);
});

Then('user is able to see CamelSource event type', () => {
  eventSourcesPage.verifyEventSourceType('Camel Source');
});
