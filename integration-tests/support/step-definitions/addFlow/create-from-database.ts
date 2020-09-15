import { When } from 'cypress-cucumber-preprocessor/steps';
import { addPage } from '../../pages/add/add_page';
import { catalogPage } from '../../pages/add/catalog_page';
import { addOptions, caatalogCards } from '../../constants/add';

When('user clicks Database card', () => {
  addPage.selectCardFromOptions(addOptions.Database);
});

When('user selects {string} database on Developer Catalog', (database: string) => {
  catalogPage.search(database);
  catalogPage.selectCardInCatalog(database);
});

When('user clicks Instantiate Template button on side bar', () => {
  catalogPage.clickInstantiateButtonOnSidePane();
});

When('user clicks create button on Instantiate Template page with default values', () => {
  addPage.clicKCreate();
});
