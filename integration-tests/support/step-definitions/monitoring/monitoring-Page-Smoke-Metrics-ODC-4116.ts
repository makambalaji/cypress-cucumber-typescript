import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { monitoringPage, monitoringPageObj } from '../../pages/monitoring-page';
import { monitoringTabs } from '../../constants/monitoring';

Given('user is on Metrics tab', () => {
  monitoringPage.clickTab(monitoringTabs.Metrics);
});

When('user selects {string} Query from Select Query dropdown', (queryName: string) => {
  monitoringPage.metrics.selectQuery(queryName);
});

When('user enters the custom query', () => {
  monitoringPage.metrics.enterQuery('sum(container_memory_working_set_bytes{ namespace="openshift-monitoring", container!="POD", container!=""}) by (pod)');
});

When('user clicks on Show PromQL button', () => {
  // TODO: implement step
});

When('user clicks on Hide PromQL button', () => {
  // TODO: implement step
});

When('user clicks on Time range dropdown', () => {
  // TODO: implement step
});

When('user selects 1h Time', () => {
  // TODO: implement step
});

When('user clicks on Reset Zoom button', () => {
  monitoringPage.metrics.clickResetZoom();
});

Then('user will see the CPU Usage', () => {
  monitoringPage.metrics.verifyGraph();
});

Then('user will see the pods list', () => {
  cy.get(monitoringPageObj.metricsTab.podsList).should('be.visible');
});

Then('user will see the value of CPU used by each pod', () => {
  // TODO: implement step
});

Then('user will see the Memory Usage', () => {
  monitoringPage.metrics.verifyGraph();
});

Then('user will see the value of Memory used by each pod', () => {
  // TODO: implement step
});

Then('user will see the Filesystem Usage', () => {
  // TODO: implement step
});

Then('user will see namespace name {string}', (a: string) => {
  // TODO: implement step
});

Then('user will see the value of Filesystem used by each pod', () => {
  // TODO: implement step
});

Then('user will see the Received Bandwidth', () => {
  // TODO: implement step
});

Then('user will see the value of Received Bandwidth by each pod', () => {
  // TODO: implement step
});

Then('user will see the Transmitted Bandwidth', () => {
  // TODO: implement step
});

Then('user will see the value of Trasmitted Bandwidth by each pod', () => {
  // TODO: implement step
});

Then('user will see the Received Packets', () => {
  // TODO: implement step
});

Then('user will see the value of Received Packets by each pod', () => {
  // TODO: implement step
});

Then('user will see the Trasmitted Packets', () => {
  // TODO: implement step
});

Then('user will see the value of Trasmitted Packets by each pod', () => {
  // TODO: implement step
});

Then('user will see the Received Packets Dropped', () => {
  // TODO: implement step
});

Then('user will see the value of Received Packets Dropped by each pod', () => {
  // TODO: implement step
});

Then('user will see the Trasmitted Packets Dropped', () => {
  // TODO: implement step
});

Then('user will see the value of Trasmitted Packets Dropped by each pod', () => {
  // TODO: implement step
});

Then('user will see the output of the custom query', () => {
  // TODO: implement step
});

Then('user will see the value of given custom query by each pod', () => {
  // TODO: implement step
});

Then('user will see the query ran to see CPU Usage', () => {
  // TODO: implement step
});

Then('user will see Hide PromQL button', () => {
  // TODO: implement step
});

Then('user wont see the query', () => {
  // TODO: implement step
});

Then('user will see CPU Usage for past one hour', () => {
  // TODO: implement step
});

Then('user will see Time range changed to 30m', () => {
  // TODO: implement step
});
