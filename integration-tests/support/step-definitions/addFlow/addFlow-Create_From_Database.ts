import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { catalogPageObj, catalogPage } from '../../pages/add/catalog_page';
import { addOptions } from '../../constants/add';
import { topologyPage } from '../../pages/topology_page';

When('user clicks Database card', () => {
  addPage.selectCardFromOptions(addOptions.Database);
});

When('user selects {string} databse on Developer Catalog', (database: string) => {
  catalogPage.search(database);
  cy.byTestID('Template-mariadb-persistent').click();
});

When('user clicks Instantiate Template button on side bar', () => {
  catalogPage.clickInstantiateButtonOnSidePane();
});

When('user clicks create button on Instantiate Template page with default values', () => {
  cy.get(catalogPageObj.create).click();
});

Then('created workload {string} is present in topology page', (workloadName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(workloadName);
});
