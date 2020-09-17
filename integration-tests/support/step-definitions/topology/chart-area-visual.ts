import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { projectNameSpace } from '../../pages/app';
import { addPage } from '../../pages/add-flow/add-page';
import { topologyPage } from '../../pages/topology-page';

Given('deployment-config workload is present in topology', () => {
  // TODO: implement step
});

Given('knative workload without revision is present in topology', () => {
  // TODO: implement step
});

Given('knative workload with revison is present in topology', () => {
  // TODO: implement step
});

Given('topology has workloads', () => {
  projectNameSpace.createNewProject('aut-topology-workloads');
  addPage.createGitWorkload();
});

When('user creates a new project', () => {
  projectNameSpace.createNewProject('aut-topology-new-project');
});

When('user selects an existing project {string} from project list with existing workloads', (projectName: string) => {
  projectNameSpace.createNewProject(projectName);
  addPage.createGitWorkload();
   cy.get('[role="listbox"]').find('li[role="option"]').contains(projectName).click();
});

When('user checks nodes and the decorators associated with them', () => {
  // TODO: implement step
});

When('user right clicks on the node {string} to open context menu', (componentNode: string) => {
  topologyPage.componentNode(componentNode).trigger('contextmenu', {force: true});
  topologyPage.verifyContextMenu();
});

Then('user is able to context menu options like Edit Application Grouping, Edit Pod Count, Pause Rollouts, Add Health Checks, Add Horizontal Pod Autoscaler, Add Storage, Edit Update Strategy, Edit Labels, Edit Annotations, Edit Deployment, Delete Deployment', () => {
  topologyPage.verifyContextMenuOptions('Edit Application Grouping', 'Edit Pod Count', 'Pause Rollouts', 'Add Health Checks', 'Add Horizontal Pod Autoscaler', 'Add Storage', 'Edit Update Strategy', 'Edit Labels', 'Edit Annotations', 'Edit Deployment', 'Delete Deployment');
});

When('user clicks on Zoom In option', () => {
  // TODO: implement step
});

When('user clicks on Zoom Out option', () => {
  // TODO: implement step
});

When('user sees the chart area is zoomed', () => {
  // TODO: implement step
});

When('user clicks on Fit to Screen option', () => {
  // TODO: implement step
});

When('user clicks on Reset View option', () => {
  // TODO: implement step
});

Then('user sees Topology page with message on the top {string}', (message: string) => {
  topologyPage.verifyNoWorkLoadsText(message);
});

Then('user sees different workloads in topology chart area', () => {
  topologyPage.verifyWorkLoads();
});

Then('nodes are circular shaped with builder image in them', () => {
  // TODO: implement step
});

Then('pod ring associated with node are present around node with color according to the pod status', () => {
  // TODO: implement step
});

Then('deployment can have application url on top-right of the node', () => {
  // TODO: implement step
});

Then('user sees edit source code decorator is on bottom right of the node which can lead to github or che workspace', () => {
  // TODO: implement step
});

Then('user sees build decorator on bottom left which will take user to either build tab or pipeline depending on pipeline associated with them', () => {
  // TODO: implement step
});

Then('user checks node label having {string} for deployment and then name of node', (a: string) => {
  // TODO: implement step
});

Then('deployment-config can have application url on top-right of the node', () => {
  // TODO: implement step
});

Then('user checks node label having {string} for deployment-config and then name of node', (a: string) => {
  // TODO: implement step
});

Then('user can view knative service are rectangular shaped with round corners', () => {
  // TODO: implement step
});

Then('user can see dotted boundary with text {string} mentioned', (a: string) => {
  // TODO: implement step
});

Then('knative sevice app can have application url on top-right of the node', () => {
  // TODO: implement step
});

Then('user sees build decorator on bottom left on knative service app which will take user to build tab', () => {
  // TODO: implement step
});

Then('user checks knative service having label {string} and then the name of service', (a: string) => {
  // TODO: implement step
});

Then('user can see knative service app with dotted boundary with revision present inside it', () => {
  // TODO: implement step
});

Then('user can see traffic distribution from knative sevice app to its revisions with its percentage number', () => {
  // TODO: implement step
});

Then('pod ring associated with revisions are present around node with color according to the pod status', () => {
  // TODO: implement step
});

Then('knative revision can have application url on top-right of the node', () => {
  // TODO: implement step
});

Then('user sees edit source code decorator is on bottom right of the revision which can lead to github or che workspace', () => {
  // TODO: implement step
});

Then('user sees build decorator on bottom left on knative service app which will take user to either build tab', () => {
  // TODO: implement step
});

Then('user checks revisions having label {string} and then the name', (a: string) => {
  // TODO: implement step
});

Then('user sees the chart area is zoomed', () => {
  // TODO: implement step
});

Then('user sees the chart area is zoomed out', () => {
  // TODO: implement step
});

Then('user sees the nodes fitting within chart area', () => {
  // TODO: implement step
});

Then('user sees the chart area is reset to original', () => {
  // TODO: implement step
});
