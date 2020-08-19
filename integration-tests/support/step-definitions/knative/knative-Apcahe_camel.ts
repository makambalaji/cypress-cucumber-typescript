import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('create the project {string}', (a: string) => {
 cy.log(a)
});

Given('cluster is installed with knative Apache camel operator', () => {
  
});

Then('user redirects to page with header name {string}', (headerName: string) => {
  cy.titleShouldBe(headerName);
});

Then('able to see CamelSource event type', () => {
  // TODO: implement step
});
