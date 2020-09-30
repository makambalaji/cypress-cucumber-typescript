import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { projectNameSpace } from '../../pages/app';
import { addPage } from '../../pages/add-flow/add-page';
import { topologyPage } from '../../pages/topology-page';

Given('deployment-config workload is present in topology', () => {
  // Manual Step
});

Given('knative workload without revision is present in topology', () => {
  // Manual Step
});

Given('knative workload with revison is present in topology', () => {
  // Manual Step
});

When('user checks nodes and the decorators associated with them', () => {
  // Manual Step
});

When('user right clicks on the node {string} to open context menu', (componentNode: string) => {
  cy.get('g.odc-base-node__label').should('be.visible').contains(componentNode).trigger('contextmenu', {force: true});
  topologyPage.verifyContextMenu();
});

Then('user is able to context menu options like Edit Application Grouping, Edit Pod Count, Pause Rollouts, Add Health Checks, Add Horizontal Pod Autoscaler, Add Storage, Edit Update Strategy, Edit Labels, Edit Annotations, Edit Deployment, Delete Deployment, Edit {string}', (nodeName: string) => {
  topologyPage.verifyContextMenuOptions('Edit Application Grouping', 'Edit Pod Count', 'Pause Rollouts', 'Add Health Checks', 'Add Horizontal Pod Autoscaler', 'Add Storage', 'Edit Update Strategy', 'Edit Labels', 'Edit Annotations', 'Edit Deployment', 'Delete Deployment', `Edit ${nodeName}`);
});

When('user clicks on Zoom In option', () => {
  // Manual Step
});

When('user clicks on Zoom Out option', () => {
  // // Manual Step
});

When('user sees the chart area is zoomed', () => {
  // // Manual Step
});

When('user clicks on Fit to Screen option', () => {
  // Manual Step
});

When('user clicks on Reset View option', () => {
  // Manual Step
});

Then('user sees Topology page with message on the top {string}', (message: string) => {
  topologyPage.verifyNoWorkLoadsText(message);
});

Then('user sees different workloads in topology chart area', () => {
  topologyPage.verifyWorkLoads();
});

Then('nodes are circular shaped with builder image in them', () => {
  // Manual Step
});

Then('pod ring associated with node are present around node with color according to the pod status', () => {
  // Manual Step
});

Then('deployment can have application url on top-right of the node', () => {
  // Manual Step
});

Then('user sees edit source code decorator is on bottom right of the node which can lead to github or che workspace', () => {
  // Manual Step
});

Then('user sees build decorator on bottom left which will take user to either build tab or pipeline depending on pipeline associated with them', () => {
  // Manual Step
});

Then('user checks node label having {string} for deployment and then name of node', (a: string) => {
  // Manual Step
});

Then('deployment-config can have application url on top-right of the node', () => {
  // Manual Step
});

Then('user checks node label having {string} for deployment-config and then name of node', (a: string) => {
  // Manual Step
});

Then('user can view knative service are rectangular shaped with round corners', () => {
  // Manual Step
});

Then('user can see dotted boundary with text {string} mentioned', (a: string) => {
  // Manual Step
});

Then('knative sevice app can have application url on top-right of the node', () => {
  // Manual Step
});

Then('user sees build decorator on bottom left on knative service app which will take user to build tab', () => {
  // Manual Step
});

Then('user checks knative service having label {string} and then the name of service', (a: string) => {
  // Manual Step
});

Then('user can see knative service app with dotted boundary with revision present inside it', () => {
  // Manual Step
});

Then('user can see traffic distribution from knative sevice app to its revisions with its percentage number', () => {
  // Manual Step
});

Then('pod ring associated with revisions are present around node with color according to the pod status', () => {
  // Manual Step
});

Then('knative revision can have application url on top-right of the node', () => {
  // Manual Step
});

Then('user sees edit source code decorator is on bottom right of the revision which can lead to github or che workspace', () => {
  // Manual Step
});

Then('user sees build decorator on bottom left on knative service app which will take user to either build tab', () => {
  // Manual Step
});

Then('user checks revisions having label {string} and then the name', (a: string) => {
  // Manual Step
});

Then('user sees the chart area is zoomed', () => {
  // Manual Step
});

Then('user sees the chart area is zoomed out', () => {
  // Manual Step
});

Then('user sees the nodes fitting within chart area', () => {
  // Manual Step
});

Then('user sees the chart area is reset to original', () => {
  // Manual Step
});
