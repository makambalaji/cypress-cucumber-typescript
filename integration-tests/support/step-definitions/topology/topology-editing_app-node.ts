import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add_page';
import { topologyPage } from '../../pages/topology_page';

Given('user is in the topology with deployment workload', () => {
  addPage.createGitWorkload();
  topologyPage.verifyTopologyPage();
});

Given('user is in the topology with knative workload', () => {
  // TODO: implement step
});

When('user right clicks on the node', () => {
  topologyPage.appNode('nodejs-ex-git-app').trigger('contextmenu', {force: true});
});

When('user sees context menu', () => {
  // TODO: implement step
});

When('user clicks on {string}(like Edit golang)', (a: string) => {
  // TODO: implement step
});

When('user can see Edit form', () => {
  // TODO: implement step
});

When('user verifies that name of the node and route option is not editable', () => {
  // TODO: implement step
});

When('user verifies that Application grouping, git url builder image version and advanced option can be edited', () => {
  // TODO: implement step
});

When('user edits Application name', () => {
  // TODO: implement step
});

When('user clicks on save', () => {
  // TODO: implement step
});

When('user clicks on {string}', (a: string) => {
  // TODO: implement step
});

When('user verifies that name of service and route option is not editable', () => {
  // TODO: implement step
});

Then('user can see the change of node to the new Application defined above', () => {
  // TODO: implement step
});

Then('user can see the change of knative service to the new Application defined above', () => {
  // TODO: implement step
});
