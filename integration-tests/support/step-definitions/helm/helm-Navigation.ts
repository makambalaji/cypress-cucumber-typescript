import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { naviagteTo } from '../../pages/app';
import { devNavigationMenu } from '../../constants/global';
import { helmPage, helmDetailsPage } from '../../pages/helm-page';
import { addPage } from '../../pages/add/add_page';
import { addOptions } from '../../constants/add';
import { topologyPage } from '../../pages/topology-page';
import { catalogPage, catalogPageObj } from '../../pages/add/catalog_page';

Given('user is at the Helm page', () => {
  naviagteTo(devNavigationMenu.Helm);
});

Given('user is at the Helm page with one helm release', () => {
  naviagteTo(devNavigationMenu.Helm);
});

Given('user has selected all filters', () => {
  // TODO: implement step
});

When('user clicks on the Helm tab', () => {
  naviagteTo(devNavigationMenu.Helm);
});

When('user clicks on the Helm Chart card on the +Add page', () => {
  addPage.selectCardFromOptions(addOptions.HelmChart);
});

When('user searches for the {string} helm chart', (helmChartName: string) => {
  catalogPage.search(helmChartName);
});

When('user clicks on the {string} helm chart card', (helmChartName: string) => {
  catalogPage.selectHelmChartCard(helmChartName);
});

When('user clicks on the Install Helm Chart button on side bar', () => {
  catalogPage.clickInstallHelmChartOnSidePane();
});

When('user clicks on the Install button', () => {
  catalogPage.clickOnInstallButton();
});

Then('Install Helm Chart page is displayed', () => {
  cy.get('h1.pf-c-title').should('have.text', 'Install Helm Chart');
});

Then('release name displays as {string}', (name: string) => {
  cy.get(catalogPageObj.installHelmChart.releaseName).should('have.value', name);
  cy.get(catalogPageObj.installHelmChart.cancel).click();
});

Given('user is at Install Helm Chart page', () => {
  naviagteTo(devNavigationMenu.Add);
  addPage.selectCardFromOptions(addOptions.HelmChart);
  catalogPage.search('Nodejs Ex K v0.2.0');
  catalogPage.selectHelmChartCard('Nodejs Ex K v0.2.0');
  catalogPage.clickInstallHelmChartOnSidePane();
});

When('user selects YAML view', () => {
  cy.get(catalogPageObj.installHelmChart.yamlView).check();
});

Then('user is able to see YAML editor', () => {
  cy.get('div.view-lines').should('be.visible');
  cy.get(catalogPageObj.installHelmChart.cancel).click();
});

Then('Topology page have the helm chart workload {string}', (nodeName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(nodeName);
});

When('user clicks on the filter drop down', () => {
  // TODO: implement step,
});

When('user selects checkbox for the Deployed Helm charts', (workloadname: string) => { 
  topologyPage.verifyWorkloadInTopologyPage(workloadname);
});

When('user selects checkbox for the Failed Helm charts', () => {
  // TODO: implement step
});

When('user selects checkbox for the Other Helm charts', () => {
  // TODO: implement step
});

When('user clicks on the clear all filters button', () => {
  // TODO: implement step
});

When('user searches for a helm chart {string}', (helmChartName:string) => {
  helmPage.search(helmChartName);
});

When('user clicks on the helm release name {string}', (helmChartName:string) => {
  helmPage.search(helmChartName);
  helmPage.clickHelmReleaseName(helmChartName);
});

Given('helm chart is installed', () => {
  naviagteTo(devNavigationMenu.Topology);
  topologyPage.verifyWorkloadInTopologyPage('nodejs-example');
});

Then('user will be redirected to Helm releases page', () => {
  cy.titleShouldBe('Helm Releases');
});

Then('user is able to see the message as no helm charts present', () => {
  helmPage.verifyMessage();
});

Then('user will get the link to install helm charts from developer catalog', () => {
  helmPage.verifyInstallHelmLink();
}); 

Then('user will see the helm charts listed', () => {
  helmPage.verifyHelmReleasesDisplayed();
});

Then('the checkbox for the Deployed Helm chart is checked', () => {
  // TODO: implement step
});

Then('helm charts with status deployed are listed', () => {
  // TODO: implement step
});

Then('the checkbox for the Failed Helm chart is checked', () => {
  // TODO: implement step
});

Then('helm charts with status failed are listed', () => {
  // TODO: implement step
});

Then('the checkbox for the Other Helm chart is checked', () => {
  // TODO: implement step
});

Then('helm charts with status other are listed', () => {
  // TODO: implement step
});

Then('all filters selected will get removed', () => {
  // TODO: implement step
});

Then('the helm chart {string} will be shown', (helmChartName: string) => {
  cy.log(helmChartName);
});

Then('user will see the Details page opened', () => {
  helmDetailsPage.verifyTitle();
});

Then('user is able to see message on the Helm page as {string}', (message: string) => {
  cy.log(message);
});

Then('user will see the Resources tab', () => {
  helmDetailsPage.verifyResourcesTab();
});

Then('user will see the Revision History tab', () => {
  helmDetailsPage.verifyRevisionHistoryTab();
});

Then('user will see the Release Notes tab', () => {
  helmDetailsPage.verifyReleaseNotesTab();
});

Then('user will see the Actions drop down menu', () => {
  helmDetailsPage.verifyActionsDropdown();
});

When('user clicks Actions menu in Helm Details page', () => {
  helmDetailsPage.clickActionMenu();
});

Then('Actions menu display with options Upgrade, Rollback, and Uninstall Helm Release', () => {
  helmDetailsPage.verifyActionsInActionMenu();
});
