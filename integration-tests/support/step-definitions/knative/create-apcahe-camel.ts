import { Then } from 'cypress-cucumber-preprocessor/steps';
import { eventSourcesPage } from '../../pages/add-flow/eventSource-page';

Then('user will be redirected to page with header name {string}', (headerName: string) => {
  cy.titleShouldBe(headerName);
});

Then('user is able to see CamelSource event type', () => {
  eventSourcesPage.verifyEventSourceType('Camel Source');
});
