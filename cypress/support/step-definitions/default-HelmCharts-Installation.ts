import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { perspective } from '../pages/app';
import { switchPerspective } from '../constants/global';
import { addPage, addPageObj, seelctCardFromOptions, catalogPage, catalogPageObj } from '../pages/add_page';
import { addOptions } from '../constants/add';
import { topologyPage } from '../pages/topology_page';

Given('user is at developer perspecitve', () => {
  perspective.switchTo(switchPerspective.Developer);
  perspective.verifyPerspective('Developer');
});

Then('user can see Helm Chart card on the +Add page', () => {
  addPage.verifyCard('Helm Chart');
});

When('user clicks on the Helm Chart card on the +Add page', () => {
  addPage.verifyCard('Helm Chart');
  seelctCardFromOptions(addOptions.HelmChart);
});

When('user searches for the {string} helm chart', (helmChartName: string) => {
  catalogPage.search(helmChartName);
});

When('user clicks on the {string} helm chart card', (helmChartName: string) => {
  catalogPage.selectHelmChartCard(helmChartName);
});

When('user clicks on the Install Helm Chart button', () => {
  catalogPage.verifyDialog();
  cy.get(catalogPageObj.sidePane.createHelmChart).click();
});

When('user clicks on the Install button in Install Helm chart page', () => {
  catalogPage.verifyInstallHelmChartPage();
  catalogPage.clickOnInstallButton();
});

Then('Topology page have the helm chart workload {string}', (nodeName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(nodeName);
});

When('user clicks on the Developer Catalog card on the +Add page', () => {
  // TODO: implement step
});

When('user checks the Helm Charts checkbox', () => {
  // TODO: implement step
});

When('user right clicks on the workload', () => {
  // TODO: implement step
});

Then('user sees the context menu with actions', () => {
  // TODO: implement step
});

Then('user sees the Upgrade action item', () => {
  // TODO: implement step
});

Then('user sees the Rollback action item', () => {
  // TODO: implement step
});

Then('user sees the Uninstall Helm Release action item', () => {
  // TODO: implement step
});
