import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { topologySidePane, topologyPage } from '../../pages/topology_page';

When('user clicks on event source {string}', (eventSourceName: string) => {
  topologyPage.search(eventSourceName);
  cy.get('[data-type="event-source"] text').eq(0).click();
});

Given('one service {string} should be available', (serviceName: string) => {
  
});

When('select the {string} from Action menu present in right side pane', (action: string) => {
  topologySidePane.selectNodeAction(action);
});

Then('side pane dsiplays with header name as {string}', (headerName: string) => {
  topologySidePane.verifyTitle(headerName);
});
