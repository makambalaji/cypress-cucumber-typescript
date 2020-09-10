import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { topologyPage } from '../../pages/topology_page';

let firstComponent = 'nodejs-ex-git';
let secondComponent = 'dancer-ex-git';
let thirdComponent = 'dancer-ex-git-knative';


Given('user has created deployment, deployment-config and knative-service type resources', () => {
  addPage.createGitWorkload('https://github.com/sclorg/nodejs-ex.git', 'nodejs-ex-git-app', firstComponent, 'Deployment');
  addPage.createGitWorkload('https://github.com/sclorg/dancer-ex.git', 'dancer-ex-git-app', secondComponent, 'Deployment Config');
  addPage.createGitWorkload('https://github.com/sclorg/dancer-ex.git', 'dancer-ex-git-app', thirdComponent, 'knative');
});

When('user clicks on Display Options', () => {
  topologyPage.clicKDisplayOptionDropdown()
});

When('user sees {string} and {string} under {string} and {string} have options according to their presence which are {string} and {string}', (a: string, b: string, c: string, d: string, e: string, f: string) => {
  
});

When('user deselects {string} which is selected by default', (a: string) => {
  // TODO: implement step
});

When('user sees the labels under the workloads have dissapeared', () => {
  // TODO: implement step
});

When('user hovers over application grouping the label appears', () => {
  // TODO: implement step
});

When('user selects {string} which is deselected by default', (a: string) => {
  // TODO: implement step
});

When('user checks the workloads which shows pod count instead of buider images', () => {
  // TODO: implement step
});

When('user deselects {string} in the Expand section', (a: string) => {
  // TODO: implement step
});

Then('user can see workloads squashed in Application grouping', () => {
  // TODO: implement step
});

Then('user selects {string} in the Expand section', (a: string) => {
  // TODO: implement step
});

Then('user deselects {string} in the Expand section', (a: string) => {
  // TODO: implement step
});

Then('user can see knative workload squashed in Application grouping', () => {
  // TODO: implement step
});
